const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;

//Routes
const routeProducts = require('./routes/productosRoutes');
const routeCart= require('./routes/carritosRoutes');

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))  
// app.use(express.static('public'))

app.use('/api/productos', routeProducts);
app.use('/api/carrito', routeCart);


app.get('*', function(req, res){
    res.sendFile(__dirname+'/public/error.html');
    }
);
//Middlewarer de error 
app.use((err, req, res, next) => {
    res.status(500).send({error: err.message});
});


app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))