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
    const pageSize = 4;
    const page = Number(req.query.pageNumber) || 1;
    const name = req.query.name || "";
    const city = req.query.city || "";
    const district = req.query.district || "";
    const ward = req.query.ward || "";
    const type = req.query.type || "";
    const status = req.query.status || "";
    const order = req.query.order || "";
    const direction = req.query.direction || "";

    const min =
      req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const max =
      req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;

    const nameFilter = name ? { name: { $regex: name, $options: "i" } } : {};
    const typeFilter = type ? { type } : {};
    const statusFilter = status ? { status } : {};
    const directionFilter = direction ? { direction } : {};
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
      ...statusFilter,
      ...directionFilter,
      browse: true,
      countInStock: 1,
    });
    const products = await Product.find({
      ...nameFilter,
      ...cityFilter,
      ...districtFilter,
      ...wardFilter,
      ...typeFilter,
      ...priceFilter,
      ...statusFilter,
      ...directionFilter,
      browse: true,
      countInStock: 1,
    })
      .sort(sortOrder)
      .populate("seller", "name email phone seller")
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    res.send({ products, page, pages: Math.ceil(count / pageSize), count });
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
    const products = await Product.find({
      browse: true,
      countInStock: 1,
    }).populate("seller", "name email phone seller");
    res.send(products);
  })
);
productRouter.get(
  "/productAdmin",
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({}).populate(
      "seller",
      "name email phone seller"
    );
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
      .populate("seller", "name email phone seller")
      .populate("user", "name email phone")
      .then(async (product) => {
        res.status(200).json({
          message: "L???y th??nh c??ng chi ti???t s???n ph???m",
          product,
        });
      })
      .catch((err) => {
        res.status(400).send({ err, message: "Product not found" });
      });
  })
);
// ????ng b??i c???a user
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
      floor,
      direction,
    } = req.body;
    console.log(req.body);
    if (!name) {
      return res.status(400).json({
        success: false,
        message: `T??n s???n ph???m kh??ng ???????c r???ng.`,
      });
    }
    if (!user) {
      return res.status(400).json({
        success: false,
        message: `B???n c???n ????ng nh???p tr?????c khi g???i b??i .`,
      });
    }
    if (!status) {
      return res.status(400).json({
        success: false,
        message: `Tr???ng th??i s???n ph???m kh??ng ???????c r???ng.`,
      });
    }
    if (!type) {
      return res.status(400).json({
        success: false,
        message: `Lo???i s???n ph???m kh??ng ???????c r???ng.`,
      });
    }
    if (!address) {
      return res.status(400).json({
        success: false,
        message: `?????a ch??? s???n ph???m kh??ng ???????c r???ng.`,
      });
    }
    if (!city) {
      return res.status(400).json({
        success: false,
        message: `T???nh/th??nh ph??? s???n ph???m kh??ng ???????c r???ng.`,
      });
    }
    if (!district) {
      return res.status(400).json({
        success: false,
        message: `X??/ ph?????ng s???n ph???m kh??ng ???????c r???ng.`,
      });
    }
    if (!ward) {
      return res.status(400).json({
        success: false,
        message: `Qu???n/huy???n s???n ph???m kh??ng ???????c r???ng.`,
      });
    }
    if (!price) {
      return res.status(400).json({
        success: false,
        message: `Gi?? s???n ph???m kh??ng ???????c r???ng.`,
      });
    }
    if (!acreage) {
      return res.status(400).json({
        success: false,
        message: `Di???n t??ch s???n ph???m kh??ng ???????c r???ng.`,
      });
    }
    if (!description) {
      return res.status(400).json({
        success: false,
        message: `M?? t??? s???n ph???m kh??ng ???????c r???ng.`,
      });
    }
    if (!bedroom) {
      return res.status(400).json({
        success: false,
        message: `Ph??ng ng??? s???n ph???m kh??ng ???????c r???ng.`,
      });
    }
    if (!toilet) {
      return res.status(400).json({
        success: false,
        message: `Nh?? v??? sinh s???n ph???m kh??ng ???????c r???ng.`,
      });
    }
    if (!legalDocuments) {
      return res.status(400).json({
        success: false,
        message: `B???n ch??a ch???n gi???y t??? ph??p l??.`,
      });
    }
    if (!floor) {
      return res.status(400).json({
        success: false,
        message: `S??? t???ng s???n ph???m kh??ng ???????c r???ng.`,
      });
    }
    if (!direction) {
      return res.status(400).json({
        success: false,
        message: `B???n ch??a ch???n h?????ng s???n ph???m.`,
      });
    }
    if (!image) {
      return res.status(400).json({
        success: false,
        message: `Vui l??ng th??m h??nh ???nh.`,
      });
    }
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
      floor: floor,
      direction: direction,
    })
      .then(async (result) => {
        return res.status(200).json({
          success: true,
          message: `G???i tin ${name} th??nh c??ng v?? ch??? duy???t `,
          result,
        });
      })
      .catch((err) => {
        return res.json({
          success: false,
          message: `G???i tin s???n ph???m ${name} th???t b???i`,
          err,
        });
      });
  })
);
// l???ch s??? ????ng b??i c???a user
productRouter.post(
  "/postHistory",
  expressAsyncHandler(async (req, res) => {
    const userId = req.body.userId;
    // console.log(userId);
    await Product.find({ user: userId })
      .then(async (product) => {
        res.status(200).json({
          product,
          message: "L???y Th??nh C??ng L???ch S??? B??i ????ng",
        });
      })

      .catch((err) => {
        res.status(400).send({ err, message: "Kh??ng t??m th???y s???n ph???m" });
      });
  })
);
// X??a s???n ph???m c???a user
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
          success: true,
          message: `X??a th??nh c??ng s???n ph???m ${deletedProduct.name}`,
          product: deletedProduct,
        });
      } else {
        res
          .status(404)
          .send({ success: false, message: "Kh??ng t??m th???y s???n ph???m" });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  })
);
// S???a b??i ????ng c???a user
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
        message: `C???p nh???t th??nh c??ng s???n ph???m ${updatedProduct.name}`,
        product: updatedProduct,
      });
    } else {
      res
        .status(404)
        .send({ success: false, message: "Kh??ng t??m th???y s???n ph???m" });
    }
  })
);
// C???p nh???t s???n ph???m c???a admin
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
        message: `C???p nh???t th??nh c??ng s???n ph???m ${updatedProduct.name}`,
        product: updatedProduct,
      });
    } else {
      res
        .status(404)
        .send({ success: false, message: "Kh??ng t??m th???y s???n ph???m" });
    }
  })
);
// X??a s???n ph???m c???a admin
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
          message: `X??a th??nh c??ng s???n ph???m ${deletedProduct.name}`,
          product: deletedProduct,
        });
      } else {
        res.status(404).send({ message: "Kh??ng t??m th???y s???n ph???m" });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  })
);
// duy???t b??i
productRouter.put(
  "/browse/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.browse = true;
      const updatedProduct = await product.save();
      res.status(200).send({
        success: true,
        message: `Duy???t th??nh c??ng b??i ????ng ${updatedProduct.name}`,
        product: updatedProduct,
      });
    } else {
      res
        .status(404)
        .send({ success: false, message: "Kh??ng t??m th???y b??i ????ng" });
    }
  })
);
//get t???t c??? s???n ph???m c???a nh??n vi??n ???? ???? b??n
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
          message: "L???y th??nh c??ng danh s??ch s???n ph???m",
        });
      })

      .catch((err) => {
        res.status(400).send({ err, message: "Kh??ng t??m th???y s???n ph???m" });
      });
  })
);
//get t???t c??? s???n ph???m c???a nh??n vi??n ch??a b??n
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
          message: "L???y th??nh c??ng danh s??ch s???n ph???m",
        });
      })

      .catch((err) => {
        res.status(400).send({ err, message: "Kh??ng t??m th???y s???n ph???m" });
      });
  })
);
// X??c nh???n b??n s???n ph???m
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
        message: `X??c nh???n ???? b??n s???n ph???m ${updatedProduct.name}`,
        product: updatedProduct,
      });
    } else {
      res
        .status(404)
        .send({ success: false, message: "Kh??ng t??m th???y s???n ph???m" });
    }
  })
);
// Ph??n c??ng

productRouter.put(
  "/admin/assignment",
  expressAsyncHandler(async (req, res) => {
    const productId = req.body.productId;
    if (productId.length < 1) {
      return res.send({
        success: false,
        message: `B???n ch??a ch???n s???n ph???m`,
      });
    }
    const sellerId = req.body.selectedRowKeysSeller;
    if (sellerId.length < 1) {
      return res.send({
        success: false,
        message: `B???n ch??a ch???n s???n ph???m`,
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
      message: `???? ph??n c??ng v?? ????ng s???n ph???m`,
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
