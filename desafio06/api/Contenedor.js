class Contenedor{
    constructor (){
        this.products = [];
    }

    save(product){
        try{
            let dataProd = {
                title:product.title,
                price:product.price,
                url:product.url,
                id: this.products.length+1
            }
            this.products.push(dataProd);
            return dataProd;
        }catch(err){
            throw new Error(`Se produjo un error al guardar el nuevo producto: ${err.message}`)
        }
    }

    getById(id){
        try{
            return this.products.find(v => v.id === id);
        }
        catch(err){
            throw new Error('no se encontró el id');
        }
    }

    getAll(){ 
        try{
            return this.products;
        }
        catch(err){
            throw new Error(`Se produjo un error: ${error.message}`);
        }
    }
    
    deleteById(id){
        try {
            this.products = this.products.filter(prod => prod.id != idProduct)
        } catch(error){
            throw new Error(`Ocurrió un error al eliminar: ${error.message}`)
        }
    }

    deleteAll(){
        try{
             this.products = [];
        }
        catch(err){
            throw new Error('no se pudo borrar el archivo' +err.message);
        }
    }

    updateProduct(id,newObj){
        try{
            const productIndex = this.products.findIndex(product => product.id == id);
            if(productIndex === -1) return {status:"error", message:"No hay productos con el id especificado " + id}
            else { 
                newObj.id = Number(id);
                this.products[productIndex] = newObj;
                return newObj;
            };
        }catch(error){
            throw new Error(`Ocurrió un error al actualizar: ${error.message}`)
        }
    }
}

module.exports = Contenedor;

