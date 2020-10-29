module GameManager
  class CreateService < ApplicationService
    include ServiceResultMethods

    attr_reader :game_params, :current_player
  
    def initialize(game_params, current_player)
      @game_params = game_params
      @current_player = current_player
    end

    def call
      game = Game.new permitted_attributes
      if game.save
        success_result data: { game: game.reload }
      else
        error_result message: "Can not create game!", data: {
          messages: game.errors.full_messages
        }
      end
    end

    private 

    def permitted_attributes
      game_params.require(:game).permit(:width, :height, :winRowSize).transform_keys(&:underscore)
    end
  end
end