# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_10_29_121643) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "uuid-ossp"

  create_table "game_moves", force: :cascade do |t|
    t.bigint "player_id", null: false
    t.bigint "game_id", null: false
    t.integer "top", null: false
    t.integer "left", null: false
    t.string "sign", limit: 1
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["game_id"], name: "index_game_moves_on_game_id"
    t.index ["player_id"], name: "index_game_moves_on_player_id"
    t.index ["sign"], name: "index_game_moves_on_sign"
  end

  create_table "games", force: :cascade do |t|
    t.uuid "uuid", default: -> { "uuid_generate_v4()" }, null: false
    t.integer "height", null: false
    t.integer "width", null: false
    t.string "state", default: "started", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "winner_id"
    t.integer "win_row_size", null: false
    t.bigint "player_1_id"
    t.bigint "player_2_id"
    t.index ["player_1_id"], name: "index_games_on_player_1_id"
    t.index ["player_2_id"], name: "index_games_on_player_2_id"
    t.index ["winner_id"], name: "index_games_on_winner_id"
  end

  create_table "players", force: :cascade do |t|
    t.string "provider", default: "email", null: false
    t.string "uid", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.boolean "allow_password_change", default: false
    t.datetime "remember_created_at"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.string "name"
    t.string "nickname"
    t.string "email"
    t.json "tokens"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["confirmation_token"], name: "index_players_on_confirmation_token", unique: true
    t.index ["email"], name: "index_players_on_email", unique: true
    t.index ["reset_password_token"], name: "index_players_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_players_on_uid_and_provider", unique: true
  end

  add_foreign_key "game_moves", "games"
  add_foreign_key "game_moves", "players"
  add_foreign_key "games", "players", column: "player_1_id"
  add_foreign_key "games", "players", column: "player_2_id"
  add_foreign_key "games", "players", column: "winner_id"
end
