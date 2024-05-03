
import { productsModelo } from "./models/productsModelo.js";

export class ProductManagerMongo {
    
async addProduct(product){
    return await productsModelo.create(product)
}

async getProducts(){
    return await productsModelo.find();
}

async getProductsBy(filtro){
    return await productsModelo.findOne(filtro)
}

async updateProduct(id, producto){
    return await productsModelo.findByIdAndUpdate(id, usuario, {runValidators:true, returnDocument:"after"})
}

async deleteProduct(id){
    return await productsModelo.deleteOne({_id:id})
}

}

