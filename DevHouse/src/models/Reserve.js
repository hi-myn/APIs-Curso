import { Schema, model } from "mongoose";

//campos DB
const ReserveSchema = new Schema({
  data: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  house: {
    type: Schema.Types.ObjectId,
    ref: "House",
  },
});

export default model("Reserve", ReserveSchema);
