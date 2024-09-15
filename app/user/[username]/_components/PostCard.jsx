"use client"
import { setSelectedChat } from '@/redux/slices/chat.slice';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

const PostCard = ({post}) => {
  const {cropName, cropType, description, maxPrice, minprice, quantity, pictureUrl, address, user} = post;

  const currentUserData = useSelector(state => state.userData)
  const dispatch = useDispatch();
  const router = useRouter();
  // console.log(currentUserData)

  const handleNegotiate = async () => {

    try {

      const response = await axios.post('http://localhost:3001/api/chat', {
        userId: user[0]._id,
        currentUserId: currentUserData.user._id ,
      });

      dispatch(setSelectedChat(response.data._id))

      console.log(response)
      if(response.data) {
        router.push(`${currentUserData.user.authUsername}/chat/${response.data._id}`);

      }

      
    } catch (error) {

      throw new Error(error.message)
      
    }

  }



  return (
    <div className='w-[24%]  flex flex-col items-center p-2 rounded-lg shadow-md border-[0.09rem] border-[#e0e0e0]'>

        <img className='h-[6rem] w-[12rem] rounded-md m-2' src={pictureUrl}/>
        <div className='flex gap-12 items-center' >
          <div className='font-semibold'>{cropName}</div>
          <div className='text-green-600 text-sm font-semibold'>₹{minprice} - ₹{maxPrice}</div>
        </div>
        <div className='text-sm text-[#918B98] my-2'>{description}</div>

        <button onClick={handleNegotiate} className='bg-green-600 rounded-lg px-2 py-1 text-white text-xs mb-3 hover:opacity-80'>Negotiate</button>

    </div>
  )
}

export default PostCard