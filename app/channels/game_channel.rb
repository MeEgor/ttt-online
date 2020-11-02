class GameChannel < ApplicationCable::Channel

  attr_accessor :game_uuid

  def subscribed
    @game_uuid = params[:game]
    game = Game.preload(:player_1, :player_2).find_by_uuid @game_uuid
    stream_for game
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def move data
    puts "move", data
    game = Game.preload(:player_1, :player_2, :last_move).find_by_uuid @game_uuid

    return if game.state == "completed"

    return if game.last_move && game.last_move.player_id == current_player.id 
    
    # сохраняем ход
    top = data["top"]
    left = data["left"]
    sign = game.player_1 == current_player ? "X" : "O"
    next_sign = sign == "X" ? "O" : "X"
    
    move = GameMove.create(
      player: current_player,
      game: game,
      top: top,
      left: left,
      sign: sign
    )
    # заполняем поле ходами
    moves = GameMove.where(game: game)
    field = Array.new(game.height) { Array.new(game.width) }
    moves.each do |m|
      field[m.top][m.left] = m.sign
    end

    next_turn = moves.empty? ? 
      game.player_1 :
      moves.last.player == game.player_1 ? game.player_2 : game.player_1

    # проверка на победу
    is_win = GameManager::WinChecker.call(top, left, sign, field, game.win_row_size)
    if is_win
      game.state = :completed
      game.winner = current_player
      game.save
    end
    # проверка на ничью
    is_draw = !GameManager::DrawChecker.call(next_sign, field, game.win_row_size)
    if is_draw
      game.state = :completed
      game.save
    end

    GameChannel.broadcast_to game, 
      field: field,
      state: game.state,
      winner: game.winner_id,
      turn: next_turn.id,
      player1: game.player_1_id,
      player2: game.player_2_id
  end

  def join
    game = Game.preload(:player_1, :player_2).find_by_uuid @game_uuid
    if game.player_2.nil? && game.player_1 != current_player
      game.player_2 = current_player
      game.save
    end

    broadcast_state
  end

  def receive(data)
    puts "receive", data
  end

  private

  def broadcast_state
    game = Game.preload(:player_1, :player_2).find_by_uuid @game_uuid
    moves = GameMove.where(game: game)
    field = Array.new(game.height) { Array.new(game.width) }

    moves.each do |m|
      field[m.top][m.left] = m.sign
    end

    next_turn = moves.empty? ? 
      game.player_1 :
      moves.last.player == game.player_1 ? game.player_2 : game.player_1

    GameChannel.broadcast_to game, 
      field: field,
      state: game.state,
      winner: game.winner_id,
      turn: next_turn.id,
      player1: game.player_1_id,
      player2: game.player_2_id
  end
end
