import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import ProductList from "./components/ProductList"; 
import StatsPanel from "./components/StatsPanel";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); 
   const [search, setSearch] = useState("");
   const [show, setShow] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products?limit=60");
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchProducts();
  }, []); 

    const filteredProducts = products.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));
    const totalProducts = filteredProducts.length;
    const maxProductObj = filteredProducts.reduce((max, p) => (p.price > max.price ? p : max), filteredProducts[0]);
    const minProductObj = filteredProducts.reduce((min, p) => (p.price < min.price ? p : min), filteredProducts[0]);
    const mayor20 = filteredProducts.filter((p) => p.title.length > 20).length;
    const totalPrice = filteredProducts.reduce((sum, p) => sum + p.price, 0).toFixed(2);
    const promedioDescuento = filteredProducts.length > 0
  ? (filteredProducts.reduce((sum, p) => sum + p.discountPercentage, 0) / filteredProducts.length).toFixed(2)
  : 0;
  const maxRatingObj = filteredProducts.reduce((max, p) => (p.rating > max.rating ? p : max), filteredProducts[0]);

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      {/* Título principal */}
      <h1 className="text-3xl text-blue-800 font-bold text-center mb-10">
        Proyecto de Ventas de Productos
      </h1>

      {/* Mensaje de carga (si loading es true) */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-blue-500 animate-pulse">Cargando productos...</p>
        </div>
) : (
  <>
    <h2 className="text-2xl text-gray-500 font-semibold mb-4 text-center">
      Listado de Productos disponibles:
    </h2>
    <div>
      <input
        className="bg-orange-100 rounded p-1 mr-2 w-65"
        type="text"
        placeholder="Busqueda de producto"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
    </div>
    <div className="flex flex-col md:flex-row h-screen w-full">
      {/* Product List Section */}
      <div className="w-full md:w-2/3 bg-gray-100 p-4 overflow-y-auto">
        <div className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductList key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
      {/* Stats Panel Section */}
      <div className="w-full md:w-1/3 bg-white p-4 ">
        <h2 className="text-xl font-bold mb-4">Estadísticas</h2>
        <div className="pt-1">
          {/* Renderización condicional */}
      <button
        className="bg-red-700 rounded p-1 pl-3 pr-3 m-0 text-white"
        onClick={() => setShow(!show)}
      >
        {show ? "Ocultar" : "Mostrar"}
      </button>

          {show && (
            <StatsPanel
              total={totalProducts}
              totalPrice={totalPrice}
              max={maxProductObj.price}
              maxName={maxProductObj.title}
              min={minProductObj.price}
              minName={minProductObj.title}
              mayor20={mayor20}
              promedioDescuento={promedioDescuento}
              maxRatingTitle={maxRatingObj.title}
              maxRatingValue={maxRatingObj.rating}
            />
          )}

          {filteredProducts.length == 0 && <div>No se encontraron productos</div>}
        </div>
      </div>
    </div>
  </>
)}
       
      {/* Texto adicional */}
      
      <p className="text-center text-blue-400 mt-10 text-sm">
        Proyecto RS-MORENO TSDCIA 
      </p>
    </div>
    
  );
}

export default App;