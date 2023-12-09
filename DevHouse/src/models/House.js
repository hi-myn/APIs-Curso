import { Schema, model } from "mongoose";

const HouseSchema = new Schema(
  {
    thumbnail: String,
    description: String,
    price: Number,
    location: String,
    status: Boolean,
    user: {
      type: Schema.Types.ObjectId, //id user
      ref: "User", //ref to User Model
    },
  },
  {
    toJSON: {
      virtuals: true, //add virtual to req
    },
  }
);

//creating image for search only
HouseSchema.virtual("thumbnail_url").get(function () {
  return `http://localhost:3333/files/${this.thumbnail}`;
});

export default model("House", HouseSchema);
