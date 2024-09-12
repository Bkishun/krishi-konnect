"use server";

import { connectDB } from "@/lib/mongoose";
import User from "@/lib/models/user.model";
import { getSession } from "@auth0/nextjs-auth0";
import { editUserYup, registerUserYup } from "../yupValidations/user.yup";
import { responseData } from "../utils/reponse.util";
import CryptoJS from "crypto-js";

export async function registerUser(user) {
  try {
    const session = await getSession();
    const authUser = session?.user;

    await connectDB();
    const { name, password, adhaarNumber, address, userType } = user;

    console.log(user);

    await registerUserYup.validate(user);

    const adhaar = CryptoJS.AES.encrypt(
      adhaarNumber,
      process.env.ENCRYPTION_KEY
    ).toString();

    const existingUser = await User.findOne({ adhaar: adhaar });
    if (!!existingUser) {
      console.log("user already exists");
      return responseData("", 409, "user already exist", "");
    }

    const newUser = new User({
      name,
      email: authUser.email,
      password,
      adhaar,
      address,
      userType,
      authUsername: authUser.nickname,
      authId: authUser.sub,
      profileUrl: authUser.picture,
    });

    const newData = await newUser.save();
    console.log(newData);

    return responseData(newData, 200, "user registerd", "");
  } catch (error) {
    return responseData("", 500, "Internal server error", error.message);
  }
}

export async function editUserProfile(updateFields) {
  try {
    const session = await getSession();
    const authUser = session?.user;

    await connectDB();

    await editUserYup.validate(updateFields);

    console.log(authUser.sub)

    const updatedUser = await User.findOneAndUpdate(
      { authId: authUser.sub },
      { $set: updateFields },
      { new: true }
    );

    if (!updatedUser) {
      console.log("User record not found");
      return {
        message: "User record not found",
        code: 400,
      };
    }
    return responseData("", 200, "user updated successfully", "");
  } catch (error) {
    return responseData("", 500, "Internal server error", error.message);
  }
}

export async function toggleAccountStatus() {
  try {
    const session = await getSession();
    const authUser = session?.user;

    await connectDB();

    const foundUser = await User.findOne({ authId: authUser.sub });

    if (!foundUser) {
      console.log("User not found in DB");
      return {
        message: "User not found",
        code: 400,
      };
    }

    await User.findOneAndUpdate(
      { authId: authUser.sub },
      { accountStatus: !authUser.accountStatus },
      { new: true }
    );

    return responseData("", 200, "Account status updated", "");
  } catch (error) {
    return responseData("", 500, "Internal server error", error.message);
  }
}

export async function getAllUser() {
  try {
    await connectDB();
    const users = await User.find();

    return responseData(users, 200, "All users fetched successfully", "");
  } catch (error) {
    return responseData("", 500, "Internal server error", error.message);
  }
}

export async function getUserByAuthId(authId) {
  try {
    await connectDB();

    if (!authId) {
      console.log("authId is missing");
      return responseData("", 404, "authId is missing", "");
    }
    const user = await User.findOne({ authId: authId });

    if (!user) {
      console.log("No user found with given authId");
      return responseData("", 404, "No user found with given authId", "");
    }

    return responseData(user, 200, "post fetched successfully", "");
  } catch (error) {
    return responseData("", 500, "Internal server error !", error.message);
  }
}
export async function getUserByAuthUsername(username) {
  try {
    await connectDB();

    if (!username) {
      console.log("username is missing");
      return responseData("", 404, "username is missing", "");
    }
    const user = await User.findOne({ authUsername: username });

    if (!user) {
      console.log("No user found with given username");
      return responseData("", 404, "No user found with given username", "");
    }

    return responseData(user, 200, "post fetched successfully", "");
  } catch (error) {
    return responseData("", 500, "Internal server error !", error.message);
  }
}
