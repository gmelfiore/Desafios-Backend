import {cartsService} from  "../services/carts.service.js"
import { isValidObjectId } from "mongoose";

async function getCarts(req, res){
    try{
        let carritos= await cartsService.getCarts();
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
		const cart = await cartsService.getCartById();

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
        const newCart = await cartsService.createCart()
    
        return res.status(201).json({newCart})
    }catch (error) {
		return res.status(500).json({error: "Ocurrio un error"})
	}
}

async function addProductsInCart(req, res){
    res.setHeader('Content-Type', 'application/json');
    const {cid, pid}= req.params;
    return res.status(201).json(cartsService.addProductsInCart())
}

async function finalizarCompra(req, res){
    try {
        const {cid} = req.params;
        if (!isValidObjectId(cid)){
            res.status(400).json ({error: `Carrito no encontrado`})
        }
        const productsNotPurchased = [];
        const productsPurchased = [];

        for (const product of cart.products) {
            const quantityInCart = product.quantity;

            if (product.stock < quantityInCart) {
                productsNotPurchased.push(product._id);
            } else {
                product.stock -= quantityInCart;
                await product.save();
                productsPurchased.push({ 
                    productId: product._id, 
                    productName: product.name, 
                    quantityPurchased: quantityInCart 
                });
            }
        }

        const ticket = TicketsService.generateTicket(req.user, productsPurchased);

        if (productsNotPurchased.length > 0) {
            // Actualizar el carrito para contener solo los productos no comprados
            cart.products = cart.products.filter(item => productsNotPurchased.includes(item.product));
            await cart.save();
            return res.status(400).json({ message: "Algunos productos no pudieron comprarse", productsNotPurchased });
        }

        return res.status(200).json({ message: "Compra realizada con éxito", ticket });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en el servidor" });
    }
}

export default {getCarts, getCartById, createCart, addProductsInCart, finalizarCompra}