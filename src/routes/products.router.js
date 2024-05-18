import { Router } from "express";
import {ProductManagerMongo as ProductManager } from '../dao/productManagerMongo.js'
import { isValidObjectId } from "mongoose";



const router = Router();
const manager = new ProductManager();


router.get('/products', async (req,res)=>{

	try {
    let products= await manager.getProducts()
	res.status(200).json({
		products
	})
	} catch (error) {
		return res.status(500).json({ Message: error.message });
	}

});

router.get ('/products/:id', async (req,res)=> {
	const {id}= req.params;
	if (!isValidObjectId(id)){
		res.status(400).json ({error: `Ingrese un id válido`})
	}
	try {
		const product = await manager.getProductsBy({_id:id});

    return res.status(200).json({product})
		
	} catch(error) {
		return res.status(500).json({ Message: error.message });
	}
});

router.post('/', async (req,res)=>{
	let {id, title, description, price, thumbnails, code, stock, category}= req.body
	if (!id || !title || !description || !price || !code || !stock || !category){
		return res.status(400).json({error: 'Todos los campos son obligatorios'})
	}
	
	let existe
	try{
		existe= await ProductManager.getProductsBy({code})
	} catch (error){
		return res.status(500).json({error: "Ocurrio un error"})
	}
	if (existe){
		return res.status(400).json({error:`El producto con el código ${code} ya existe`})
	}

	try {
		let nuevoProducto = await ProductManager.addProduct({id, title, description, price, thumbnails, code, stock, category})
		return res.status(201).json({nuevoProducto})
	} catch (error) {
		return res.status(500).json({error: "Ocurrio un error"})
	}
})


router.put('/:id', async (req,res)=>{
    const {id}= req.params;
	if (!isValidObjectId(id)){
		res.status(400).json ({error: `Ingrese un id válido`})
	}
	let cambio= req.body
	if (cambio._id){
		delete cambio._id
	}

	try {
		const productmodificado = await manager.updateProduct(id, cambio);
    	return res.status(200).json({productmodificado})
		
	} catch(error) {
		return res.status(500).json({ Message: error.message });
	}
})

router.delete('/:id', async (req,res)=>{
    let {id} = req.params;
	if (!isValidObjectId(id)){
		res.status(400).json ({error: `Ingrese un id válido`})
	}
	try {
		let resultado = manager.deleteProduct(id)
		if (resultado.deletedCount>0){
			return res.status(200).json({payload:`Producto con id ${id} eliminado`})
		}else{
			return res.status(404).json({error: `No existe un producto con id ${id}`})
		}
	} catch (error) {
		return res.status(500).json({ Message: error.message });
	}
	

})


export default router;