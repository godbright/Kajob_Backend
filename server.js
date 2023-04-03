import express from "express";
import UserRouter from "./routes/user_routes.js";
import AuthRouter from "./routes/auth_routes.js";
import GigRouter from "./routes/gigs_routes.js";
import ReviewsRouter from "./routes/reviews_routes.js";
import OrdersRouter from "./routes/order_routes.js";
import CategoriesRouter from "./routes/categories_routes.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
mongoose.set("strictQuery", true);

const connect = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("database was connected ");
    })
    .catch(() => {
      console.log("Error with database connection");
    });
};

dotenv.config();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(express.json());
app.use("/api/users", UserRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/gig", GigRouter);
app.use("/api/reviews", ReviewsRouter);
app.use("/api/orders", OrdersRouter);
app.use("/api/categories", CategoriesRouter);
app.use((err, req, res, next) => {
  const { status, message } = err;

  res.status(status || 500).json({
    success: false,
    code: status,
    message: message || "Something went Wrong",
    stack: err.stack,
  });
});

app.listen(process.env.PORT || 3001, () => {
  //connect to database
  connect();
  console.log("The server is listening on port " + process.env.PORT);
});
