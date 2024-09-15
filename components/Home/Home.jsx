"use client"
import { createPost, editPost, getAllPosts, getPostById } from '@/lib/actions/post.action';
import { editUserProfile, getAllUser, getUserByAuthId, getUserByAuthUsername, registerUser, toggleAccountStatus, } from '@/lib/actions/user.action'
import { useUser } from '@auth0/nextjs-auth0/client';
import React from 'react'


const Home = () => {
  const {user} = useUser();

  // console.log(user)
    const data = {
      name : "benten",
      password : "98987678789",
      adhaarNumber: "980987678678",
      address : "banarash",
      userType : "buyer",
    }

    const post ={
      cropName : "benten potato",
      cropType: "benten",
      minprice: "23",
      maxPrice: "44",
      quantity: "100 tons",
      description:"clean pp for use",
      address: "banarash",
      pictureUrl: "https://t4.ftcdn.net/jpg/05/37/04/61/360_F_537046123_s8JVn2NrClPQDOryhSm8jonYZPfIzPRX.jpg",
    }

    const handleClick = async  () => {
      const res = await createPost(post);
      //66e5838cdcb6bbbff9de87c4
      console.log(res)
      

    }

  return (
    <div>

        <button className='bg-red-700 cursor-pointer' onClick={handleClick}>create post</button>
      
    </div>
  )
}

export default Home
