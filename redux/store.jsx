"use client"

import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/user.slice'
import chatReducer from './slices/chat.slice'

import {  persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import { getDefaultMiddleware } from '@reduxjs/toolkit';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['chatData', 'userData'],
  };


const rootReducer = combineReducers({
    userData: userReducer, //it should match with slice name field
    chatData: chatReducer
  });

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
  })

 export const persistor = persistStore(store);
  
export default store;