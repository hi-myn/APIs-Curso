import { Schema, model } from "mongoose";

const HouseSchema = new Schema({
  thumbnail: String,
  description: String,
  price: Number,
  location: String,
  status: Boolean,
  user: {
    type: Schema.Types.ObjectId, //id user
    ref: "User", //ref to User Model
  },
});

export default model("House", HouseSchema);
