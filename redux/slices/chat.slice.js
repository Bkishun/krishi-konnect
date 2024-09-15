"use client"

import { createSlice } from "@reduxjs/toolkit"



export const chatSlice = createSlice({
    name: 'chat',
    initialState : {
        selectedChat: "",
        allChats: [],
    },
    reducers: {
      setSelectedChat: (state, action) => {
        state.selectedChat = action.payload;
      },

      setAllChats: (state, action) => {
        state.allChats = [...state.allChats, action.payload]

      }
    }
    
  });

export const {setSelectedChat, setAllChats} = chatSlice.actions;

export default chatSlice.reducer