"use server"
import { getSession } from "@auth0/nextjs-auth0";
import { connectDB } from "../mongoose";
import { responseData } from "../utils/reponse.util";
import { createFarmerPostYup, editFarmerLandPostYup } from "../yupValidations/farmerlandpost.yup";
import FarmerLandPost from "../models/farmerlandpost.model";

export async function createFarmerLandPost(post) {
    try {
      await connectDB();
  
      const session = await getSession();
      const authUser = session?.user;
      const currentUser = await User.findOne({ authId: authUser.sub });
  
      const {
        landArea,
        contractType,
        description,
        address,
        imageUrl
      } = post;
  
      await createFarmerPostYup.validate(post);
  
      const newPost = new FarmerLandPost({
        contractType,
        landArea,
        description,
        address,
        imageUrl,
        user: currentUser._id,
      });
  
      const createdPost = await newPost.save();
  
      return responseData(createdPost, 200, "Farmer post is created", "");
    } catch (error) {
      return responseData("", 500, "Internal server error !", error.message);
    }
}
export async function editFarmerLandPost(fields, postId) {
    try {
      await connectDB();
      await editFarmerLandPostYup.validate(fields);
  
      const updatedPost = await FarmerLandPost.findOneAndUpdate(
        { _id: postId },
        { $set: fields },
        { new: true }
      );
  
      if (!updatedPost) {
        console.log("Farmer post not found");
        return responseData("", 404, "Farmer post not found !", "");
      }
  
      return responseData(updatedPost, 200, " Farmer post updated", "");
    } catch (error) {
      return responseData("", 500, "Internal server error !", error.message);
    }
  }

  export async function getFarmerPostById(postId) {
    try {
      await connectDB();
  
      if (!postId) {
        console.log("postId is missing");
        return responseData("", 404, "PostId is missing", "");
      }
      const post = await FarmerLandPost.findById(postId);
  
      if (!post) {
        console.log("No post found with given postId");
        return responseData("", 404, "No post found with given postId", "");
      }
  
      return responseData(post, 200, "farmer post fetched successfully", "");
    } catch (error) {
      return responseData("", 500, "Internal server error !", error.message);
    }
  }
  
  export async function getAllFarmerPosts() {
    try {
      await connectDB();
  
      const posts = await FarmerLandPost.find();
  
      return responseData(posts, 200, "All farmer posts fetched successfully", "");
    } catch (error) {
      return responseData("", 500, "Internal server error !", error.message);
    }
  }
  