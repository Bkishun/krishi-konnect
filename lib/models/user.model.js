import * as mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
  authId: {
    type: String,
    unique: true,
    required: true,
  },
  authUsername: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String
  },
  adhaarNumber: {
    type: String,
    unique: true,
    required:true
  },
  address: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    required: true
  },
  profileUrl: {
    type: String
  },
  accountStatus:{
    type: Boolean,
    required: true
  }
 
  
},
{timestamps: true}
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;