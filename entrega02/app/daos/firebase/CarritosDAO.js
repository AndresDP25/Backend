const ContenedorFirebase = require('../../contenedor/ContenedorFirebase')

class CarritosDAO extends ContenedorFirebase{
    constructor(){
        super()
    }

    async agregarCarrito(){
        const data = {
            fecha: Date().toString()
        }
        const carrito = await this.dbf.collection('carritos').add(data)
        return carrito
    }

    async traerCarritos(){
        let docs = await super.listar('carritos')
        const res = docs.map(doc => ({
            id: doc.id,
            fecha: doc.data().fecha,
            productos: doc.data().productos
        }))
        return res
    }

    async agregarProductoACarrito(idProducto, idCarrito){
        const producto = await super.mostrarElemento('productos', idProducto)
        //const messageRef = db.collection('rooms').doc('roomA').collection('messages').doc('message1');
        const carrito = await this.dbf.collection('carritos').doc(idCarrito).collection('productos').doc(idProducto).set(producto)
        return carrito
    }

    async eliminarProductoCarrito(idCarrito, idProducto){
        const carrito = await this.dbf.collection('carritos').doc(idCarrito).collection('productos').doc(idProducto).delete()
        return carrito
    }


    async eliminarCarrito(id){
        const carrito = await super.eliminar('carritos', id)
        return carrito
    }

}

module.exports = new CarritosDAO()