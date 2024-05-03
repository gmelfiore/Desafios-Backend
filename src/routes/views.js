import { Router } from "express";
import {ProductManagerMongo as ProductManager} from "../dao/productManagerMongo.js";

const router = Router();

router.get('/', (req, res)=>{
    const p= new ProductManager();
    const productos = p.getProducts();
   return res.render('home', {productos})
});

router.get('/realtimeproducts', (req, res)=>{
   return res.render('realTimeProducts')
});


export default router;