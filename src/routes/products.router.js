import { Router } from "express";
import ProductManager from "../dao/productManager.js";

const router = Router();
const manager = new ProductManager();

router.get('/', (req,res)=>{
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({});
})

router.get('/products', async (req,res)=>{

	try {
    const {limit}= req.query;

		const products = await manager.getProducts(limit);

		console.log(products);

  	return res.status(200).json(products);
	} catch (error) {
		return res.status(500).json({ Message: error.message });
	}

});

router.get ('/products/:pid', async (req,res)=> {

	try {
    const {pid}= req.params;

		const product = await manager.getProductById(Number(pid));

    return res.status(200).json(product)
		
	} catch(error) {
		return res.status(500).json({ Message: error.message });
	}
});

router.post('/', async (req,res)=>{

	try {
		const productSaved = await manager.addProduct({...req.body});

		return res.status(201).json({ message: productSaved });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
})


router.put('/:pid', (req,res)=>{
    let {pid} = req.params;
    return res.status(201).json(manager.updateProduct(pid));
})

router.delete('/:pid', async (req,res)=>{
    let {pid} = req.params;

		const result = await manager.deleteProduct(pid)

    return res.status(201).json(result);
})


export default router;