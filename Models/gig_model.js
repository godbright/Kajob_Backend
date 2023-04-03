import mongoose from "mongoose";
const { Schema } = mongoose;

const GigSchema = new Schema(
  {
    title: { type: String, required: true },
    userId: { type: String, required: true },
    short_title: { type: String, required: true },
    userId: { type: String, required: true },
    description: { type: String, required: true },
    totalStars: { type: Number, required: true },
    startNumber: { type: Number, required: true },
    image: { type: [String], required: true },
    rating: { type: Number, enum: [1, 2, 3, 4, 5] },
    price: { type: Number, required: true },
    cover: { type: String, required: true },
    deliveryTime: { type: Number, required: true },
    features: { type: [String], required: false },
    category: { type: String, required: true },
    revisionNumber: { type: Number, required: true },
    sales: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Gig", GigSchema);
