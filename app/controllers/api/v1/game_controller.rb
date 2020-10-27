module Api
  module V1
    class GameController < ApplicationController
      def move
        top = params[:top]
        left = params[:left]
        sign = params[:sign]

        field = [
          [nil, nil, nil],
          [nil, nil, nil],
          [nil, nil, nil]
        ]

        field[top][left] = sign
        
        ActionCable.server.broadcast("game_#{params[:id]}", field: field)
      end
    end
  end
end
