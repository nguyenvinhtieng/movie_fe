import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import socketIO from 'socket.io-client';
import { path } from '../../API/apiPath'
import Header from '../../components/Header/Header'
import request from '../../services/request'
const socket = socketIO.connect('http://localhost:1701');

export default function Chat() {
  const [chats, setChats] = useState([])
  const contentRef = useRef()
  const { auth } = useSelector(state => state)
  const fetchChatData = async () => {
    const res = await request("GET", path.getChat)
    setChats(res)
  }
  useEffect(() => {
    fetchChatData()
  }, [])
  // socket
  useEffect(() => {
    if(!socket) return
    console.log("s: ", socket)
      socket.on('get_message', (data) => {
        setChats(prev => {
          let newData = [...prev, data]
          let unique = [...new Set(newData.map(item => item.id))].map(id => {
            return newData.find(item => item.id === id)
          })
          return unique
        })
      })
    // }
  }, [socket])

  const handleSendMessage = async () => {
    const content = contentRef.current.value
    if(!content) return
    socket.emit('send_message', {message: content, uid: auth?.user?.id})
    contentRef.current.value = ''
    setTimeout(() => {
      fetchChatData()
    }, 1000)
  }


  return (
    <div className="homeUser">
      <Header></Header>
      <div className="containerUser">
        <div className="chat">
          <div className="chat__wrapper">
            <div className="chat__content">
              {chats.length > 0 && chats.map((chat, _) => 
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
