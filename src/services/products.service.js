import { ProductManagerMongo as DAO } from "../dao/productManagerMongo.js";

class ProductsService{
    constructor (dao){
        this.dao= new dao()
    }

    async getProducts(){
        return await this.dao.getProducts()
    }

    async getProductsById(){
        return await this.dao.getProductsBy({_id:id})
    }

    async getProductsByCode(){
        return await this.dao.getProductsBy({code})
    }

    async getAllPaginate(){
        return await this.dao.getAllPaginate()
    }

    async addProduct(product){
        return await this.dao.addProduct({product})
    }

    async updateProduct(id, cambio){
        return await this.dao.updateProduct({id, cambio})
    }

    async deleteProduct(id){
        return await this.dao.deleteProduct({id})
    }
}

export const productsService= new ProductsService(DAO)