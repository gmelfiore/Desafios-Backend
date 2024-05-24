import { Router } from "express";
import {ProductManagerMongo as ProductManager} from "../dao/productManagerMongo.js";
import { auth } from "../middleware/auth.js";
export const router = Router();

const p= new ProductManager();

router.get('/', (req, res)=>{
   res.render('home')
})

router.get('/registro', (req, res)=>{
   res.status(200).render('registro')
})

router.get('/login', (req, res)=>{
   let {error}=req.query
   res.status(200).render('login', {error})
})

router.get('/perfil', auth, (req, res)=>{
   res.status(200).render('perfil',{
      usuario:req.session.usuario
   })
})

router.get('/products',auth, async(req, res)=>{
   let {pagina} =req.query
   if(!pagina) pagina=1
   let {docs:productos, page, totalPages, hasPrevPage, hasNextPage, prevPage, nextPage}= await p.getAllPaginate(pagina)
   console.log(productos)

   res.setHeader('Content-Type','text/html')
   res.status(200).render("products", {productos, page, totalPages, hasPrevPage, hasNextPage, prevPage, nextPage, usuario:req.session.usuario})
})
  

router.get('/realtimeproducts', (req, res)=>{
   return res.render('realTimeProducts')
});

router.get('/chat', (req, res)=>{
   return res.status(200).render('chat')
});


