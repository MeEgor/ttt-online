module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_player

    def connect
      params = request.query_parameters()
      access_token = params["access_token"]
      uid = params["uid"]
      client = params["client"]

      self.current_player = find_verified_player access_token, uid, client
    end

    private

      def find_verified_player token, uid, client_id
        player = Player.find_by uid: uid
        if player && player.valid_token?(token, client_id)
          player
        else
          reject_unauthorized_connection
        end
      end
  end
end
