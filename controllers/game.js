import { addUser , removeUser , getUsersInRoom } from "../helper/user.js";
let players = {}; // It will keep all the players data who have register using mobile number. you can use actual persistence database I have used this for temporery basis
let sockets = {}; // stores all the connected clients
let games = {}; // stores the ongoing game

export default  {


  start: function(io) {
   
    io.on('connect', (client) => {

      
        client.on('join', ({ name, room }, callback) => {
          console.log(name,room);
          const { error, user } = addUser({ id: client.id, name, room });
          sockets[client.id] = {
            is_playing: true,
            game_id: room
        };

          if(error) return callback(error);
      
          client.join(user.room);
          io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
      
          callback();
        });



        client.on('selectOpponent', data => {
    
          if (!sockets[data.id].is_playing) {

              sockets[data.id].is_playing = true;
              sockets[client.id].is_playing = true;
              sockets[data.id].game_id = data.gameId;
              sockets[client.id].game_id = data.gameId;
              players[sockets[data.id].mobile_number].played = players[sockets[data.id].mobile_number].played + 1;
              players[sockets[client.id].mobile_number].played = players[sockets[client.id].mobile_number].played + 1;
  
              games[gameId] = {
                  player1: client.id,
                  player2: data.id,
                  whose_turn: client.id,
                  playboard: [["", "", ""], ["", "", ""], ["", "", ""]],
                  game_status: "ongoing", // "ongoing","won","draw"
                  game_winner: null, // winner_id if status won
                  winning_combination: []
              };
              games[gameId][client.id] = {
                  mobile_number: sockets[client.id].mobile_number,
                  sign: "x",
                  played: players[sockets[client.id].mobile_number].played,
                  won: players[sockets[client.id].mobile_number].won,
                  draw: players[sockets[client.id].mobile_number].draw
              };
              games[gameId][data.id] = {
                  mobile_number: sockets[data.id].mobile_number,
                  sign: "o",
                  played: players[sockets[data.id].mobile_number].played,
                  won: players[sockets[data.id].mobile_number].won,
                  draw: players[sockets[data.id].mobile_number].draw
              };
              io.sockets.connected[client.id].join(gameId);
              io.sockets.connected[data.id].join(gameId);
              io.emit('excludePlayers', [client.id, data.id]);
              io.to(gameId).emit('gameStarted', { status: true, game_id: gameId, game_data: games[gameId] });
  
          }
      });


        client.on('disconnect', () => {
          const user = removeUser(client.id);
      console.log("disconnected");
         
        })


      });

     


  }
 

}



