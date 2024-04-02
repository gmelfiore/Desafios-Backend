const Router = require ('express').Router;
const router = Router();
const ProductManager = require("../dao/productManager");

router.get('/', (req,res)=>{
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({});
})

router.get('/products', (req,res)=>{
    const {limit}= req.query;
    console.log(prod)
  return res.status(200).json(ProductManager.getProducts(limit));  
});

router.get ('/products/:pid', (req,res)=>{
    const {pid}= req.params;
    return res.status(200).json(ProductManager.getProductById(Number(pid)))
});

router.post('/', (req,res)=>{
    
    res.setHeader('Content-Type', 'application/json');
    return res.status(201).json(ProductManager.addProduct());
})

router.put('/:pid', (req,res)=>{
    let {pid} = req.params;
    res.setHeader('Content-Type', 'application/json');
    return res.status(201).json(ProductManager.updateProduct(pid));
})

router.delete('/:pid', (req,res)=>{
    let {pid} = req.params;
    res.setHeader('Content-Type', 'application/json');
    return res.status(201).json(ProductManager.deleteProduct(pid));
})


module.exports = router