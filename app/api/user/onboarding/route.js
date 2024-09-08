"use server"

import User from "@/lib/models/user.model";
import {connectDB} from "@/lib/mongoose";
import { NextResponse } from "next/server";


export const POST = async (request) => {
    try {
      const body = await request.json();
      console.log(request)
      console.log(body)
  
      await connectDB();
      const newUser = new User(body);
      await newUser.save();
  
      return new NextResponse(
        JSON.stringify({ message: "User is onboarded", user: newUser }),
        { status: 200 }
      );

    } catch (error) {
      return new NextResponse(
        JSON.stringify({
          message: "Error in onboarding user",
          error,
        }),
        {
          status: 500,
        }
      );
    }
  };

  export const GET = async () => {
    try {
      await connectDB();
      
      return new NextResponse(JSON.stringify({user:"jnaisa"}));
    } catch (error) {
      return new NextResponse("Error in fetching users" + error, { status: 500 });
    }
  };