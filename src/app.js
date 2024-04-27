import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import views from "./routes/views.js";
import {Server} from "socket.io";
import {engine} from "express-handlebars";
import ProductManager from "./dao/productManager.js";
const PORT= 3000;

const app = express();

const p= new ProductManager();
app.use (express.json());
app.use (express.urlencoded({extended:true}));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use ('/', views);
app.use ('/api/products', productsRouter);
app.use('/api/carts', cartsRouter)

app.get('/', (req,res)=>{
    res.setHeader('Content-Type', 'text/plain');
    return res.render('home');
})


const expressServer= app.listen(PORT, ()=>{
    console.log (`Servidor escuchando en el puerto ${PORT}`)
});

const socketServer= new Server (expressServer);

socketServer.on('conected', socket=>{
    const productos = p.getProducts();
    socket.emit ('productos', productos);

    socket.on('agregar producto', producto=>{
        const result = p.addProduct({...producto});
    })
})