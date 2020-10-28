module GameManager
  class MoveService < ApplicationService
    include ServiceResultMethods

    attr_reader :game
  
    def initialize(move_params)
      @move_params = move_params
    end

    def call
      success_result data: { 
        state: {
          field: [
            [nil, nil, nil],
            [nil, nil, nil],
            [nil, nil, nil],
          ],
          status: "started",
          turn: 1,
          winner: nil
        }
      }
    end
  end
end