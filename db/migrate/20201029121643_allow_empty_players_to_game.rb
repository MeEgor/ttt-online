class AllowEmptyPlayersToGame < ActiveRecord::Migration[6.0]
  def change
    remove_column(:games, :player_1_id, true)
    remove_column(:games, :player_2_id, true)

    add_belongs_to :games, :player_1, foreign_key: { to_table: :players }
    add_belongs_to :games, :player_2, foreign_key: { to_table: :players }
  end
end
