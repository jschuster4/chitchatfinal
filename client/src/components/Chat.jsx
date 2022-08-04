import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import ScrollToBottom from 'react-scroll-to-bottom' 
import { Link } from "react-router-dom"

const Chat = ({socket, username, room}) => {
    const [curMessage, setCurMessage] = useState("")
    const [messageList, setMessageList] = useState([])

    // adding comment
    const sendMessage = async () => {
        if (curMessage !== ""){
            const messageData = {
                room: room, 
                author: username, 
                message: curMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }
            await socket.emit("send_message", messageData)
            setMessageList((list) => [...list, messageData])
            setCurMessage("")
        }

    }

    useEffect(() => {
        socket.on("receieve_message", (data) => {
            setMessageList((list) => [...list, data])
        })
    }, [socket])
    
    const onChangeHandler = e => {
        setCurMessage(e.target.value)
    }
    return(
        <div className="chat-window">
            <h5>ChatRoom {room} </h5>
            <div className="chat-header"> 
                <p>Live Chat</p>
            </div>
            <div className="chat-body"> 
                <ScrollToBottom className="message-container">
                    {messageList.map((messageContent) => {
                        return <div className="message" id={username === messageContent.author ? "other": "you"}>
                            <div className="message-content">
                                <p>{messageContent.message}</p>
                            </div>
                            <div className="message-meta">
                                <p id="time">{messageContent.time}</p>
                                <p id="author">{messageContent.author}</p>
                            </div>
                        </div>
                    })}

                </ScrollToBottom>
            </div>
            <div className="chat-footer"> 
                <input type="text" placeholder="Type your message here" onChange={onChangeHandler} value={curMessage}/>
                <button onClick={sendMessage}>&#9658;</button>
            </div>
            <div className="linkbutton">
                <button className="link"><Link to="/">Logout</Link></button>
            </div>
        </div>
    )
}

export default Chat