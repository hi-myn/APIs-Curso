import {Schema, model} from "mongoose";

//campos DB 
const UserSchema = new Schema({
    email: String,
});

export default model('User', UserSchema);


