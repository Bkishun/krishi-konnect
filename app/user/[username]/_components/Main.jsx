"use client"
import React, { useEffect } from 'react'
import Hero from './Hero'
import Middle from './Middle'
import { addUser } from '@/redux/slices/user.slice'
import { getUserByAuthId } from '@/lib/actions/user.action'
import { useUser } from '@auth0/nextjs-auth0/client'
import { useDispatch } from 'react-redux'

const Main = ({userAuthId}) => {

  const dispatch = useDispatch();

  console.log(userAuthId)
  useEffect(() => {
    
    const getUser = async () => {

      const res = await getUserByAuthId(userAuthId);
      console.log(res);
      dispatch(addUser(res.data))
    }
    getUser()

  }, [])

  return (
    <div>
        <div>
            <Hero/>
        </div>
        <div>
            <Middle/>
        </div>
    </div>
  )
}

export default Main