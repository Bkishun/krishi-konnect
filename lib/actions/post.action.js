"use server";

import multer from "multer";
import { connectDB } from "../mongoose";
import { uploadOnCloudinary } from "../utils/cloudinary.utils";
import { getSession } from "@auth0/nextjs-auth0";
import CropPost from "../models/croppost.model";
import User from "../models/user.model";
import { upload } from "../utils/multer.util";
import { editPostYup } from "../yupValidations/post.yup";
import { responseData } from "../utils/reponse.util";

export async function createPost(post) {
  try {
    await connectDB();

    const session = await getSession();
    const authUser = session?.user;
    const currentUser = await User.findOne({ authId: authUser.sid });

    // upload.fields([
    //   {
    //     name: "picture",
    //     maxCount: 1,
    //   },
    // ]);

    let picturePath = "/temp/car.jpg";
    // if (
    //   req.files &&
    //   Array.isArray(req.files.picture) &&
    //   req.files.picture.length > 0
    // ) {
    //   picturePath = req.files.picture[0].path;
    // }
    const pictureDetail = await uploadOnCloudinary(picturePath);

    const { cropName, cropType, minprice, maxPrice, quantity, description, address } = post;

    await postYup.validate({ cropName, cropType, minprice, maxPrice, quantity, description, address })

    const newPost = new CropPost({
      cropName,
      cropType,
      minprice,
      maxPrice,
      quantity,
      description,
      address,
      pictureUrl: pictureDetail?.url,
      user: currentUser._id,
    });

    await newPost.save();

    return responseData(newPost, 200, "post is created", "")
  } catch (error) {
    return responseData("", 500, "Internal server error !", error.message)
  }
}


export async function editPost(fields, postId) {
  try {
    await connectDB();

    // upload.fields([
    //   {
    //     name: "picture",
    //     maxCount: 1,
    //   },
    // ]);

    let picturePath = "/temp/car.jpg";
    // if (
    //   req.files &&
    //   Array.isArray(req.files.picture) &&
    //   req.files.picture.length > 0
    // ) {
    //   picturePath = req.files.picture[0].path;
    // }

    const pictureDetail = await uploadOnCloudinary(picturePath);

    const {
      cropName,
      cropType,
      minprice,
      maxPrice,
      quantity,
      description,
      address,
    } = fields;

    await editPostYup.validate({cropName, cropType, minprice, maxPrice, quantity, description, address})

    const editFields = {
      cropName,
      cropType,
      minprice,
      maxPrice,
      quantity,
      description,
      address,
      pictureUrl: pictureDetail?.url,
    };

    const updatedPost = await CropPost.findByIdAndUpdate(
      { _id: postId },
      { $set: editFields },
      { new: true }
    );
    if (!updatedPost) {
      console.log("post not found");
      return responseData("", 404, "Post not found !", "")
    }

    
    return responseData(updatedPost, 200, "Post updated", "")

  } catch (error) {
    return responseData("", 500, "Internal server error !", error.message)
  }
}


