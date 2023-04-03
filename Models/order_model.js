import mongoose from "mongoose";
const { Schema } = mongoose;

const ReviewsSchema = new Schema(
  {
    gigId: { type: String, required: true },
    img: { type: String },
    title: { type: String, required: true },
    price: { type: Number },
    iscompleted: { type: Boolean, default: false },
    sellerId: { type: String, required: true },
    buyerId: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Order", ReviewsSchema);
