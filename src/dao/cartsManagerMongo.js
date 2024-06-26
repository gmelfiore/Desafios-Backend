import {cartsModelo} from "./models/cartsModelo.js"
import {ticketModelo} from "./models/ticketModelo.js"

export class CartsManagerMongo{

    async getCartBy(filtro){
        return await cartsModelo.findOne(filtro)

    }

    async getCarts(){
        return await cartsModelo.find()
    }
  
    async createNewCart(carrito){
        return await cartsModelo.create(carrito)
    }

    async addProductsInCart(pid, cid){
        try{
            const carrito= await cartsModelo.findById(cid);

            if(!carrito)
                return res.status(404).json({msg: `El carrito con id ${cid} no existe`})

                const productoInCart = carrito.products.find(p => p.id.toString()===pid);
            
            if (productoInCart)
            productoInCart.quantity++;
            else 
            carrito.products.push({id: pid, quantity:1})

            carrito.save();

            return res.json({msg: "Carrito actualizado", carrito})

        }catch (error){
            return res.status(500).json({ msg: "hablar con el administrador"})
        }
    }

    async finalizarCompra(ticket){
        return await ticketModelo.create(ticket)
    }
}

 


   


   
