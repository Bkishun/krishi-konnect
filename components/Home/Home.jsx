"use client"
import { createPost, editPost, getAllPosts, getPostById } from '@/lib/actions/post.action';
import { editUserProfile, getAllUser, getUserByAuthId, getUserByAuthUsername, registerUser, toggleAccountStatus, } from '@/lib/actions/user.action'
import { useUser } from '@auth0/nextjs-auth0/client';
import React from 'react'
import Test from '../Test';


const Home = () => {
  const {user} = useUser();

  // console.log(user)
    const data = {
      name : "shikhar",
      password : "98987678789",
      adhaarNumber: "98098767834535",
      address : "banarash",
      userType : "farmer",
    }

    const post ={
      cropName : "bkishunm allu",
      cropType: "bkishun",
      minprice: "34",
      maxPrice: "67",
      quantity: "600 tons",
      description:"clean pp for use",
      address: "banarash",
      pictureUrl: "https://plus.unsplash.com/premium_photo-1707242994139-fd1c5ab72aac?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dmVnZXRhYmxlfGVufDB8fDB8fHww",
    }

    const handleClick = async  () => {
      const res = await createPost(data);
      //66e5838cdcb6bbbff9de87c4
      console.log(res)
      

    }

  return (
    <div>

        <button className='bg-red-700 cursor-pointer' onClick={handleClick}>create post</button>
        <Test/>
      
    </div>
  )
}

export default Home
