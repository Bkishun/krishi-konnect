"use client"
import { registerUser } from '@/lib/actions/user.action'
import React from 'react'

const Home = () => {

    const data = {
      name : "baki34",
      password : "98765678343",
      adhaarNumber : "1234567890434",
      address : "kanpur343",
      userType : "buyer343",
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
