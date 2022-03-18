import "dotenv/config";
import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";

const productRouter = express.Router();
const upload = multer();

const s3 = new AWS.S3({
  accessKeyId: "AKIAWPLFF2RHPNOWRBHJ",
  secretAccessKey: "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",
});

productRouter.get(
  "/product",
  expressAsyncHandler(async (req, res) => {
    const pageSize = 99999999999999999;
    const page = Number(req.query.pageNumber) || 1;
    const name = req.query.name || "";
    const type = req.query.type || "";
    const order = req.query.order || "";
    console.log("name", name);
    console.log(type);
    console.log(order);
    console.log(page);
    const min =
      req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const max =
      req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;

    const nameFilter = name ? { name: { $regex: name, $options: "i" } } : {};
    const typeFilter = type ? { type } : {};
    const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
    const sortOrder =
      order === "lowest"
        ? { price: 1 }
        : order === "highest"
        ? { price: -1 }
        : order === "toprated"
        ? { rating: -1 }
        : { _id: -1 };
    const count = await Product.count({
      ...nameFilter,
      ...typeFilter,
      ...priceFilter,
    });
    const products = await Product.find({
      ...nameFilter,
      ...typeFilter,
      ...priceFilter,
    })
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    res.send({ products, page, pages: Math.ceil(count / pageSize) });
  })
);

productRouter.get(
  "/categories",
  expressAsyncHandler(async (req, res) => {
    const categories = await Product.find().distinct("type");
    res.send(categories);
  })
);
productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
  })
);

productRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    // await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
  })
);
productRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    await Product.findById(req.params.id)
      .then(async (product) => {
        await User.findById(product.user)
          .then((user) => {
            res.status(200).json({
              user,
              product,
              message: "Lấy Thành Công Chi Tiết Sản Phẩm",
            });
          })
          .catch(() => {
            res.status(400).send({ err, message: "Không tìm thấy user" });
          });
      })
      .catch((err) => {
        res.status(400).send({ err, message: "Product not found" });
      });
  })
);

productRouter.post(
  "/createProducts",
  upload.single("image"),
  expressAsyncHandler(async (req, res) => {
    const {
      name,
      user,
      status,
      type,
      address,
      description,
      price,
      acreage,
      bedroom,
      toilet,
      countInStock,
      lat,
      lng,
      image ,
    } = req.body;
    await Product.insertMany({
      name: name,
      user: user,
      status: status,
      type: type,
      address: address,
      description: description,
      price: price,
      acreage: acreage,
      bedroom: bedroom,
      toilet: toilet,
      countInStock: countInStock,
      image: image,
      lat: lat,
      lng: lng,
    })
      .then(async (result) => {
        return res.status(200).json({
          success: true,
          message: `Đăng tin sản phẩm ${name} thành công`,
          result,
        });
      })
      .catch((err) => {
        return res.json({
          success: false,
          message: `Đăng tin sản phẩm ${name} thất bại`,
          err,
        });
      });
  })
);
export default productRouter;
