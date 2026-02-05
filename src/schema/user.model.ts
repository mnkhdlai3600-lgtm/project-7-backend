import { model, models, Schema } from "mongoose";

export enum userRoles {
  User = "User",
  Admin = "Admin",
}

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    orderedFoods: [{ type: Schema.Types.ObjectId, ref: "food-carts" }],
    role: {
      type: String,
      enum: Object.values(userRoles),
      default: userRoles.User,
    },
    ttl: { type: Date, expires: 300 },
    phoneNumber: { type: Number },
    phone_verified: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    user_age: { type: Number },
    address: { type: String },
  },
  { timestamps: true },
);

export default models.Users || model("Users", UserSchema);
