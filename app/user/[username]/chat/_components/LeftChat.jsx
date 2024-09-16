"use client"

import { getSender } from '@/lib/utils/chat.utils';
import { setSelectedChat } from '@/redux/slices/chat.slice';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const LeftChat = () => {

    // const selectedChatIdRedux = useSelector(state => state.chatData.selectedChat)
    // console.log(data)

    const [selectedChatIdData, setSelectedChatIdData] = useState("")

    const [allChatsData, setAllChatsData] = useState([]);
    const currentUserData = useSelector(state => state.userData)

    const selectedChatId = useSelector(state => state.chatData.selectedChat)
    const dispatch = useDispatch()

    useEffect(() => {

        const fetchAllChats = async () => {


            console.log(currentUserData.user._id)
            try {
        
              const response = await axios.get(`http://localhost:3001/api/chat/${currentUserData.user._id}`); 

              console.log(response)
              
              setAllChatsData(response.data);
              
            } catch (error) {
        
              throw new Error(error.message)
              
            }
        
        }

        fetchAllChats();



    }, [])

    useEffect(() => {

        setSelectedChatIdData(selectedChatId)

    }, [selectedChatId]) 

    const handleChatClick = async (chatId) => {

        dispatch(setSelectedChat(chatId))
    }

  return (
    <div>
        {allChatsData.map((chat) => {

            const name = getSender(currentUserData.user, chat.users)
            console.log(name)

            return <div onClick={() => handleChatClick(chat._id)} className={selectedChatIdData==chat._id ? "text-red-700": "text-black"}>{`${name} / ${chat.post[0].cropName}` }</div>

        })}
    </div>
  )
}

export default LeftChat