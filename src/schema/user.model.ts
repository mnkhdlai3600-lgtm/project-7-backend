import mongoose, { model, models, Schema, Document, Model } from "mongoose";

type User = {
  user_name: string;
  email: string;
  phone_number?: number;
  user_age?: number;
};

interface IUserDocument extends User, Document {}

const UserSchema = new Schema<IUserDocument>(
  {
    user_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone_number: { type: Number, required: false },
    user_age: { type: Number, required: false },
  },
  { timestamps: true },
);

export const UserModel: Model<IUserDocument> = models.Users
  ? (models.Users as Model<IUserDocument>)
  : model<IUserDocument>("Users", UserSchema);
