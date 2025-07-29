import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name?: string;
  email: string;
  dob?: string;
  authType: "email" | "google";
  googleId?: string;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String },
    dob: { type: String },
    email: { type: String, required: true, unique: true },
    authType: { type: String, enum: ["email", "google"], required: true },
    googleId: { type: String }, // Only for Google Auth
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
