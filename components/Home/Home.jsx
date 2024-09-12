"use client"
import { createPost, editPost, getAllPosts, getPostById } from '@/lib/actions/post.action';
import { editUserProfile, getAllUser, getUserByAuthId, getUserByAuthUsername, registerUser, toggleAccountStatus, } from '@/lib/actions/user.action'
import { useUser } from '@auth0/nextjs-auth0/client';
import React from 'react'


const Home = () => {
  const {user} = useUser();

  // console.log(user)
    const data = {
      name : "bki2oo",
      password : "98765678hdhdlks",
      adhaarNumber: "56348734589346",
      address : "lucknow343",
      userType : "buyer",
    }

    const post ={
      cropName : "rice",
      cropType: "paddy",
      minprice: "22",
      maxPrice: "33",
      quantity: "100tons",
      description:"clean rice for use",
      address: "lucknow45",
      pictureUrl: "yuihojwopoed//4657576869/iueiutuer/jkdslhhioe//uwefeokewo//r",
    }

    const handleClick = async  () => {
      const res = await registerUser(data);
      console.log(res)

    }

  return (
    <div>

        <button className='bg-red-700 cursor-pointer' onClick={handleClick}>create post</button>
      
    </div>
  )
}

export default Home
