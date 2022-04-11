const fs = require("fs").promises;

class Contenedor{
    constructor (name_file){
        this.name_file = name_file;
    }

    async save(product){
        try{
            let data = await fs.readFile(`./files/${this.name_file}`, 'utf-8')
            let products = JSON.parse(data);
                let dataProd = {
                    title:product.title,
                    price:product.price,
                    thumbnail:product.thumbnail,
                    id: products.length+1
                }
                products.push(dataProd);
                try{
                    await fs.writeFile(`./files/${this.name_file}`,JSON.stringify(products,null,2))
                    return dataProd;
                }catch(err){
                    return{status:'success', message:'no se pudo crear'}
                }
        }catch{
            let dataProd = {
                title:product.title,
                price:product.price,
                thumbnail:product.thumbnail,
                id: 1
            }
            try{
                await fs.writeFile(`./files/${this.name_file}`, JSON.stringify([dataProd],null,2))
                return id;
            }catch(error){
                return {status:"error",message:"No se pudo crear el producto"+error }

            }
        }
    }

    async getById(id){
        try{
            let data = await fs.readFile(`./files/${this.name_file}`, "utf8");
            let products = JSON.parse(data);
            let product = products.find(v => v.id === id);
            if(product){
                return product;
            } else {
                return null;
            }
        }
        catch(err){
            throw new Error('no se pudo leer el archivo' +err.message);
        }
    }


    async getAll(){ 
        try{
            let data = await fs.readFile(`./files/${this.name_file}`, "utf8");
            let products = JSON.parse(data);
            if(products){
                return products;
            } else {
                return null;
            }
        }
        catch(err){
            throw new Error('no se pudo leer el archivo' +err.message);
        }
    }
    
    async deleteById(id){
        try{
            let data = await fs.readFile(`./files/${this.name_file}`, "utf8");
            let products = JSON.parse(data);
            let prod = products.filter(product => product.id === id);
            if(products.some(product => product.id === id)){
                let product = products.filter(product => product.id !== id);
                try{
                    await fs.writeFile(`./files/${this.name_file}`,JSON.stringify(product,null,2));
                    return {status:'success', message:'producto borrado exitosamente',prod}
                }catch(err){
                    return{status:'success', message:'no se pudo eliminar el producto'}
                }
            } else {
                return('No hay productos con esa ID');
            }
        }
        catch(err){
            throw new Error('no se pudo leer el archivo' +err.message);
        }
    }

    async deleteAll(){
        try{
            let product = [];
            let jsonString = JSON.stringify(product);
            await fs.writeFile(`./files/${this.name_file}`, jsonString);
            return {status:'success', message:'productos borrados exitosamente'}
        }
        catch(err){
            throw new Error('no se pudo borrar el archivo' +err.message);
        }
    }

    async updateProduct(id,newObj){
        try{
            let data = await fs.readFile(`./files/${this.name_file}`, "utf8");
            let products = JSON.parse(data);
            const productIndex = products.findIndex(product => product.id == id);
            if(productIndex === -1) return {status:"error", message:"No hay productos con el id especificado " + id}
            else { 
                console.log(newObj);
                newObj.id = Number(id);
                products[productIndex] = newObj;
            };
            try{
                await fs.writeFile(`./files/${this.name_file}`,JSON.stringify(products,null,2));
                return {status:"success", message:"Producto actualizado"}
            }catch{
                return {status:"error", message:"Error al actualizar producto"}
            }
        }catch(error){
            return {status:"error",message:"Fallo al actualizar producto: "+error}
        }
    }
}

module.exports = Contenedor;

