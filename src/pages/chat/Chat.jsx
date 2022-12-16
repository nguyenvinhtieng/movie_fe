import React, { useEffect, useRef, useState } from 'react'
import socketIO from 'socket.io-client';
import { path } from '../../API/apiPath'
import Header from '../../components/Header/Header'
import request from '../../services/request'
// const socket = socketIO.connect('http://localhost:1701');

export default function Chat() {
  const [chats, setChats] = useState([])
  const contentRef = useRef()

  const fetchChatData = async () => {
    const res = await request("GET", path.getChat)
    setChats(res)
  }
  useEffect(() => {
    fetchChatData()
  }, [])
  // socket
  // useEffect(() => {
  //   console.log("socket: ", socket)
  // }, [])

  const handleSendMessage = async () => {
    const content = contentRef.current.value
    
    console.log("content: ", content)
  }


  return (
    <div className="homeUser">
      <Header></Header>
      <div className="containerUser">
        <div className="chat">
          <div className="chat__wrapper">
            <div className="chat__content">
              {chats.length > 0 && chats.map((chat, index) => 
                <div className="chat__content__item" key={chat.id}>
                  <span className="info">
                    <div className="avatar">
                      <img src={chat.users.avatar} alt="" />
                    </div>
                    <div className="name">{chat.users.name} : </div>
                  </span>
                  <span className="message">{chat.message}</span>
                </div>
                )}
            </div>
            <div className="chat__input">
              <textarea name="" id="" placeholder='Enter your message...' ref={contentRef}></textarea>
              <button onClick={handleSendMessage}>Gửi</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
