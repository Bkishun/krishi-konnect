"use client"
import { postUser } from '@/lib/actions/user.action';
import React, { useState } from 'react'

const TempForm = () => {
    const [name, setName] = useState("");
    const [adhar, setAdhar] = useState("");
    console.log(name)
    console.log(adhar)

    const handleClick = async (e) => {
        e.preventDefault();

        try {


            // const data = await postUser({username: name, adhaarnumber: adhar})
            // console.log(data)
            const data = await fetch('http://localhost:3000/api/user/onboarding', {
                method: 'POST', // Specify the HTTP method
                headers: {
                  'Content-Type': 'application/json', // Indicate the content type
                },
                body: JSON.stringify({
                  // Your data goes here
                  username: name,
                  adhaarnumber: adhar,
                }),
              })

              console.log(data)

            // const data = await fetch('http://localhost:3000/api/user/onboarding', {
            //     method: "post"
            // })
        } catch (error) {
            console.log(error)
        }

        
    }

  return (
    <div>

<div>username</div>
        <input value={name} onChange={(e) => setName(e.target.value)} type="text" />
<div>adharnumber</div>
        <input value={adhar} onChange={(e) => setAdhar(e.target.value)} type="text" />
        <button onClick={handleClick}>done</button>
      
    </div>

  )
}

export default TempForm
