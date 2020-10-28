module Api
  module V1
    class GameController < ApplicationController
      def move
        # game_id = resource_game.id
        # player_id = params[:player]
        # top = params[:top]
        # left = params[:left]
        # sign = params[:sign]

        # move = GameMove.create(
        #   player_id: player_id,
        #   game: resource_game,
        #   top: top,
        #   left: left,
        #   sign: sign
        # )

        # moves = GameMove.where(game: resource_game)
        # field = Array.new(resource_game.height) { Array.new(resource_game.width) }

        # moves.each do |m|
        #   field[m.top][m.left] = m.sign
        # end
        
        # win? = check_vertical(left, field, sign) ||
        #       check_horizontal(top, field, sign) ||
        #       check_diag(left, top, field, sign) ||
        #       check_anti_diag(left, top, field, sign)

        # if win?
        #   resource_game.state = :completed
        #   resource_game.winner_id = player_id
        # end

        # if resource_game.save
          # ActionCable.server.broadcast "game_#{params[:uuid]}", 
          #   field: field,
          #   win: win,
          #   state: resource_game.state
      end

      private 

      def resource_game
        @game ||= Game.find_by_uuid params[:uuid]
      end

      def check_vertical(col, field, sign)
        field.map{ |r| r[col] }
          .chunk_while{ |a, b| a == sign && b == sign }
          .to_a.any?{ |c| c.length >= 3 }
      end
      
      def check_horizontal(row, field, sign)
        field[row].chunk_while{ |a, b| a == sign && b == sign }
          .to_a.any?{ |c| c.length >= 3 }
      end

      def check_diag(col, row, field, sign)
        shift = [col, row].min
        from_col = col - shift
        from_row = row - shift
        arr = []
        while (from_col < field[0].length && from_row < field.length) do
          arr << field[from_row][from_col]
          from_col += 1
          from_row += 1
        end
        arr.chunk_while{ |a, b| a == sign && b == sign }
          .to_a.any?{ |c| c.length >= 3 }
      end

      def check_anti_diag(col, row, field, sign)
        w = field[0].length - 1
        shift = [w - col, row].min
        from_col = col + shift
        from_row = row - shift
        arr = []
        while (from_col >= 0 && from_row < field.length) do
          arr << field[from_row][from_col]
          from_col -= 1
          from_row += 1
        end
        arr.chunk_while{ |a, b| a == sign && b == sign }
          .to_a.any?{ |c| c.length >= 3 }
      end
    end
  end
end
