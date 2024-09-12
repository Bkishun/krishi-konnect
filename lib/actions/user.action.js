"use server";

import { connectDB } from "@/lib/mongoose";
import User from "@/lib/models/user.model";
import { getSession } from "@auth0/nextjs-auth0";
import { registerUserYup } from "../yupValidations/user.yup";
import { responseData } from "../utils/reponse.util";
import Client from "../models/client.model";

export async function registerUser(user) {
  try {
    const session = await getSession();
    const authUser = session?.user;

    await connectDB();
    const {
      name,
      password,
      adhaarNumber,
      address,
      userType,
    } = user;

    console.log(user)

    // await registerUserYup.validate({name,password,adhaarNumber,address,userType})
    
    // const existingUser = await Client.findOne({adhaarNumber: adhaarNumber})
    // if(!!existingUser){
    //     console.log("user already exists")
    //     return responseData("", 409, "user already exist", "")
    // }
    
    const newUser = new Client({
      name,
      email: authUser.email,
      password,
      adhaarNumber: "98765456789",
      address,
      userType,
      authUsername: authUser.nickname,
      authId: authUser.sid,
    });

    const newData = await newUser.save();
    console.log(newData)
    
    return responseData(newData, 200, "user registerd", "")
  } catch (error) {
    throw new Error(error)
    // return responseData("", 500, "Internal server error", error.message)
  }
}

export async function editUserProfile(updateFields) {
  try {
    const session = await getSession();
    const authUser = session?.user;

    await connectDB();
    const {
      name,
      password,
      address,
      userType,
      profileUrl,
    } = updateFields;

    if (!updateFields) {
      console.log("fields required");
      return {
        message: "user not found",
        code: 400,
      };
    }

    if (!name) {
      console.log("name is required");
      return {
        message: "name is required",
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
    if (!userType) {
      console.log("userType is required");
      return {
        message: "userType is required",
        code: 400,
      };
    }
    if (!profileUrl) {
      console.log("profileUrl is required");
      return {
        message: "profileUrl is required",
        code: 400,
      };
    }
    
    const updatedUser = await User.findOneAndUpdate(
        { authId: authUser.sid },
        { $set: updateFields },
        { new: true }
    );

    if(!updatedUser){
        console.log("User record not found")
        return {
            message: "User record not found",
            code: 400
        }
    }
    return {
      message: "user updated successfully",
      code: 200,
    };
  } catch (error) {
    throw new Error(`Error in updating: ${error.message}`);
  }
}

export async function toggleAccountStatus(user) {
  try {
    const session = await getSession();
    const authUser = session?.user;

    await connectDB();

    const foundUser = await User.findOne(authUser.sid);

    if (!foundUser) {
      console.log("User not found in DB");
      return {
        message: "User not found",
        code: 400,
      };
    }

    await User.findOneAndUpdate(
      { authId: authUser.sid },
      { accountStatus: !accountStatus },
      { new: true }
    );

    return {
      message: "account status changed successfully",
      code: 200,
    };
  } catch (error) {
    throw new Error(`Error while deactivating account: ${error.message}`);
  }
}

export async function getAllUser() {
    try {
        await connectDB();
        const users = await User.find();

        return {
            message: "All users fetched successfully",
            code: 200,
            users
        }

    } catch (error) {
        throw new Error (`Error while fetching users : ${error.message}`);
    }
}


