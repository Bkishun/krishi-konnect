import React from 'react'
import { SigninButton } from './SignInButton'
import { SignupButton } from './SignUpButton'
import { getSession } from '@auth0/nextjs-auth0';
import { SignOutButton } from './SignOutButton';

const Header = async () => {

  const session = await getSession();
  const user = session?.user;
  console.log("hello user", user)
  // console.log("hello session", session)

  return (
    <div className='w-full bg-red-600 flex justify-end p-3 gap-3'>

      <div className='flex gap-5 px-4 cursor-pointer'>
        <div>Chats</div>
        <div>Posts</div>
      </div>
      {user ? <SignOutButton/>: <div className='flex gap-3'><SigninButton/>
        <SignupButton/></div>}
        
         
    </div>
  )
}

export default Header