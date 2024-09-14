"use client"
// import { getAllPosts } from '@/lib/actions/post.action';
import { getAllPosts } from '@/lib/actions/post.action';
import React, { useState, useEffect } from 'react'

const Middle = () => {

    const [post, setPosts] = useState([]);
    console.log(post)

    useEffect(() => {
        const fetchPostData = async () => {
            const postData = await getAllPosts();
            setPosts(postData.data)

        }
        fetchPostData();
    }, [])
  return (
    <div>
        
    </div>
  )
}

export default Middle