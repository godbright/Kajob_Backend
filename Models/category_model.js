import mongoose from "mongoose";
const { Schema } = mongoose;

const CategorySchema = new Schema(
  {
    image: { type: String, required: true },
    title: { type: String, required: true },
    desc: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Category", CategorySchema);
