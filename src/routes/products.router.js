import { Router } from "express";
import ProductManager from "../dao/productManager.js";

const router = Router();
const manager = new ProductManager(filePath);

router.get('/', (req,res)=>{
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({});
})

router.get('/products', (req,res)=>{
    const {limit}= req.query;
    console.log(prod)
  return res.status(200).json(manager.getProductById(limit));  
});

router.get ('/products/:pid', (req,res)=>{
    const {pid}= req.params;
    return res.status(200).json(manager.getProductById(Number(pid)))
});

router.post('/', (req,res)=>{
    
    res.setHeader('Content-Type', 'application/json');
    return res.status(201).json(manager.addProduct({...req.body}));
})

router.put('/:pid', (req,res)=>{
    let {pid} = req.params;
    res.setHeader('Content-Type', 'application/json');
    return res.status(201).json(manager.updateProduct(pid));
})

router.delete('/:pid', (req,res)=>{
    let {pid} = req.params;
    res.setHeader('Content-Type', 'application/json');
    return res.status(201).json(manager.deleteProduct(pid));
})


export default router;