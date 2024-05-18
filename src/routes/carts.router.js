import { Router } from 'express';
import {CartsManagerMongo as CartsManager} from "../dao/cartsManagerMongo.js"
import { isValidObjectId } from 'mongoose';
const router = Router();

const CartManager= new CartsManager()


router.get('/carts', async (req,res)=>{
   try{
        let carritos= await CartManager.getCarts();
        res.status(200).json({
            carritos
        })
   }catch(error){
    return res.status(500).json({ Message: error.message });
   }
})

router.get('/:cid', async (req,res)=>{
    const {cid}= req.params;
    if (!isValidObjectId(cid)){
		res.status(400).json ({error: `Ingrese un id válido`})
	}
	try {
		const cart = await CartManager.getCartBy({_id:cid});

    return res.status(200).json({cart})
		
	} catch(error) {
		return res.status(500).json({ Message: error.message });
	}
  
})


router.post('/', async (req,res)=>{ 
    let {id, products:[]}= req.body
    if (!id || !products){
		return res.status(400).json({error: 'Todos los campos son obligatorios'})
	}
    try{
        const newCart = await CartManager.createNewCart({id, products});
        return res.status(201).json({newCart})
    }catch (error) {
		return res.status(500).json({error: "Ocurrio un error"})
	}
})

router.post('/:cid/products/:pid', (req,res)=>{ 
    res.setHeader('Content-Type', 'application/json');
    const {cid, pid}= req.params;
    return res.status(201).json(CartManager.addProductsInCart(Number(cid, pid)));
})

export default router;