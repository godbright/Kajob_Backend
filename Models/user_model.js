import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    UserName: { type: String, required: true },
    Country: { type: String },
    Email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: Number, required: false },
    isSeller: { type: Boolean, default: false },
    role: { type: Number, default: 0 },
    img: { type: String, required: false },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);

//1 super admin
//2 admin
