import mongoose from "mongoose";

const productsCollection = "productos";
const productsEsquema = new mongoose.Schema(
            {
                id: Number,
                title:{type: String, require: true},
                description: String,
                price: Number,
                thumbnails: String,
                code: {type: String, unique :true},
                stock: Number,
                category: String,
                status: Boolean,
            },
            {
                timestamps: true
            }
)

export const productsModelo = mongoose.model(
    productsCollection,
    productsEsquema
)