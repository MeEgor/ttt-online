class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken

  def current_player
    current_api_v1_player
  end
end
