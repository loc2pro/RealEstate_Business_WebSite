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
    // if (product) {
    //   res.send(product);
    // } else {
    //   res.status(400).send({ message: "Product not found" });
    // }
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
    } = req.body;
    const file = req.file;
    let myFile = req.file.originalname.split(".");
    const fileTyle = myFile[myFile.length - 1];
    console.log(file);
    console.log("first", myFile);

    const params = {
      Bucket: "nguyenhuuloc-sinhvien-iuh",
      Key: `${uuidv4()}.${fileTyle}`,
      Body: req.file.buffer,
      ContentType: "image/png",
    };
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
      image: params.Key,
    })
      .then(async (result) => {
        s3.upload(params, upload.fields([]), (error, data) => {
          if (error) {
            console.log(error.message);
            return res.status(400).json({
              success: false,
              message: "Upload hình sản phẩm thất bại",
            });
          }
          return res.status(200).json({
            success: true,
            message: `Đăng tin sản phẩm ${name} thành công`,
            result,
          });
        });
      })
      .catch((err) => {
        console.log(err.message);
        return res.status(400).json({
          success: false,
          message: `Đăng tin sản phẩm ${name} thất bại`,
          err,
        });
      });
  })
);
export default productRouter;
