import mongoose from 'mongoose';

const messageSchema = mongoose.Schema(
  {
    message: {
      text: { type: String, required: true },
    },
    users: Array,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// module.exports = mongoose.model("Messages", messageSchema);
const Messages = mongoose.model("Messages", messageSchema);
export default Messages;
