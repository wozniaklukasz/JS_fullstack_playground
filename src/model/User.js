import { Schema, model } from "mongoose";

const userSchema = new Schema({
  googleId: String,
  facebookId: String,
  name: String,
});

const userModel = model("User", userSchema);

export default userModel;
