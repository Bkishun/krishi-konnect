"use server"
import User from "../models/user.model";
import { connectDB } from "../mongoose"


export const postUser = async (body) => {
    try {

        await connectDB();
        console.log(body)
        const newUser = new User(body);
        await newUser.save();

        console.log(newUser)

        
    } catch (error) {
        throw new Error(error)
        
    }
}

