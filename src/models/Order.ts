import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    items: [
      {
        name: String,
        price: Number,
        quantity: Number,
        image: String,
      },
    ],

    totalAmount: Number,

    paymentStatus: {
      type: String,
      default: "paid",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Order ||
  mongoose.model("Order", OrderSchema);