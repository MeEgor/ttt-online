Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  mount ActionCable.server => '/cable'

  namespace :api, defaults: { format: :json }  do
    namespace :v1 do
      mount_devise_token_auth_for 'Player', at: 'auth'

      resources :game, only: [:create], param: :uuid do 
        member do
          patch :move
        end
      end
    end
  end
end
