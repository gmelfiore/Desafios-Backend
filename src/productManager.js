const fs = require('fs');

class ProductManager {
    products;
    path;
    static idProduct= 0;

    constructor() {
        this.path = './data/productos.json';
        this.products = this.leerProductos();
        
    }

    leerProductos(){
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
            fs.writeFileSync(this.path, JSON.stringify(this.products))
        }
        catch (error){
            console.log(`No es posible guardar el archivo ${error}`)
        }
    }
    addProduct(title, description, price, thumbnail, code, stock){
        if (!title || !description || !price || !thumbnail || !code || !stock)

        return 'Todos los campos son obligatorios'

        const codeRepetido= this.products.some(p => p.code == code);
        if (codeRepetido )
        return `El código ingresado ${code} esta registrado con otro producto`;

        const id = ProductManager.idProduct ++;
        const nuevoProducto = {
            id: id,
            title:title,
            description:description,
            price:price,
            thumbnail:thumbnail,
            code:code,
            stock:stock,
        }
        this.products.push (nuevoProducto);
        this.guardarArchivo();
        return 'Producto agregado exitosamente'



    }
    async getProducts(limit = 0){
        let productosGuardados = await this.leerProductos();
        limit = Number(limit);
    if (limit > 0)
        return this.products.slice (0, limit);
        
    return productosGuardados;
    }
    getProductById(id){

    const producto = this.products.find (p => p.id == id);
    if (producto)
        return producto
    else
        return `Not found`
    }

    deleteProduct(id){
        let msgError = `No existe un producto con id ${id}`
        let msg= 'Producto eliminado'
        const index = this.products.findIndex(p=> p.id === id);
        if (index !== -1){
            this.products =this.products.filter(p=> p.id !== id);
            this.guardarArchivo();
            return msg;
        }
        
        return msgError
    }
    updateProduct (id, objetoUpdate){
        let msgError = `No existe un producto con id ${id}`
        let msg = "producto actualizado"
        const index = this.products.findIndex (p=> p.id=== id);
        if (index !== -1){
            const {id, ...rest} = objetoUpdate;
            this.products[index] = {...this.products[index], ...rest};
            this.guardarArchivo();
            return msg;
        } return msgError

    }
}

   

module.exports = ProductManager;