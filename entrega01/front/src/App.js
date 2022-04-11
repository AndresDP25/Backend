import { useEffect, useState } from "react";
import Productos from "./components/Productos";

function App() {
  const [productos, setProductos] = useState([]);
  const initialUrl = 'http://localhost:8080/api/productos';

  const fetchCharacters = async (url) => {

    try {
      //cuando espereamos un retorno tenemos q usar await o then?
      const response = await fetch(url);
      const data = await response.json();
      setProductos(data)
    } catch (error) {
      console.log(error);
    }
  };
  
  
  console.log(productos);
  useEffect(() => {
    fetchCharacters(initialUrl);
    
  }, []);
  
  return (
    <div className="App">
      
      <Productos productos={productos} />
    </div>
  );
}

export default App;
