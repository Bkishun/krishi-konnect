"use client"
// import { getAllPosts } from '@/lib/actions/post.action';
import { getAllPosts } from '@/lib/actions/post.action';
import React, { useState, useEffect } from 'react'
import PostCard from './PostCard';

const Middle = () => {

    const [posts, setPosts] = useState([]);
    console.log(posts)

    useEffect(() => {
        const fetchPostData = async () => {
            const postData = await getAllPosts();
            setPosts(postData.data)

        }
        fetchPostData();
    }, [])
  return (

      <div className='flex gap-2 w-full flex-wrap justify-between p-3'>

        {posts.map((post) => <PostCard post={post}/>)}
          
        </div>
    
  )
}

export default Middle