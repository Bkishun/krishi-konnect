"use client"

import { createSlice } from "@reduxjs/toolkit"



export const userSlice = createSlice({
    name: 'user',
    initialState : {
        user: {},
    },
    reducers: {
      addUser: (state, action) => {
        state.user = action.payload;
      },
    //   clearGithubAccountsFromStore: (state, action) => {
    //     state.githubAccounts = [];
    //   },
    //   removeGithubAccount: (state, action) => {
    //     state.githubAccounts = state.githubAccounts.filter(githubAccount => githubAccount.username !== action.payload);
    //   },
    }
    
  });

export const {addUser} = userSlice.actions;

export default userSlice.reducer