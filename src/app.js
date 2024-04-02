const express= require ("express")
const productsRouter = require ("./routes/products.router")
const PORT= 3000;

const app = express();


app.use (express.json());
app.use (express.urlencoded({extended:true}));
app.use ('/api/products', productsRouter);

app.get('/', (req,res)=>{
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send('OK');
})


app.listen(PORT, ()=>{
    console.log (`Servidor escuchando en el puerto ${PORT}`)
});
