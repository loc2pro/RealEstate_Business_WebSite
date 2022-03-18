import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectID, ref: "User" },
    image: [{ type: String, required: true }],
    status: { type: String, required: true },
    type: { type: String, required: true },
    address: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    acreage: { type: Number, required: true },
    bedroom: { type: Number, required: true },
    toilet: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", productSchema);

export default Product;
