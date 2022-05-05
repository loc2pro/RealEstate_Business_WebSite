import AWS from "aws-sdk";
import "dotenv/config";
import express from "express";
import expressAsyncHandler from "express-async-handler";
import fs from "fs";
import multer from "multer";
import data from "../data.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";
const productRouter = express.Router();
const upload = multer();

const s3 = new AWS.S3({
  accessKeyId: "AKIAWPLFF2RHPNOWRBHJ",
  secretAccessKey: "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",
});

productRouter.get(
  "/product",
  expressAsyncHandler(async (req, res) => {
    console.log(req.query);
    const pageSize = 99999999999999999;
    const page = Number(req.query.pageNumber) || 1;
    const name = req.query.name || "";
    const city = req.query.city || "";
    const district = req.query.district || "";
    const ward = req.query.ward || "";
    const type = req.query.type || "";
    const order = req.query.order || "";
    const min =
      req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const max =
      req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;

    const nameFilter = name ? { name: { $regex: name, $options: "i" } } : {};
    const typeFilter = type ? { type } : {};
    const cityFilter = city ? { city } : {};
    const districtFilter = district ? { district } : {};
    const wardFilter = ward ? { ward } : {};
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
      ...cityFilter,
      ...districtFilter,
      ...wardFilter,
      ...typeFilter,
      ...priceFilter,
    });
    const products = await Product.find({
      ...nameFilter,
      ...cityFilter,
      ...districtFilter,
      ...wardFilter,
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
  "/browse",
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({ browse: false });
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
      .populate("seller", "name email phone")
      .populate("user", "name email phone")
      .then(async (product) => {
        res.status(200).json({
          message: "Lấy thành công chi tiết sản phẩm",
          product,
        });
      })
      .catch((err) => {
        res.status(400).send({ err, message: "Product not found" });
      });
  })
);
// Đăng bài của user
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
      city,
      district,
      ward,
      description,
      price,
      acreage,
      bedroom,
      toilet,
      countInStock,
      lat,
      lng,
      image,
      utilities,
      legalDocuments,
    } = req.body;
    await Product.insertMany({
      name: name,
      user: user,
      status: status,
      type: type,
      address: address,
      city: city,
      district: district,
      ward: ward,
      description: description,
      price: price,
      acreage: acreage,
      bedroom: bedroom,
      toilet: toilet,
      countInStock: countInStock,
      image: image,
      lat: lat,
      lng: lng,
      utilities: utilities,
      legalDocuments: legalDocuments,
    })
      .then(async (result) => {
        return res.status(200).json({
          success: true,
          message: `Đăng tin ${name} thành công và chờ duyệt `,
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
// lịch sử đăng bài của user
productRouter.post(
  "/postHistory",
  expressAsyncHandler(async (req, res) => {
    const userId = req.body.userId;
    // console.log(userId);
    await Product.find({ user: userId })
      .then(async (product) => {
        res.status(200).json({
          product,
          message: "Lấy Thành Công Lịch Sử Bài Đăng",
        });
      })

      .catch((err) => {
        res.status(400).send({ err, message: "Không tìm thấy sản phẩm" });
      });
  })
);
// Xóa sản phẩm của user
productRouter.delete(
  "/postHistory/:id",
  expressAsyncHandler(async (req, res) => {
    try {
      const productId = req.params.id;
      console.log(productId);
      const product = await Product.findById(productId);
      if (product) {
        const deletedProduct = await product.remove();
        res.send({
          message: `Xóa thành công sản phẩm ${deletedProduct.name}`,
          product: deletedProduct,
        });
      } else {
        res.status(404).send({ message: "Không tìm thấy sản phẩm" });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  })
);
// Sửa bài đăng của user
productRouter.put(
  "/postHistory/update/:id",
  expressAsyncHandler(async (req, res) => {
    const newProduct = req.body.newPost;
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = newProduct.name || product.name;
      product.status = newProduct.status || product.status;
      product.type = newProduct.type || product.type;
      product.description = newProduct.description || product.description;
      product.price = newProduct.price || product.price;
      product.acreage = newProduct.acreage || product.acreage;
      product.bedroom = newProduct.bedroom || product.bedroom;
      product.toilet = newProduct.toilet || product.toilet;

      const updatedProduct = await product.save();
      res.status(200).send({
        success: true,
        message: `Cập nhật thành công sản phẩm ${updatedProduct.name}`,
        product: updatedProduct,
      });
    } else {
      res
        .status(404)
        .send({ success: false, message: "Không tìm thấy sản phẩm" });
    }
  })
);
// Cập nhật sản phẩm của admin
productRouter.put(
  "/admin/update/:id",
  expressAsyncHandler(async (req, res) => {
    const newProduct = req.body.newProduct;
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = newProduct.name || product.name;
      product.status = newProduct.status || product.status;
      product.type = newProduct.type || product.type;
      product.description = newProduct.description || product.description;
      product.price = newProduct.price || product.price;
      product.acreage = newProduct.acreage || product.acreage;
      product.bedroom = newProduct.bedroom || product.bedroom;
      product.toilet = newProduct.toilet || product.toilet;

      const updatedProduct = await product.save();
      res.status(200).send({
        success: true,
        message: `Cập nhật thành công sản phẩm ${updatedProduct.name}`,
        product: updatedProduct,
      });
    } else {
      res
        .status(404)
        .send({ success: false, message: "Không tìm thấy sản phẩm" });
    }
  })
);
// Xóa sản phẩm của admin
productRouter.delete(
  "/admin/:id",
  expressAsyncHandler(async (req, res) => {
    try {
      const productId = req.params.id;
      console.log(productId);
      const product = await Product.findById(productId);
      if (product) {
        const deletedProduct = await product.remove();
        res.send({
          message: `Xóa thành công sản phẩm ${deletedProduct.name}`,
          product: deletedProduct,
        });
      } else {
        res.status(404).send({ message: "Không tìm thấy sản phẩm" });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  })
);
// duyệt bài
productRouter.put(
  "/browse/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.browse = true;
      const updatedProduct = await product.save();
      res.status(200).send({
        success: true,
        message: `Duyệt thành công bài đăng ${updatedProduct.name}`,
        product: updatedProduct,
      });
    } else {
      res
        .status(404)
        .send({ success: false, message: "Không tìm thấy bài đăng" });
    }
  })
);
//get tất cả sản phẩm của nhân viên đó đã bán
productRouter.get(
  "/seller/sold/:id",
  expressAsyncHandler(async (req, res) => {
    const sellerId = req.params.id;
    console.log(sellerId);
    await Product.find({ seller: sellerId, countInStock: 0 })
      .populate("user", "name email phone address")
      .then(async (product) => {
        res.status(200).json({
          product,
          message: "Lấy thành công danh sách sản phẩm",
        });
      })

      .catch((err) => {
        res.status(400).send({ err, message: "Không tìm thấy sản phẩm" });
      });
  })
);
//get tất cả sản phẩm của nhân viên chưa bán
productRouter.get(
  "/seller/notsold/:id",
  expressAsyncHandler(async (req, res) => {
    const sellerId = req.params.id;
    console.log(sellerId);
    await Product.find({ seller: sellerId, countInStock: 1 })
      .populate("user", "name email phone address")
      .then(async (product) => {
        res.status(200).json({
          product,
          message: "Lấy thành công danh sách sản phẩm",
        });
      })

      .catch((err) => {
        res.status(400).send({ err, message: "Không tìm thấy sản phẩm" });
      });
  })
);
// Xác nhận bán sản phẩm
productRouter.put(
  "/seller/update/:id",
  expressAsyncHandler(async (req, res) => {
    console.log("id", req.params.id);
    const product = await Product.findById(req.params.id).populate(
      "seller",
      "name email seller"
    );
    if (product) {
      product.countInStock = 0;
      const bonus = product.seller.seller.bonus + product.price * 0.01;
      const seller = await User.findById(product.seller._id);
      if (seller) {
        seller.seller.bonus = bonus;
        const updateBonus = await seller.save();
      }
      product.seller.seller.bonus = bonus;
      const updatedProduct = await product.save();
      res.status(200).send({
        success: true,
        message: `Xác nhận đã bán sản phẩm ${updatedProduct.name}`,
        product: updatedProduct,
      });
    } else {
      res
        .status(404)
        .send({ success: false, message: "Không tìm thấy sản phẩm" });
    }
  })
);
// Phân công

productRouter.put(
  "/admin/assignment",
  expressAsyncHandler(async (req, res) => {
    const productId = req.body.productId;
    if (productId.length < 1) {
      return res.send({
        success: false,
        message: `Bạn chưa chọn sản phẩm`,
      });
    }
    const sellerId = req.body.selectedRowKeysSeller;
    if (sellerId.length < 1) {
      return res.send({
        success: false,
        message: `Bạn chưa chọn sản phẩm`,
      });
    }
    console.log(req.body);
    let listProduct = [];
    await Promise.all(
      productId.map(async (item) => {
        const product = await Product.findById(item);
        if (product) {
          product.browse = true;
          product.seller = sellerId || product.seller;
          const assignment = await product.save();
          listProduct.push(assignment);
        }
      })
    )
      .then((result) => {})
      .catch((err) => {});
    return res.send({
      listProduct,
      success: true,
      message: `Đã phân công sản phẩm`,
    });
  })
);
productRouter.get(
  "/admin/testtt",
  expressAsyncHandler(async (req, res) => {
    fs.readFile("backend/routers/aaddadad.json", (err, data) => {
      if (err) {
        console.log(`Error reading file from disk: ${err}`);
      } else {
        const databases = JSON.parse(data);

        databases.forEach((db) => {
          console.log(db);
        });
      }
    });
  })
);
export default productRouter;
