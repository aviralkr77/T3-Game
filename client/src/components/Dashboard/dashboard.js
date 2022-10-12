import React, { useState, useEffect } from "react"
import "./dashboard.css";
import { useHistory } from "react-router-dom"
import { Link } from 'react-router-dom'

const Dashboard = () => {


    const [room, setRoom] = useState('')
    const [name, setName] = useState('')

    return (
        <div className="homepage">

            <div className="joinOuterContainer">
                <div className="joinInnerContainer">
                <h1><b> ＴＩＣ－ＴΛＣ－Ｔ♢ Σ </b></h1>
                <hr></hr>
                <h3 className="Heading">Join or Create a Game-Room</h3>
                    <div><input placeholder="Enter a Room-ID" className="joinInput mt-20" type="text" onChange={(event)=>setRoom(event.target.value)}   /></div>
                    <div><input placeholder="Enter a Username" className="joinInput mt-20" type="text" onChange={(event)=>setName(event.target.value)}   /></div>
                    <Link  onClick={e => (!room) ? e.preventDefault() : null} to={ `/game?name=${name}&room=${room}`} >
                    <button className="button mt-20">Enter</button>
                    </Link>
                </div>
            </div>


           
        </div>
    )



}

export default Dashboard
