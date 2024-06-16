import {CartsService} from  "../services/carts.service.js"
import { isValidObjectId } from "mongoose";

async function getCarts(req, res){
    try{
        let carritos= await CartsService.getCarts();
        res.status(200).json({
            carritos
        })
   }catch(error){
    return res.status(500).json({ Message: error.message });
   }
}

async function getCartById(req, res){
    const {cid}= req.params;
    if (!isValidObjectId(cid)){
		res.status(400).json ({error: `Ingrese un id válido`})
	}
	try {
		const cart = await CartsService.getCartById();

    return res.status(200).json({cart})
		
	} catch(error) {
		return res.status(500).json({ Message: error.message });
	}
  
}

async function createCart(req, res){
    let {id, products:[]}= req.body
    if (!id || !products){
		return res.status(400).json({error: 'Todos los campos son obligatorios'})
	}
    try{
        const newCart = await CartsService.createCart()
    
        return res.status(201).json({newCart})
    }catch (error) {
		return res.status(500).json({error: "Ocurrio un error"})
	}
}

async function addProductsInCart(req, res){
    res.setHeader('Content-Type', 'application/json');
    const {cid, pid}= req.params;
    return res.status(201).json(CartsService.addProductsInCart())
}

export default {getCarts, getCartById, createCart, addProductsInCart}