class Game < ApplicationRecord
  belongs_to :player_1, class_name: "Player", optional: true
  belongs_to :player_2, class_name: "Player", optional: true

  has_many :moves, class_name: "GameMove", dependent: :destroy

  def field
    field = Array.new(height) { Array.new(width) }

    moves.each do |m|
      field[m.top][m.left] = m.sign
    end
    
    field
  end
end
