import {mongoose, Schema} from "mongoose";


const ticketsCollection = "tickets"
const ticketEsquema = new mongoose.Schema({
    code: { type: String, unique: true, required: true },
    purchase_datetime: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
    purcharser: {
        type: Schema.Types.ObjectId,
        ref: 'usuarios'
    }, 
})

export const ticketModelo = mongoose.model(
    ticketsCollection,
    ticketEsquema
)
