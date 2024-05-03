import mongoose from "mongoose";

const cartsCollection = "carts";
const cartsEsquema = new mongoose.Schema(
            {
                id: Number,
                products: String,
                cantidad: Number,
            },
            {
                timestamps: true
            }
)

export const cartsModelo = mongoose.model(
    cartsCollection,
    cartsEsquema
)