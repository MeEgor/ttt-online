class CreateGameMoves < ActiveRecord::Migration[6.0]
  def change
    create_table :game_moves do |t|
      t.belongs_to :player, null: false, foreign_key: true
      t.belongs_to :game, null: false, foreign_key: true
      t.integer :top, null: false
      t.integer :left, null: false
      t.string :sign, :limit => 1

      t.timestamps
    end

    add_index :game_moves, :sign
  end
end
