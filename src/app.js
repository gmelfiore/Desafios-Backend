import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import {router as views} from "./routes/views.js";
import {Server} from "socket.io";
import {engine} from "express-handlebars";
import {ProductManagerMongo as ProductManager} from "./dao/productManagerMongo.js";
import mongoose from "mongoose";
import path from "path";
import __dirname from "./utils.js";
import { messageModelo } from "./dao/models/messagesModelo.js";
const PORT= 3000;

const app = express();

const p= new ProductManager();

app.use (express.json());
app.use (express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, '/public')))

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname,'./views'));



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

let usuarios=[];
let mensajes =[];

socketServer.on('connection', socket=>{
    console.log(`Se ha conectado un cliente con id ${socket.id}`)

    socket.on("id", nombre=>{
        usuarios.push({id: socket.id, nombre})
        socket.broadcast.emit("nuevoUsuario", nombre)
    })
    socket.on("mensaje", async (nombre, mensaje)=>{
        const newMessage= await messageModelo.create({user:nombre, message: mensaje});
        
            socketServer.emit("nuevoMensaje", newMessage)
        
        
        
    })
    
    socket.on("disconnect", ()=>{
        let usuario=usuarios.find(u=>u.id===socket.id)
        if(usuario){
            socketServer.emit("saleUsuario", usuario.nombre)
        }
    })
})

const connDB = async()=>{
    try{
        await mongoose.connect(
            "mongodb+srv://gmelfiore21:Jv7Lqy1BfMT3BgxL@cluster0.uabdr0h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
            {
                dbName:"ecommerce"
            }
        )
        console.log("DB online")
    } catch(error){
        console.log("Error al conectar a DB", error.message)
    }
}

connDB()