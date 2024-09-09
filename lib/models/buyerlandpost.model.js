import * as mongoose from 'mongoose';


const buyerLandPostSchema = new mongoose.Schema({
  cropName: {
    type:String,
    required:true
  },
  contractType: {
    type: String,
    required:true
  },
  landArea: {
    type: String,
    required: true
  },
  discription: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  imageUrl: {
    type: String
  }
},
{timestamps: true}
);

const BuyerLandPost = mongoose.models.BuyerLandPost || mongoose.model("BuyerLandPost", buyerLandPostSchema);

export default BuyerLandPost;