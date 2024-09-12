import * as mongoose from 'mongoose';
import CryptoJS from 'crypto-js'


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
    default: true,
    type: Boolean
  }
 
  
},{
  timestamps: true
})

// userSchema.pre("save", async function (next) {
//   if(!this.isModified("adhaarNumber")) return next();

//   this.adhaarNumber = CryptoJS.AES.encrypt(adhaarNumber, process.env.ENCRYPTION_KEY).toString();
//   next()
// })






const Client = mongoose.model("Client", userSchema);

export default Client;