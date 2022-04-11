const express =  require('express')
const myRoutes = express.Router()

//02Renderizamos Index
myRoutes.get('/', (req, res) => {
          res.render('index');
    })


module.exports = myRoutes