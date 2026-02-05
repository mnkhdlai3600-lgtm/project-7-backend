import { model, models, Schema } from "mongoose";

const userOTPSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    otp: { type: String, required: true },

    createdAt: { type: Date, default: Date.now, expires: 300 },
  },
  { timestamps: true },
);

export default models.userOTP || model("userOTP", userOTPSchema);
