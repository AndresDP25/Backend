const express =  require('express')
const errorRoutes = express.Router()
 
const responseError = (req, res) => {
    res.send({ error : -2, descripcion: `ruta ${req.originalUrl} metodo ${req.method} no implementada` })
}
 
errorRoutes
    .get('*', responseError)
    .post('*', responseError)
    .delete('*', responseError)
    .put('*', responseError)
 
module.exports = errorRoutes