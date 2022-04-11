const express = require('express');
const { Router } = express;

const Contenedor = require ('./clases/Contenedor');
// const upload = require('./services/uploader');
const routerProducts = Router();
const app = express();

// app.use(express.static('public'));
app.use('/static', express.static(__dirname + '/public'))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/products', routerProducts);

const contenedor1 = new Contenedor('productos.txt');

routerProducts.get('/', async (req, resp) => {
        let products = await contenedor1.getAll();
        resp.send(products);
    });

routerProducts.get('/:pid', async (req, res) => {
    let id = parseInt(req.params.pid);
    let product = await contenedor1.getById(id)
        if(product !== null){
            res.send(product);
        } else{
            res.send({ error : 'producto no encontrado' })
        }
});

routerProducts.post ('/', async (req, res) => {
    let product = req.body;
    const dataprod = await contenedor1.save(product);
    res.send(dataprod);
});

routerProducts.put('/:pid', async(req,res) => {
    let body = req.body;
    let id = parseInt(req.params.pid)
    const dataProd = await contenedor1.updateProduct(id,body);
    res.send(dataProd);
});

routerProducts.delete('/:pid', async(req,res) => {
    let id = parseInt(req.params.pid)
    const product = await contenedor1.deleteById(id);
    res.send(product);
});


const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on('error', error => console.log(`Error en servidor ${error}`));



