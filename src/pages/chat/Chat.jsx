import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'

export default function Chat() {
  const [chats, setChats] = useState([])
  useEffect(() => {
    let chatFetch = new Array(200).fill({}).map((_, index) => {
      return {
        id: index,
        name: 'Nguyen Van A',
        message: 'Hello'
      }
    })
    setChats(chatFetch)
  }, [])
  return (
    <div className="homeUser">
      <Header></Header>
      <div className="containerUser">
        <div className="chat">
          <div className="chat__wrapper">
            <div className="chat__content">
              {chats.length > 0 && chats.map((chat, index) => 
                <div className="chat__content__item" key={chat.id}>
                  <span className="name">Nguyen Van A : </span>
                  <span className="message">Hello</span>
                </div>
                )}
            </div>
            <div className="chat__input">
              <textarea name="" id="" placeholder='Enter your message...'></textarea>
              <button>Gửi</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
