"use client"

import React from 'react'
import { SigninButton } from './SignInButton'
import { SignupButton } from './SignUpButton'
import { SignOutButton } from './SignOutButton';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';

const Header = () => {

  const {user} = useUser();
  console.log("hello user", user)

  return (
    <div className='w-full bg-red-600 flex justify-end p-3 gap-3'>

      <div className='flex gap-5 px-4 cursor-pointer'>
        <Link href={`/user/${user?.nickname}`}>{user?.nickname}</Link>
        <Link href={`/user/${user?.nickname}/chat`}>Chats</Link>
        <Link href={`/user/${user?.nickname}/createpost`}>Create Post</Link>
      </div>
      {user ? <SignOutButton/>: <div className='flex gap-3'><SigninButton/>
        <SignupButton/></div>}
        
         
    </div>
  )
}

export default Header