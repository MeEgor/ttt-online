class AddWinRowSizeToGame < ActiveRecord::Migration[6.0]
  def change
    add_column :games, :win_row_size, :integer, null: false
  end
end
