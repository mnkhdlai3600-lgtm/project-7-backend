import { model, models, Schema } from "mongoose";

enum userRoles {
  User = "User",
  Admin = "Admin",
}

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    address: String,
    phone_number: Number,

    // ⭐ cart reference
    orderedFoods: [
      { type: Schema.Types.ObjectId, ref: "food-carts" }, // ⭐ model name match
    ],

    role: {
      type: String,
      enum: Object.values(userRoles),
      default: userRoles.User,
    },

    phone_verified: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    user_age: Number,
  },
  { timestamps: true },
);

export default models.Users || model("Users", UserSchema);
