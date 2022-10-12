import React, { useState, useEffect } from "react"
import "./gameboard.css";
import { useHistory } from "react-router-dom"
import { Link } from 'react-router-dom'
import queryString from 'query-string';
import io from "socket.io-client";
import { Table, Row, Col } from 'react-bootstrap';

const ENDPOINT = 'localhost:4000';
let socket;

const Gameboard = ({ location }) => {

  let history = useHistory()

  const [room, setRoom] = useState('')
  const [name, setName] = useState('')
  const [users, setUsers] = useState('')
  const [data, setData] = useState({
    socket: null,
    isGameStarted: false,
    gameId:null,
    gameData: null,
  })



  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name);
    setData({
      socket:socket
    });

    socket.emit('join', { name, room }, (error) => {
      if (error) {
        alert(error);
      }
     
    });
  

    return () => {
      socket.emit('disconnected')
      socket.off();
    }
  }, [ENDPOINT, location.search]);

  useEffect(() => {
  
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);


 const selectOpponent = () => {
   socket.emit('selectOpponent', { "id": data.gameId });
};


  return (
    <div className="homepage">


      <div className="joinInnerContainer">
        <h1><b> ＴＩＣ－ＴΛＣ－Ｔ♢ Σ </b></h1>
        <br></br>
        {/* <Gameplay socket={socket}  />  */}
      </div>
      <div className="joinOuterContainer">
      <center>
      <div className="Heading">Room-ID - [ {room} ]
          {
            users
              ? (
                <div className="Heading2">
                  Player in Room:
                  {users.map(({ name }) => (
                    <div key={name} className="activeItem">
                      {" [ " + name + " ] "}
                    </div>
                  ))}

                </div>
              )
              : null
          }
          
          </div>

         <button className={(users.length >1 )?"buttonSml" :"buttonSml dsbl"} onClick={{selectOpponent}}>{(users.length >1 ?"Play" : "Waiting ..")}</button></center> 
      </div>
      <button className="button mt-20" onClick={() => { history.push('/') }}>Exit</button>




    </div>
  )



}

export default Gameboard
