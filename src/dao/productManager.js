import fs from "fs";

class ProductManager {
    products;
    path;
    static idProduct= 0;

    constructor() {
        this.path = '../data/productos.json';
        this.products = this.leerProductos();
        
    }

    leerProductos(){
        try{
            if (fs.existsSync(this.path)){
							const productos = JSON.parse(fs.readFileSync(this.path, 'utf-8'));

							console.log('PRODUCTOS leerProductos: ', productos);

              return productos;
            } else {
							throw new Error('Archivo no existe')
						};
        } catch (error){
            throw new Error('No es posible leer el archivo: ', error)
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
    async addProduct({title, description, price, thumbnails=[], code, stock, status, category}){

        if (!title || !description || !price || !code || !stock || !status || !category)
        	throw new Error('Todos los campos son obligatorios')

        const codeRepetido= this.products.some(p => p.code == code);

        if (codeRepetido )
        	throw new Error(`El código ingresado ${code} esta registrado con otro producto`);

        const id = ProductManager.idProduct ++;
        const nuevoProducto = {
            id: id,
            title:title,
            description:description,
            price:price,
            thumbnails: thumbnails,
            code:code,
            stock:stock,
            status: true,
            category: category,
        }
        this.products.push (nuevoProducto);
        this.guardarArchivo();
        return 'Producto agregado exitosamente'
    }
    async getProducts(limit = 0){
        let productosGuardados = await this.leerProductos();
            console.log(productosGuardados);
        limit = Number(limit);
    if (limit > 0)
        return this.products.slice (0, limit);
        
    return productosGuardados;
    }

    async getProductById(id){
    let status= false;
    let resp = `El producto con id ${id} no existe`
    const productos = await this.leerProductos();
    const producto = productos.find (p => p.id === id);
    if (producto){
        let status= true;
        let resp = producto
        return {status, resp}
    }
        return {status, resp}
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

   

export default ProductManager 