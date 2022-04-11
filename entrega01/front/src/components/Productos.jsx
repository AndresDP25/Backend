import React from 'react'

const Productos = ({ productos }) => {
  return (
    <div className="row">
      {productos.map((producto, index) => (
        <div key={index} className="col mb-4">      
            <div className="card" style={{minWidth: '200px', maxWidth: '550px' }}>
              <img src={producto.thumbnail} alt="" />
              <div className='card-body'>
                <h5 className='card-title'>{producto.title}</h5>
                <hr />
                <p>price:{producto.price}</p>
                <p>id:{producto.id}</p>
                {/* <Link to={`/detalle/${character.id}`}>
                  <button>Detalle</button>
                </Link> */}
              </div>
            </div>
        </div>
      ))}
    </div>
  )
}

export default Productos