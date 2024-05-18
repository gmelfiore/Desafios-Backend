import { Router } from "express";
import {ProductManagerMongo as ProductManager} from "../dao/productManagerMongo.js";

export const router = Router();

router.get('/', (req, res)=>{
    const p= new ProductManager();
    const productos = p.getProducts();
   return res.render('home', {productos, title: "Home"})
});

router.get('/realtimeproducts', (req, res)=>{
   return res.render('realTimeProducts')
});

router.get('/chat', (req, res)=>{
   return res.status(200).render('chat')
});

