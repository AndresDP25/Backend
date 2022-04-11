//Midleware de multer
const auth = rol => {
   
    return (req, res ,next) => {
 
        if (rol) {
            next()
        } else {
            res.status(403).json({
                error: -1 ,
                descripcion: `Ruta: ${req.baseurl}`
            })
        }
    }
}

module.exports = auth;