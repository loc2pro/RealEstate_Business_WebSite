import express from "express";
import Messages from "../models/messageModel.js";
const messageRouter = express.Router();
import expressAsyncHandler from "express-async-handler";
messageRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const messages = await Messages.find({});
    res.send(messages);
  })
);
messageRouter.get(
  "/getMessages",
  expressAsyncHandler(async (req, res, next) => {
    try {
      const { from, to } = req.body;

      const messages = await Messages.find({
        users: {
          $all: [from, to],
        },
      }).sort({ updatedAt: 1 });

      const projectedMessages = messages.map((msg) => {
        return {
          fromSelf: msg.sender.toString() === from,
          message: msg.message.text,
        };
      });
      res.json(projectedMessages);
    } catch (ex) {
      next(ex);
    }
  })
);

messageRouter.post(
  "/addMessages",
  expressAsyncHandler(async (req, res, next) => {
    try {
      const { from, to, message } = req.body;
      const data = await Messages.create({
        message: { text: message },
        users: [from, to],
        sender: from,
      });

      if (data) return res.json({ msg: "Message added successfully." });
      else return res.json({ msg: "Failed to add message to the database" });
    } catch (ex) {
      next(ex);
    }
  })
);
export default messageRouter;
