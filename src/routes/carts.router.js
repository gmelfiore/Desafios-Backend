const Router = require ('express').Router;
const CartsManager= require('../dao/cartsManager.js');
const router = Router();


router.get('/', (req,res)=>{
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json();
})

router.get('/:cid', (req,res)=>{
    const {cid}= req.params;
  return res.status(200).json(CartsManager.getCartById(Number(cid)));  
});


router.post('/', (req,res)=>{ 
    res.setHeader('Content-Type', 'application/json');
    return res.status(201).json(CartsManager.createNewCart());
})

router.post('/:cid/products/:pid', (req,res)=>{ 
    res.setHeader('Content-Type', 'application/json');
    const {cid, pid}= req.params;
    return res.status(201).json(CartsManager.addProductsInCart(Number(cid, pid)));
})

module.exports = router