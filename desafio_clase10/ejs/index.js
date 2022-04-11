const express = require('express');
const routerProducts = express.Router();

const Contenedor = require ('./clases/Contenedor');
// const upload = require('./services/uploader');
const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// app.use(express.static('public'));
app.use('/static', express.static(__dirname + '/public'))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/products', routerProducts);

const contenedor1 = new Contenedor('productos.txt');

app.get('/', (req, res) => {
	res.render('form', { title: 'Formulario' });
});

routerProducts.get('/', async (req, resp) => {
        let products = await contenedor1.getAll();
        resp.render('list', { title: 'Productos', products });
    });

routerProducts.get('/:pid', async (req, res) => {
    let id = parseInt(req.params.pid);
    let product = await contenedor1.getById(id)
        if(product !== null){
            res.json(product);
        } else{
            res.json({ error : 'producto no encontrado' })
        }
});

routerProducts.post ('/', async (req, res) => {
    let product = req.body;
    const dataprod = await contenedor1.save(product);
    res.redirect('/');
});

routerProducts.put('/:pid', async(req,res) => {
    let body = req.body;
    let id = parseInt(req.params.pid)
    const dataProd = await contenedor1.updateProduct(id,body);
    res.json(dataProd);
});

routerProducts.delete('/:pid', async(req,res) => {
    let id = parseInt(req.params.pid)
    const product = await contenedor1.deleteById(id);
    res.json(product);
});


const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on('error', error => console.log(`Error en servidor ${error}`));