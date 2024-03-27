const express= require ("express")
const ProductManager=require ("./productManager")

const app = express();
const PORT= 3000;


app.get('/products', (req,res)=>{
    const {limit}= req.query;
    const prod = new ProductManager();
    console.log(prod)
  return res.json({productos:prod.getProducts(limit)});  
});

app.get ('/products/:pid', (req,res)=>{
    const {pid}= req.params;
    const prod = new ProductManager();
    return res.json({productoid: prod.getProductById(Number(pid))})
});

app.listen(PORT, ()=>{
    console.log (`Servidor escuchando en el puerto ${PORT}`)
});
