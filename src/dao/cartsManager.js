import fs from "fs";
import ProductManager from "./productManager.js";


class CartsManager {
    carts;
    path;
    static idCart= 0;

    constructor() {
        this.path = '../data/carts.json';
        this.products = this.leerCarts();
        
    }

    leerCarts(){
        try{
            if (fs.existsSync(this.path)){
                return JSON.parse(fs.readFileSync(this.path, 'utf-8'));  
            }; 
        } catch (error){ 
            console.log (`Ocurrió un problema ${error}`)
        }
    }

    guardarArchivo(){
        try{
            fs.writeFileSync(this.path, JSON.stringify(this.carts))
        }
        catch (error){
            console.log(`No es posible guardar el archivo ${error}`)
        }
    }
    
    async getCartById(id){
    const carritos = await this.leerCarts();
    const carrito = carritos.find (p => p.id === id);
        return carrito
   }
    
   createNewCart(){
    const id= CartsManager.idCart ++;
    const newCart={
        id: id,
        products: [],
    }
     this.carts.push(newCart);
     this.guardarArchivo();
     return newCart;
   }

   addProductsInCart(cid, pid){
    let noExiste= `El carrito con id ${cid} no existe`;
    const indexCart= this.carts.findIndex(c=> c.id === cid);
    if(indexCart !== -1){
        const indexProdInCart =this.carts[indexCart].products.findIndex(p=> p.id=== pid);
        const p = new ProductManager();
        const producto =p.getProductById(pid);

        if (producto.status && indexProdInCart === -1){
            this.carts[indexCart].products.push({id: pid, 'quantity':1})
            this.guardarArchivo()
            respuesta = "producto agregado al carrito";
        } else if (producto.status && indexProdInCart !== -1){
            ++ this.carts[indexCart].products[indexProdInCart].quantity;
            this.guardarArchivo();
            respuesta = "producto agregado al carrito";
        } else{
            respuesta=`El producto con id ${pid} no existe`
        }
    }
    return noExiste;
}
    }

   


   

export default CartsManager;