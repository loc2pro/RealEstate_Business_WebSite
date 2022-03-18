import "dotenv/config";
import express from "express";
import expressAsyncHandler from "express-async-handler";
import multer from "multer";
import data from "../data.js";
import Ground from "../models/groundModel.js";
import User from "../models/userModel.js";

const groundRouter = express.Router();
const upload = multer();

groundRouter.get(
  "/ground",
  expressAsyncHandler(async (req, res) => {
    const pageSize = 99999999999999999;
    const page = Number(req.query.pageNumber) || 1;
    const name = req.query.name || "";
    const type = req.query.type || "";
    const order = req.query.order || "";
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
    const count = await Ground.count({
      ...nameFilter,
      ...typeFilter,
      ...priceFilter,
    });
    const grounds = await Ground.find({
      ...nameFilter,
      ...typeFilter,
      ...priceFilter,
    })
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    res.send({ grounds, page, pages: Math.ceil(count / pageSize) });
  })
);

// groundRouter.get(
//   "/categories",
//   expressAsyncHandler(async (req, res) => {
//     const categories = await ground.find().distinct("type");
//     res.send(categories);
//   })
// );
groundRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const grounds = await Ground.find({});
    res.send(grounds);
  })
);

groundRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    // await ground.remove({});
    const createdGrounds = await Ground.insertMany(data.grounds);
    res.send({ createdGrounds });
  })
);
groundRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    await Ground.findById(req.params.id)
      .then(async (ground) => {
        await User.findById(ground.user)
          .then((user) => {
            res.status(200).json({
              user,
              ground,
              message: "Lấy Thành Công Chi Tiết Sản Phẩm",
            });
          })
          .catch(() => {
            res.status(400).send({ err, message: "Không tìm thấy user" });
          });
      })
      .catch((err) => {
        res.status(400).send({ err, message: "ground not found" });
      });
  })
);

groundRouter.post(
  "/createGrounds",
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
      lat,
      lng,
      image,
    } = req.body;
    console.log(req.body);
    await Ground.insertMany({
      name: name,
      user: user,
      status: status,
      type: type,
      address: address,
      description: description,
      price: price,
      acreage: acreage,
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
export default groundRouter;
