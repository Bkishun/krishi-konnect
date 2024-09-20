"use server"
import { getSession } from "@auth0/nextjs-auth0";
import { connectDB } from "../mongoose";
import { responseData } from "../utils/reponse.util";
import { createBuyerPostYup, editBuyerLandPostYup } from "../yupValidations/buyerlandpost.yup";
import BuyerLandPost from "../models/buyerlandpost.model";
import User from "../models/user.model";

export async function createBuyerLandPost(post) {
    try {
      await connectDB();
  
      const session = await getSession();
      const authUser = session?.user;
      const currentUser = await User.findOne({ authId: authUser.sub });
  
      const {
        cropName,
        contractType,
        landArea,
        description,
        address,
        imageUrl
      } = post;
  
      await createBuyerPostYup.validate(post);
  
      const newPost = new BuyerLandPost({
        cropName,
        contractType,
        landArea,
        description,
        address,
        imageUrl,
        user: currentUser._id,
      });
  
      const createdPost = await newPost.save();
  
      return responseData(createdPost, 200, "post is created", "");
    } catch (error) {
      return responseData("", 500, "Internal server error !", error.message);
    }
}
export async function editBuyerLandPost(fields, postId) {
    try {
      await connectDB();
      await editBuyerLandPostYup.validate(fields);
  
      const updatedPost = await BuyerLandPost.findOneAndUpdate(
        { _id: postId },
        { $set: fields },
        { new: true }
      );
  
      if (!updatedPost) {
        console.log("post not found");
        return responseData("", 404, "Post not found !", "");
      }
  
      return responseData(updatedPost, 200, "Post updated", "");
    } catch (error) {
      return responseData("", 500, "Internal server error !", error.message);
    }
  }

  export async function getBuyerPostById(postId) {
    try {
      await connectDB();
  
      if (!postId) {
        console.log("postId is missing");
        return responseData("", 404, "PostId is missing", "");
      }
      const post = await BuyerLandPost.findById(postId);
  
      if (!post) {
        console.log("No post found with given postId");
        return responseData("", 404, "No post found with given postId", "");
      }
  
      return responseData(post, 200, "buyer post fetched successfully", "");
    } catch (error) {
      return responseData("", 500, "Internal server error !", error.message);
    }
  }
  
  export async function getAllBuyerPosts() {
    try {
      await connectDB();
  
      const posts = await BuyerLandPost.find();
  
      return responseData(posts, 200, "All buyer posts fetched successfully", "");
    } catch (error) {
      return responseData("", 500, "Internal server error !", error.message);
    }
  }
  