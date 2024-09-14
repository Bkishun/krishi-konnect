"use client"
import { createPost, editPost, getAllPosts, getPostById } from '@/lib/actions/post.action';
import { editUserProfile, getAllUser, getUserByAuthId, getUserByAuthUsername, registerUser, toggleAccountStatus, } from '@/lib/actions/user.action'
import { useUser } from '@auth0/nextjs-auth0/client';
import React from 'react'


const Home = () => {
  const {user} = useUser();

  // console.log(user)
    const data = {
      name : "janisar666",
      password : "98765678hdh333dlks",
      adhaarNumber: "56348734589333346",
      address : "lucknow343",
      userType : "buyer",
    }

    const post ={
      cropName : "potato",
      cropType: "paddy1",
      minprice: "22",
      maxPrice: "33",
      quantity: "100tons",
      description:"clean rice for use",
      address: "lucknow45",
      pictureUrl: "yuihojwopoed//4657576869/iueiutuer/jkdslhhioe//uwefeokewo//r",
    }

    const handleClick = async  () => {
      const res = await getPostById("66e5838cdcb6bbbff9de87c4");
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
