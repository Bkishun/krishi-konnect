import React from 'react'
import CropPostForm from './_components/CropPostForm'
import BuyerPostForm from './_components/BuyerPostForm'
import FarmerPostForm from './_components/FarmerPostFarm'

const page = () => {
  return (
    <div className='h-screen'>
        <CropPostForm/>      
        {/* <BuyerPostForm/> */}
        {/* <FarmerPostForm/> */}
    </div>
  )
}

export default page
