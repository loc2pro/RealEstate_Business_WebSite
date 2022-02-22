import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectID, ref: "User" },
    image: { type: String, required: true },
    status: { type: String, required: true },
    type: { type: String, required: true },
    address: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    acreage: { type: Number, required: true },
    bedroom: { type: Number, required: true },
    toilet: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    rating: { type: Number, required: false },
    // numReviews: { type: Number, required: false },
    // reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", productSchema);

export default Product;
