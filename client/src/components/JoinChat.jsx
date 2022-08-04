import { useState } from "react"
import io from 'socket.io-client'
import Chat from './Chat';


const socket = io.connect("http://localhost:8000")

const JoinChat = props => {
    const [myForm, setMyForm] = useState({
        userName: "", 
        roomID: ""
    })
    const [showChat, setShowChat] = useState(false)


    const onChangeHandler = e => {
        setMyForm({...myForm, [e.target.name]: e.target.value});
    }

    const joinRoom = (e) => {
        e.preventDefault()
        if (myForm.userName !== "" && myForm.roomID !== ""){
            socket.emit("join_room", myForm.roomID)
            setShowChat(true)
        }
    }

    return(
        <div>
            {
                !showChat ? <div className="joinChatContainer" id="wood"> 
                    <h3>Join a Chat Room</h3>
                    <form onSubmit={joinRoom} id="chatForm">
                        <input type="text" name="userName" placeholder="Username" onChange={onChangeHandler} />
                        <input type="text" placeholder="Room ID" name="roomID" onChange={onChangeHandler}/>
                        <input type="submit" value="Join Room"/>
                    </form>
                </div> :<Chat socket={socket} username={myForm.userName} room={myForm.roomID} />
            }
            

        </div>
    )
}

export default JoinChat