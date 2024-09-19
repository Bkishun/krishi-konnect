"use client";

import axios from 'axios';
import React, { useState } from 'react'

export const ImageUpload = () => {
    const [image, setImage] = useState(null); // State for selected image
    const [uploading, setUploading] = useState(false); // State for uploading status
  
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      setImage(file);
    };
  
    const handleImageUpload = async () => {
        console.log(image)
      if (!image) {
        alert("Please select an image first");
        return;
      }
  
      setUploading(true);
  
      const imageData = new FormData();
      imageData.append("file", image);
      imageData.append("upload_preset", 'KrishiKonnect'); 
      imageData.append("cloud_name", 'bkishun');
  
      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          imageData
        );
        console.log(response)
  
        const imageUrl = response.data.secure_url;
        console.log(imageUrl)
        alert("Image uploaded successfully!");
      } catch (error) {
        console.error("Image upload failed:", error);
        alert("Image upload failed!");
      } finally {
        setUploading(false); // Stop uploading status
      }
    }; 
  return (
    <div>
       <input type="file" onChange={handleFileChange} />
       <button  onClick={handleImageUpload}>{uploading ? "Uploading..." : "Upload Image"}</button>
    </div>
  )
}

