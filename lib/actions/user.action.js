"use server";

import { connectDB } from "@/lib/mongoose";
import { decrypt, encrypt } from "../utils/encryption.util";
import User from "@/lib/models/user.model";
import { getSession } from "@auth0/nextjs-auth0";

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
      profileUrl,
    } = user;

    if (!user) {
      console.log("user not found");
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
    
    if (!adhaarNumber) {
      console.log("adhaarNumber is required");
      return {
        message: "adhaarNumber is required",
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
    
    const existingUser = await User.findOne({adhaarNumber: adhaarNumber})
    if(existingUser){
        console.log("user already exists")
        return{
            message: "user found with same Adhaar",
            code: 400
        }
    }
    
    const newUser = new User({
      name,
      email: authUser.email,
      password,
      adhaarNumber,
      address,
      userType,
      profileUrl,
      authUsername: authUser.nickname,
      authId: authUser.sid,
    });

    await newUser.save();
    
    return {
      message: "user registered successfully",
      code: 200,
    };
  } catch (error) {
    throw new Error(`Error creating new user: ${error.message}`);
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


