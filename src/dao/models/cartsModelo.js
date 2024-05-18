import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const cartsCollection = "carts";
const cartsEsquema = new mongoose.Schema({
    products:[
        {
            id: {
                type: Schema.Types.ObjectId,
                ref: 'productos'
            },
            quantity:{
                type: Number,
                required: true
            }
        }
    ]
}
            
)

export const cartsModelo = mongoose.model(
    cartsCollection,
    cartsEsquema
)