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
    const pageSize = 4;
    const page = Number(req.query.pageNumber) || 1;
    const name = req.query.name || "";
    const city = req.query.city || "";
    const district = req.query.district || "";
    const ward = req.query.ward || "";
    const type = req.query.type || "";
    const status = req.query.status || "";
    const order = req.query.order || "";
    const min =
      req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const max =
      req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;

    const nameFilter = name ? { name: { $regex: name, $options: "i" } } : {};
    const typeFilter = type ? { type } : {};
    const statusFilter = status ? { status } : {};
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
    const count = await Ground.count({
      ...nameFilter,
      ...cityFilter,
      ...districtFilter,
      ...wardFilter,
      ...typeFilter,
      ...priceFilter,
      ...statusFilter,
      browse: true,
      countInStock: 1,
    });
    const grounds = await Ground.find({
      ...nameFilter,
      ...cityFilter,
      ...districtFilter,
      ...wardFilter,
      ...typeFilter,
      ...priceFilter,
      ...statusFilter,
      browse: true,
      countInStock: 1,
    })
      .sort(sortOrder)
      .populate("seller", "name email phone seller")
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    res.send({ grounds, page, pages: Math.ceil(count / pageSize) });
  })
);

groundRouter.get(
  "/categories",
  expressAsyncHandler(async (req, res) => {
    const categories = await Ground.find().distinct("type");
    res.send(categories);
  })
);
groundRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const grounds = await Ground.find().populate(
      "seller",
      "name email phone seller"
    );
    res.send(grounds);
  })
);

groundRouter.get(
  "/browse",
  expressAsyncHandler(async (req, res) => {
    const grounds = await Ground.find({ browse: false });
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
      .populate("seller", "name email phone seller")
      .populate("user", "name email phone")
      .then(async (ground) => {
        await User.findById(ground.user)
          .then((user) => {
            res.status(200).json({
              user,
              ground,
              message: "L???y Th??nh C??ng Chi Ti???t S???n Ph???m",
            });
          })
          .catch(() => {
            res.status(400).send({ err, message: "Kh??ng t??m th???y user" });
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
    const { name, user, description, countInStock, price, acreage } =
      req.body.newGround;
    const image = req.body.listImages;
    const lat = req.body.lat;
    const lng = req.body.lng;
    const address = req.body.address;
    const ward = req.body.ward;
    const city = req.body.city;
    const district = req.body.district;
    const status = req.body.status;
    const legalDocuments = req.body.legalDocuments;
    const type = req.body.type;
    console.log(req.body);
    if (!image) {
      return res.status(400).json({
        success: false,
        message: `Vui l??ng th??m h??nh ???nh.`,
      });
    }

    await Ground.insertMany({
      name: name,
      user: user,
      status: status,
      type: type,
      address: address,
      city: city,
      ward: ward,
      district: district,
      description: description,
      price: price,
      countInStock: countInStock,
      acreage: acreage,
      image: image,
      lat: lat,
      lng: lng,
      legalDocuments: legalDocuments,
    })
      .then(async (result) => {
        return res.status(200).json({
          success: true,
          message: `????ng tin s???n ph???m ${name} th??nh c??ng`,
          result,
        });
      })
      .catch((err) => {
        console.log(err);

        return res.json({
          success: false,
          message: `????ng tin s???n ph???m ${name} th???t b???i`,
          err,
        });
      });
  })
);
// l???ch s??? ????ng b??i s???n ph???m ?????t c???a user
groundRouter.post(
  "/postGroundHistory",
  expressAsyncHandler(async (req, res) => {
    const userId = req.body.userId;
    // console.log(userId);
    await Ground.find({ user: userId })
      .then(async (ground) => {
        res.status(200).json({
          ground,
          message: "L???y Th??nh C??ng L???ch S??? B??i ????ng ?????t",
        });
      })

      .catch((err) => {
        res.status(400).send({ err, message: "Kh??ng t??m th???y s???n ph???m" });
      });
  })
);
// X??a s???n ph???m c???a user
groundRouter.delete(
  "/postGroundHistory/:id",
  expressAsyncHandler(async (req, res) => {
    try {
      const groundId = req.params.id;
      const ground = await Ground.findById(groundId);
      if (ground) {
        const deletedGround = await ground.remove();
        res.send({
          message: `X??a th??nh c??ng s???n ph???m ${deletedGround.name}`,
          ground: deletedGround,
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
// S???a b??i ????ng c???a user
groundRouter.put(
  "/postGroundHistory/update/:id",
  expressAsyncHandler(async (req, res) => {
    const newGround = req.body.newPost;
    const ground = await Ground.findById(req.params.id);
    if (ground) {
      ground.name = newGround.name || ground.name;
      ground.status = newGround.status || ground.status;
      ground.type = newGround.type || ground.type;
      ground.description = newGround.description || ground.description;
      ground.price = newGround.price || ground.price;
      ground.acreage = newGround.acreage || ground.acreage;

      const updatedGround = await ground.save();
      res.status(200).send({
        success: true,
        message: `C???p nh???t th??nh c??ng s???n ph???m ${updatedGround.name}`,
        ground: updatedGround,
      });
    } else {
      res
        .status(404)
        .send({ success: false, message: "Kh??ng t??m th???y s???n ph???m" });
    }
  })
);
// C???p nh???t s???n ph???m c???a admin
groundRouter.put(
  "/admin/updateGround/:id",
  expressAsyncHandler(async (req, res) => {
    const newGround = req.body.newGround;
    const ground = await Ground.findById(req.params.id);
    if (ground) {
      ground.name = newGround.name || ground.name;
      ground.status = newGround.status || ground.status;
      ground.type = newGround.type || ground.type;
      ground.description = newGround.description || ground.description;
      ground.price = newGround.price || ground.price;
      ground.acreage = newGround.acreage || ground.acreage;
      ground.bedroom = newGround.bedroom || ground.bedroom;
      ground.toilet = newGround.toilet || ground.toilet;

      const updatedGround = await ground.save();
      res.status(200).send({
        success: true,
        message: `C???p nh???t th??nh c??ng s???n ph???m ${updatedGround.name}`,
        product: updatedGround,
      });
    } else {
      res
        .status(404)
        .send({ success: false, message: "Kh??ng t??m th???y s???n ph???m" });
    }
  })
);
// X??a s???n ph???m c???a admin
groundRouter.delete(
  "/adminGround/:id",
  expressAsyncHandler(async (req, res) => {
    try {
      const groundId = req.params.id;
      console.log(groundId);
      const ground = await Ground.findById(groundId);
      if (ground) {
        const deletedGround = await ground.remove();
        res.send({
          message: `X??a th??nh c??ng s???n ph???m ${deletedGround.name}`,
          product: deletedGround,
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
groundRouter.put(
  "/browseGround/:id",
  expressAsyncHandler(async (req, res) => {
    const ground = await Ground.findById(req.params.id);
    if (ground) {
      ground.browse = true;
      const updatedGround = await ground.save();
      res.status(200).send({
        success: true,
        message: `Duy???t th??nh c??ng b??i ????ng ${updatedGround.name}`,
        ground: updatedGround,
      });
    } else {
      res
        .status(404)
        .send({ success: false, message: "Kh??ng t??m th???y b??i ????ng" });
    }
  })
);

//get t???t c??? s???n ph???m c???a nh??n vi??n ???? ???? b??n
groundRouter.get(
  "/seller/soldGround/:id",
  expressAsyncHandler(async (req, res) => {
    const sellerId = req.params.id;
    console.log(sellerId);
    await Ground.find({ seller: sellerId, countInStock: 0 })
      .populate("user", "name email phone address")
      .then(async (ground) => {
        res.status(200).json({
          ground,
          message: "L???y th??nh c??ng danh s??ch s???n ph???m1",
        });
      })

      .catch((err) => {
        res.status(400).send({ err, message: "Kh??ng t??m th???y s???n ph???m" });
      });
  })
);

//get t???t c??? s???n ph???m c???a nh??n vi??n ch??a b??n
groundRouter.get(
  "/seller/notsoldGround/:id",
  expressAsyncHandler(async (req, res) => {
    const sellerId = req.params.id;
    console.log(sellerId);
    await Ground.find({ seller: sellerId, countInStock: 1 })
      .populate("user", "name email phone address")
      .then(async (ground) => {
        res.status(200).json({
          ground,
          message: "L???y th??nh c??ng danh s??ch s???n ph???m",
        });
      })

      .catch((err) => {
        res.status(400).send({ err, message: "Kh??ng t??m th???y s???n ph???m" });
      });
  })
);

// X??c nh???n b??n s???n ph???m
groundRouter.put(
  "/seller/updateGround/:id",
  expressAsyncHandler(async (req, res) => {
    console.log("id", req.params.id);
    const ground = await Ground.findById(req.params.id).populate(
      "seller",
      "name email seller"
    );
    console.log(ground);
    if (ground) {
      ground.countInStock = 0;
      const bonus = ground.seller.seller.bonus + ground.price * 0.01;
      const seller = await User.findById(ground.seller._id);
      if (seller) {
        seller.seller.bonus = bonus;
        const updateBonus = await seller.save();
      }
      ground.seller.seller.bonus = bonus;
      const updatedGround = await ground.save();
      res.status(200).send({
        success: true,
        message: `X??c nh???n ???? b??n s???n ph???m ${updatedGround.name}`,
        ground: updatedGround,
      });
    } else {
      res
        .status(404)
        .send({ success: false, message: "Kh??ng t??m th???y s???n ph???m" });
    }
  })
);

// Ph??n c??ng

groundRouter.put(
  "/admin/assignmentGround",
  expressAsyncHandler(async (req, res) => {
    const groundId = req.body.groundId;
    if (groundId.length < 1) {
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
      groundId.map(async (item) => {
        const ground = await Ground.findById(item);
        if (ground) {
          ground.browse = true;
          ground.seller = sellerId || ground.seller;
          const assignment = await ground.save();
          listProduct.push(assignment);
        }
      })
    )
      .then((result) => {})
      .catch((err) => {});

    return res.send({
      listProduct,
      success: true,
      message: `???? ph??n c??ng s???n ph???m`,
    });
  })
);
export default groundRouter;
