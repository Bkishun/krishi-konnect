"use client"
import { createPost } from '@/lib/actions/post.action';
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

    const post ={
      cropName : "Onion",
      cropType: "onis",
      minprice: "42",
      maxPrice: "64",
      quantity: "800 tons",
      description:"clean Onion for use",
      address: "gonda",
      pictureUrl: "yuihojwopoed//4657576869/iueiutuer/jkdslhhioe//uwefeokewo//r",
    }


    const handlePostClick = async () => {

      const postData = await createPost(post);
      console.log(postData)

    }

  return (
    <div>

<div>username</div>
        <input value={name} onChange={(e) => setName(e.target.value)} type="text" />
<div>adharnumber</div>
        <input value={adhar} onChange={(e) => setAdhar(e.target.value)} type="text" />
        <button onClick={handleClick}>done</button>


        <button onClick={handlePostClick}>post</button>
      
    </div>

  )
}

export default TempForm
