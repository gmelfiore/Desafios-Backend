import { productsService } from "../services/products.service.js";
import { isValidObjectId } from "mongoose";

async function getProducts(req, res){
    try {
        let products= await productsService.getProducts()
        return res.status(200).json({
            products
        })
        } catch (error) {
            return res.status(500).json({ Message: error.message });
        }
}

async function getProductsById(req, res){
    const {id}= req.params;
	if (!isValidObjectId(id)){
		res.status(400).json ({error: `Ingrese un id válido`})
	}
	try {
		const product = await productsService.getProductsById();

    return res.status(200).json({product})
		
	} catch(error) {
		return res.status(500).json({ Message: error.message });
	}
}

async function addProduct(){
    let {id, title, description, price, thumbnails, code, stock, category}= req.body
	if (!id || !title || !description || !price || !code || !stock || !category){
		return res.status(400).json({error: 'Todos los campos son obligatorios'})
	}
	
	let existe
	try{
		existe= await productsService.getProductsByCode()
	} catch (error){
		return res.status(500).json({error: "Ocurrió un error"})
	}
	if (existe){
		return res.status(400).json({error:`El producto con el código ${code} ya existe`})
	}

	try {
		let nuevoProducto = await productsService.addProduct({id, title, description, price, thumbnails, code, stock, category})
		return res.status(201).json({nuevoProducto})
	} catch (error) {
		return res.status(500).json({error: "Ocurrió un error"})
	}
}

async function updateProduct(){
    const {id}= req.params;
	if (!isValidObjectId(id)){
		res.status(400).json ({error: `Ingrese un id válido`})
	}
	let cambio= req.body
	if (cambio._id){
		delete cambio._id
	}

	try {
		const productmodificado = await productsService.updateProduct();
    	return res.status(200).json({productmodificado})
		
	} catch(error) {
		return res.status(500).json({ Message: error.message });
	}
}

async function deleteProduct(){
    let {id} = req.params;
	if (!isValidObjectId(id)){
		res.status(400).json ({error: `Ingrese un id válido`})
	}
	try {
		let resultado = productsService.deleteProduct()
		if (resultado.deletedCount>0){
			return res.status(200).json({payload:`Producto con id ${id} eliminado`})
		}else{
			return res.status(404).json({error: `No existe un producto con id ${id}`})
		}
	} catch (error) {
		return res.status(500).json({ Message: error.message });
	}
}

export default {getProducts, getProductsById, deleteProduct, updateProduct, addProduct}