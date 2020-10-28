class CreateGames < ActiveRecord::Migration[6.0]
  def change
    create_table :games do |t|
      t.uuid :uuid, null: false, default: 'uuid_generate_v4()'
      t.integer :height, null: false
      t.integer :width, null: false
      t.string :state, null: false, default: "started"
      t.belongs_to :player_1, null: false, foreign_key: { to_table: :players }
      t.belongs_to :player_2, null: false, foreign_key: { to_table: :players }

      t.timestamps
    end
  end
end
