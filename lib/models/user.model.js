import * as mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  adhaarnumber: {
    type: String,
    unique: true,
    required: true,
  },
  
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;