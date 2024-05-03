import { Router } from 'express';
import {CartsManagerMongo as CartsManager} from "../dao/cartsManagerMongo.js"
const router = Router();

const CartManager= new CartsManager()
router.get('/', (req,res)=>{
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json();
})

router.get('/:cid', (req,res)=>{
    const {cid}= req.params;
  return res.status(200).json(CartManager.getCartById(Number(cid)));  
});


router.post('/', (req,res)=>{ 
    res.setHeader('Content-Type', 'application/json');
    return res.status(201).json(CartManager.createNewCart());
})

router.post('/:cid/products/:pid', (req,res)=>{ 
    res.setHeader('Content-Type', 'application/json');
    const {cid, pid}= req.params;
    return res.status(201).json(CartManager.addProductsInCart(Number(cid, pid)));
})

export default router;