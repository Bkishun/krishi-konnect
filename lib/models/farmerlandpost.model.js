import * as mongoose from 'mongoose';


const farmerLandPostSchema = new mongoose.Schema({
  landArea: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  contractType: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    default: false,
    type: Boolean,
    required: true,

  },
  imageUrl: {
    type: String,
    required: true,

  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
  
}, {timestamps: true});

const FarmerLandPost = mongoose.models.farmerLandPost || mongoose.model("FarmerLandPost", farmerLandPostSchema);

export default FarmerLandPost;