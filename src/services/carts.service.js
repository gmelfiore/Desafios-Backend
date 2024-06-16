import { CartsManagerMongo as DAO } from "../dao/cartsManagerMongo";

class CartsService{
    constructor (dao){
        this.dao= new dao()
    }

    async getCarts(){
        return await this.dao.getCarts()
    }

    async getCartById(){
        return await this.dao.getCartBy({_id:id})
    }

    async createCart(carrito){
        return await this.dao.createNewCart({carrito})
    }

    async addProductsInCart(pid, cid){
        return await this.dao.addProductsInCart(Number({pid, cid}))
    }

}

export const CartsService= new CartsService(DAO)