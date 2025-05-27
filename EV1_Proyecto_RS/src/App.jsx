import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import ProductCard from "./components/ProductCard"; 

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchProducts();
  }, []); 

  return (
    <div className="min-h-screen bg-green-50 p-6">
      {/* Título principal */}
      <h1 className="text-3xl text-gray-800 font-bold text-center mb-8">
        PROYECTO DE VENTAS DE PRODUCTOS
      </h1>

      {/* Mensaje de carga (si loading es true) */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-green-700 animate-pulse">Cargando productos...</p>
        </div>
      ) : (
        <div className="mt-6">
          <h2 className="text-2xl text-green-700 font-semibold mb-4 text-left">
            Listado de Productos disponibles:
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}

      {/* Texto adicional */}
      <p className="text-center text-gray-400 mt-10 text-sm">
       Proyecto RS Moreno TSDCIA 
      </p>
    </div>
  );
}

export default App;