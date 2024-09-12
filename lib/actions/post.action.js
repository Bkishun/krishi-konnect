"use server";

import multer from "multer";
import { connectDB } from "../mongoose";
import { uploadOnCloudinary } from "../utils/cloudinary.utils";
import { getSession } from "@auth0/nextjs-auth0";
import CropPost from "../models/croppost.model";
import User from "../models/user.model";
import { upload } from "../utils/multer.util";
import { createPostYup, editPostYup} from "../yupValidations/post.yup";
import { responseData } from "../utils/reponse.util";

export async function createPost(post) {
  try {
    await connectDB();

    const session = await getSession();
    const authUser = session?.user;
    const currentUser = await User.findOne({ authId: authUser.sub });

    const {
      cropName,
      cropType,
      minprice,
      maxPrice,
      quantity,
      description,
      address,
      pictureUrl,
    } = post;

    await createPostYup.validate(post);

    const newPost = new CropPost({
      cropName,
      cropType,
      minprice,
      maxPrice,
      quantity,
      description,
      address,
      pictureUrl,
      user: currentUser._id,
    });

    const createdPost = await newPost.save();

    return responseData(createdPost, 200, "post is created", "");
  } catch (error) {
    return responseData("", 500, "Internal server error !", error.message);
  }
}

export async function editPost(fields, postId) {
  try {
    await connectDB();

    await editPostYup.validate(fields);

    const updatedPost = await CropPost.findOneAndUpdate(
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

export async function getPostById(postId) {
  try {
    await connectDB();

    if (!postId) {
      console.log("postId is missing");
      return responseData("", 404, "PostId is missing", "");
    }
    const post = await CropPost.findById(postId);

    if (!post) {
      console.log("No post found with given postId");
      return responseData("", 404, "No post found with given postId", "");
    }

    return responseData(post, 200, "post fetched successfully", "");
  } catch (error) {
    return responseData("", 500, "Internal server error !", error.message);
  }
}

export async function getAllPosts() {
  try {
    await connectDB();

    const posts = await CropPost.find();

    return responseData(posts, 200, "All posts fetched successfully", "");
  } catch (error) {
    return responseData("", 500, "Internal server error !", error.message);
  }
}
