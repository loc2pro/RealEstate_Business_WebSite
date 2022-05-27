import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import data from "../data.js";
import User from "../models/userModel.js";
import nodemailer from "nodemailer";
import { generateToken, isAdmin, isAuth } from "../utils.js";

const userRouter = express.Router();

userRouter.get(
  "/send",
  expressAsyncHandler(async (req, res) => {
    await User.remove({});
    const createdUser = await User.insertMany(data.users);
    res.send({ createdUser });
  })
);

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          isAdmin: user.isAdmin,
          isSeller: user.isSeller,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Không Tìm Thấy Email hoặc Password" });
  })
);

userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const errorPhone = await User.findOne({ phone: req.body.phone });
    if (errorPhone) {
      res.status(400).send({
        success: false,
        message: "Số điện thoại đã có người sử dụng",
      });
    }
    const errorEmail = await User.findOne({ email: req.body.email });
    if (errorEmail) {
      res.status(400).send({
        success: false,
        message: "Email đã có người sử dụng",
      });
    }
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    const createdUser = await user.save();
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      isAdmin: user.isAdmin,
      isSeller: user.isSeller,
      token: generateToken(createdUser),
    });
  })
);

userRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    console.log(req.params.id);
    const user = await User.findById(req.params.id);

    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "Không Tìm Thấy Người Dùng" });
    }
  })
);

userRouter.get(
  "/seller/:id",
  expressAsyncHandler(async (req, res) => {
    console.log(req.params.id);
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "Không Tìm Thấy Người Dùng" });
    }
  })
);

userRouter.put(
  "/profile",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.nanme;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone || user.phone;
      user.address = req.body.address || user.address;

      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        address: updatedUser.address,
        isSeller: user.isSeller,
        token: generateToken(updatedUser),
      });
    }
  })
);

userRouter.get(
  "/",
  // isAuth,
  // isAdmin,
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.send(users);
  })
);
// Thêm user
userRouter.post(
  "/admin/create",
  expressAsyncHandler(async (req, res) => {
    const errorPhone = await User.findOne({ phone: req.body.newUser.phone });
    if (errorPhone) {
      return res.status(400).send({
        success: false,
        message: "Số điện thoại đã có người sử dụng",
      });
    }
    const errorEmail = await User.findOne({ email: req.body.newUser.email });
    if (errorEmail) {
      return res.status(400).send({
        success: false,
        message: "Email đã có người sử dụng",
      });
    }
    const user = new User({
      name: req.body.newUser.name,
      email: req.body.newUser.email,
      phone: req.body.newUser.phone,
      address: req.body.newUser.address,
      password: bcrypt.hashSync(req.body.newUser.password, 8),
    });
    const createdUser = await user.save();
    return res.send({
      success: true,
      message: `Thêm thành công người dùng ${createdUser.name}`,
      user: createdUser,
    });
  })
);

// Xóa user
userRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    console.log("delete", req.params.id);
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.email === "admin@gmail.com") {
        return res.status(400).send({ message: "Can Not Delete Admin User" });
      }
      const deleteUser = await user.remove();
      res.send({ message: "User Deleted", user: deleteUser });
    } else {
      return res.status(404).send({ message: "User Not Found" });
    }
  })
);

// Sửa thông tin user
userRouter.put(
  "/admin/update",
  expressAsyncHandler(async (req, res) => {
    const errorPhone = await User.findOne({ phone: req.body.phone });
    if (errorPhone && errorPhone._id.toString() !== req.body._id) {
      return res.status(400).send({
        success: false,
        message: "Số điện thoại đã có người sử dụng",
      });
    }
    const errorEmail = await User.findOne({ email: req.body.email });
    if (errorEmail && errorEmail._id.toString() !== req.body._id) {
      return res.status(400).send({
        success: false,
        message: "Email đã có người sử dụng",
      });
    }
    const user = await User.findById(req.body._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone || user.phone;
      user.address = req.body.address || user.address;
      const updatedUser = await user.save();
      return res.send({
        success: true,
        message: "Cập nhập thành công người dùng",
        user: updatedUser,
      });
    } else {
      return res.status(404).send({
        success: false,
        message: "Không tìm thấy người dùng",
      });
    }
  })
);

// Thêm seller
userRouter.post(
  "/admin/createSeller",
  expressAsyncHandler(async (req, res) => {
    const errorPhone = await User.findOne({ phone: req.body.newUser.phone });
    if (errorPhone) {
      return res.status(400).send({
        success: false,
        message: "Số điện thoại đã có người sử dụng",
      });
    }
    const errorEmail = await User.findOne({ email: req.body.newUser.email });
    if (errorEmail) {
      return res.status(400).send({
        success: false,
        message: "Email đã có người sử dụng",
      });
    }
    console.log(req.body);
    const user = new User({
      name: req.body.newUser.name,
      email: req.body.newUser.email,
      phone: req.body.newUser.phone,
      address: req.body.newUser.address,
      password: bcrypt.hashSync(req.body.newUser.password, 8),
      isSeller: true,
      seller: { logo: req.body.img },
    });
    const createdUser = await user.save();
    return res.send({
      success: true,
      message: `Thêm thành công nhân viên ${createdUser.name}`,
      user: createdUser,
    });
  })
);

// Xóa seller
userRouter.delete(
  "/seller/:id",
  expressAsyncHandler(async (req, res) => {
    console.log("delete", req.params.id);
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.email === "admin@gmail.com") {
        return res.status(400).send({ message: "Không thể xóa admin" });
        return;
      }
      const deleteUser = await user.remove();
      res.send({ message: "Xóa thành công", user: deleteUser });
    } else {
      return res.status(404).send({ message: "Không tìm thất người dùng" });
    }
  })
);
// Sửa thông tin seller
userRouter.put(
  "/admin/updateSeller",
  // isAuth,
  // isAdmin,
  expressAsyncHandler(async (req, res) => {
    const errorPhone = await User.findOne({
      phone: req.body.phone,
    });
    if (errorPhone && errorPhone._id.toString() !== req.body._id) {
      return res.status(400).send({
        success: false,
        message: "Số điện thoại đã có người sử dụng",
      });
    }
    const errorEmail = await User.findOne({
      email: req.body.email,
    });
    if (errorEmail && errorEmail._id.toString() !== req.body._id) {
      return res.status(400).send({
        success: false,
        message: "Email đã có người sử dụng",
      });
    }
    const user = await User.findById(req.body._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone || user.phone;
      user.address = req.body.address || user.address;
      user.seller.salary = req.body.seller.salary || user.seller.salary;
      const updatedSeller = await user.save();
      return res.send({
        success: true,
        message: "Cập nhật thành công nhân viên",
        user: updatedSeller,
      });
    } else {
      return res.status(404).send({
        success: false,
        message: "Không tìm thấy nhân viên",
      });
    }
  })
);

userRouter.get(
  "/admin/seller",
  // isAuth,
  expressAsyncHandler(async (req, res) => {
    const sellers = await User.find({ isSeller: true });
    res.status(200).send(sellers);
  })
);

userRouter.get(
  "/admin/user",
  // isAuth,
  // isAdmin,
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({ isSeller: false, isAdmin: false });
    res.status(200).send(users);
  })
);
// Thanh toán lương
userRouter.put(
  "/admin/payment/:id",
  // isAuth,
  // isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.seller.bonus = 0;
      const paymentSeller = await user.save();
      res.send({
        success: true,
        message: "Thanh toán lương thành công",
        user: paymentSeller,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "Thanh toán thất bại",
      });
    }
  })
);

userRouter.post(
  "/forgot",
  expressAsyncHandler(async (req, res) => {
    const { email } = req.body;
    console.log(email, "email");
    var mail = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "locit2000@gmail.com",
        pass: "Loc0981074090",
      },
    });
    let newpass = await (Math.random() + 1).toString(36).substring(7);
    var mailOptions = {
      from: "locit2000@gmail.com",
      to: email,
      subject: "Reset Password ",
      html: `<p>Mật khẩu mới của bạn là:${newpass}</p>`,
    };
    const hash = await bcrypt.hash(newpass, 10);
    if (hash) {
      const user = await User.findOne({ email: email });
      console.log(user, "user");
      if (user) {
        user.password = hash || user.password;
        const updatedPassWord = await user.save();
        if (updatedPassWord) {
          mail.sendMail(mailOptions, function (error, info) {
            if (error) {
              return res.status(400).json({
                success: false,
                err: error,
                message: "Vui Lòng Nhập Lại Email",
              });
            } else {
              return res.status(200).json({
                success: true,
                message: "Vui Lòng Kiểm Tra Email Của Bạn",
              });
            }
          });
        } else {
          res.status(404).send({
            success: false,
            message: "Không thể cập nhập password",
          });
        }
      } else {
        res.status(400).send({
          success: false,
          message: "Không tìm thấy email người dùng",
        });
      }
    } else {
      res.status(400).send({
        success: false,
        message: "Lỗi server chưa thể tạo pass",
      });
    }

    //   await User.update({ password: hash }, { where: { email: email } })
    //     .then((result) => {
    //       if (result > 0) {
    //         mail.sendMail(mailOptions, function (error, info) {
    //           if (error) {
    //             res.status(400).json({
    //               success: false,
    //               err: error,
    //               message: "Vui Lòng Nhập Lại Email",
    //             });
    //           } else {
    //             return res.status(200).json({
    //               success: true,
    //               newpass: newpass,
    //               message: "Vui Lòng Kiểm Tra Email Của Bạn",
    //               result,
    //             });
    //           }
    //         });
    //       } else {
    //         return res.status(400).json({
    //           success: false,
    //           message: "Thất bại",
    //           err: error,
    //         });
    //       }
    //     })
    //     .catch((err) => {
    //       return res.status(400).json({
    //         success: false,
    //         err: err,
    //         message: "Email Không Tồn Tại",
    //       });
    //     });
    // });
  })
);
export default userRouter;
