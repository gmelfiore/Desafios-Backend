import { model, Schema } from "mongoose";

const messageCollection= "messages";

const messageSchema = new Schema({
    user: {type:String, required:true},
    message: {type: String, required:true}
});

export const messageModelo= model(messageCollection, messageSchema);