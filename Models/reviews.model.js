import mongoose from "mongoose";
const { Schema } = mongoose;

const ReviewsSchema = new Schema(
  {
    stars: { type: String, required: false, enum: [1, 2, 3, 4, 5] },
    description: { type: String, required: true },
    userId: { type: String, required: true },
    gigId: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Review", ReviewsSchema);
