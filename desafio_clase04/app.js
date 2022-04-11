const Contenedor = require ('./clases/Contenedor');

const contenedor = new Contenedor('producto.txt');

contenedor.save({
    title: 'calcul', 
    price: 123.45,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'
}).then(result=>{
    console.log(result);
})

// contenedor.deleteById(2);
// contenedor.deleteAll().then(result=>{        
//     console.log(result);
// });
// contenedor.getById(1).then(result=>{
    //     console.log(result);
    // })

