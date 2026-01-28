import mongoose, { model, models, Schema, Document, Model } from "mongoose";

enum userRoles {
  User = "User",
  Admin = "Admin",
}

const UserSchema = new Schema(
  {
    user_name: { type: String, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String },
    phone_number: { type: Number },
    ordered_foods: { types: Schema.ObjectId },
    role: {
      type: String,
      enum: Object.values(userRoles),
      default: userRoles.User,
    },
    phone_verified: { type: Boolean, default: false },
    orederedFood: { type: Schema.Types.ObjectId, ref: "FoodCart" },
    ttl: { type: Date },
    isVerified: { type: Boolean, default: false },
    user_age: { type: Number, required: false },
  },
  { timestamps: true },
);

const UserModel = models.User || model("Users", UserSchema);
export default UserModel;
