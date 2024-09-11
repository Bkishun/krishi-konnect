"use server";

import multer from "multer";
import { connectDB } from "../mongoose";
import { uploadOnCloudinary } from "../utils/cloudinary.utils";
import { getSession } from "@auth0/nextjs-auth0";
import CropPost from "../models/croppost.model";
import User from "../models/user.model";
import { upload } from "../utils/multer.util";

export async function createPost(post) {
  try {
    await connectDB();

    const session = await getSession();
    const authUser = session?.user;
    const currentUser = await User.findOne({ authId: authUser.sid });

    upload.fields([
      {
        name: "picture",
        maxCount: 1,
      },
    ]);

    let picturePath;
    if (
      req.files &&
      Array.isArray(req.files.picture) &&
      req.files.picture.length > 0
    ) {
      picturePath = req.files.picture[0].path;
    }
    const pictureDetail = await uploadOnCloudinary(picturePath);

    const {
      cropName,
      cropType,
      minprice,
      maxPrice,
      quantity,
      description,
      address,
    } = post;

    if (!cropName) {
      console.log("Crop name is required");
      return {
        message: "Crop name is required",
        code: 400,
      };
    }
    if (!cropType) {
      console.log("cropType is required");
      return {
        message: "cropType is required",
        code: 400,
      };
    }
    if (!minprice) {
      console.log("minprice is required");
      return {
        message: "minprice is required",
        code: 400,
      };
    }
    if (!maxPrice) {
      console.log("maxPrice is required");
      return {
        message: "maxPrice is required",
        code: 400,
      };
    }
    if (!quantity) {
      console.log("quantity is required");
      return {
        message: "quantity is required",
        code: 400,
      };
    }
    if (!description) {
      console.log("description is required");
      return {
        message: "description is required",
        code: 400,
      };
    }
    if (!address) {
      console.log("address is required");
      return {
        message: "address is required",
        code: 400,
      };
    }

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

    return {
      message: "Post created successfully",
      code: 200,
    };
  } catch (error) {
    throw new Error(`Error creating new post: ${error.message}`);
  }
}

export async function editPost(fields, postId) {
  try {
    await connectDB();

    upload.fields([
      {
        name: "picture",
        maxCount: 1,
      },
    ]);

    let picturePath;
    if (
      req.files &&
      Array.isArray(req.files.picture) &&
      req.files.picture.length > 0
    ) {
      picturePath = req.files.picture[0].path;
    }

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

    if (!cropName) {
      console.log("Crop name is required");
      return {
        message: "Crop name is required",
        code: 400,
      };
    }
    if (!cropType) {
      console.log("cropType is required");
      return {
        message: "cropType is required",
        code: 400,
      };
    }
    if (!minprice) {
      console.log("minprice is required");
      return {
        message: "minprice is required",
        code: 400,
      };
    }
    if (!maxPrice) {
      console.log("maxPrice is required");
      return {
        message: "maxPrice is required",
        code: 400,
      };
    }
    if (!quantity) {
      console.log("quantity is required");
      return {
        message: "quantity is required",
        code: 400,
      };
    }
    if (!description) {
      console.log("description is required");
      return {
        message: "description is required",
        code: 400,
      };
    }
    if (!address) {
      console.log("address is required");
      return {
        message: "address is required",
        code: 400,
      };
    }

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
      console.log("post no found");
      return {
        message: "Post not found with given Id",
        code: 400,
      };
    }
    return {
      message: "Post updated successfully",
      code: 200,
    };
  } catch (error) {
    throw new Error(`Error creating new post: ${error.message}`);
  }
}


