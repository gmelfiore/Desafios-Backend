
import { productsModelo } from "./models/productsModelo.js";


export class ProductManagerMongo {
    
async addProduct(product){
    return await productsModelo.create(product)
}

async getProducts(){
    return await productsModelo.find().lean();
}

async getAllPaginate(page=1){
    return await productsModelo.paginate({},{limit:10, page, lean:true})
}

async getProductsBy(filtro){
    return await productsModelo.findOne(filtro)
}

async updateProduct(id, producto){
    return await productsModelo.findByIdAndUpdate(id, producto, {runValidators:true, returnDocument:"after"})
}

async deleteProduct(id){
    return await productsModelo.deleteOne({_id:id})
}

}

