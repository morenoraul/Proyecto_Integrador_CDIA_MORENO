import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";
import ProductList from "./components/ProductList"; // Importamos el componente
import StatsPanel from "./components/StatsPanel";
import SearchBar from "./components/SearchBar";
import SortSelect from "./components/SortSelect";

function App() {
  // 1. Estado para almacenar los productos
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para manejar carga
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  //Referencias
  const containerRef = useRef(null);
  //estados de categorias
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  //ordenamiento de productos
  const [sortOption, setSortOption] = useState(''); // Nuevo estado para ordenamiento
  

  



  // 2. useEffect para hacer la petición al montar el componente
  useEffect(() => {
    const fetchProducts = async () => {
      try {
         const [productsRes, categoriesRes] = await Promise.all([
          axios.get("https://dummyjson.com/products?limit=100"),
          axios.get("https://dummyjson.com/products/category-list")
        ]);
        setProducts(productsRes.data.products);
        setCategories(categoriesRes.data);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Se ejecuta solo una vez al inicio

    //Filtramos los productos obtenidos de la API
  let filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) &&
      (selectedCategory === "all" || p.category === selectedCategory)
  );
    //Cantidad de productos en pantalla
    const totalProducts = filteredProducts.length;

    //El precio más caro
    //const maxProduct = Math.max(...filteredProducts.map((p) => p.price));
    const maxProductObj = filteredProducts.reduce((max, p) => (p.price > max.price ? p : max), filteredProducts[0]);
// Ahora puedes acceder a maxProductObj.price y maxProductObj.title
    //El precio más barato
    const minProductObj = filteredProducts.reduce((min, p) => (p.price < min.price ? p : min), filteredProducts[0]);
//mayor a 20 caracteres
    const mayor20 = filteredProducts.filter((p) => p.title.length > 20).length;
// precio total de los productos filtrados
    const totalPrice = filteredProducts.reduce((sum, p) => sum + p.price, 0).toFixed(2);
    const promedioDescuento = filteredProducts.length > 0
  ? (filteredProducts.reduce((sum, p) => sum + p.discountPercentage, 0) / filteredProducts.length).toFixed(2)
  : 0;
// El producto mejor valorado
    const maxRatingObj = filteredProducts.reduce((max, p) => (p.rating > max.rating ? p : max), filteredProducts[0]);

 // precio promedio
  const promedioPrecio = filteredProducts.length
  ? (filteredProducts.reduce((sum, p) => sum + p.price, 0) / filteredProducts.length).toFixed(2)
  : 0;
 //cantidad de productos
  const cantidadPorCategoria = selectedCategory === "all"
  ? filteredProducts.length
  : filteredProducts.filter(p => p.category === selectedCategory).length;
// Cantidad de productos con stock > 50
  const cantidadStockMayor50 = filteredProducts.filter(p => p.stock > 50).length;

// Cantidad de productos con rating > 4.5
  const cantidadRatingMayor45 = filteredProducts.filter(p => p.rating > 4.5).length;
  const promedioRating = filteredProducts.length
  ? (filteredProducts.reduce((sum, p) => sum + p.rating, 0) / filteredProducts.length).toFixed(2)
  : 0;
 // precio promedio categoria
 const promedioPrecioCategoriaFiltrada =
  selectedCategory !== "all"
    ? (
        products
          .filter((p) => p.category === selectedCategory)
          .reduce((sum, p) => sum + p.price, 0) /
        products.filter((p) => p.category === selectedCategory).length || 0
      ).toFixed(2)
    : "-";


    // Funcion Modo Oscuro
    const toggleDarkMode = ()=>{
      setDarkMode(!darkMode);
          containerRef.current.classList.toggle("dark-mode");
   
    };

    //ordenamiento
    if (sortOption === "price-asc") {
      filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
    } else if (sortOption === "rating-asc") {
      filteredProducts = [...filteredProducts].sort((a, b) => a.rating - b.rating);
    } else if (sortOption === "rating-desc") {
      filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);
    }

  return (
    <div ref={containerRef} className="min-h-screen bg-green-50 p-6">
      {/* Título principal */}
      <h1 className="product-list text-3xl text-gray-800 font-bold text-center mb-8">
        Listado de Productos
      </h1>
       {/* Botón para alternar modo oscuro */}
        <button className="button" onClick={toggleDarkMode}>Ver modo {darkMode ?'Claro': 'Oscuro'}</button>

      {/* Mensaje de carga (si loading es true) */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500 animate-pulse">Cargando productos...</p>
        </div>
      ) : (
        // Lista de productos (si hay datos)
        <div className="flex flex-col md:flex-row h-screen w-full">
          <div className="product-list w-full md:w-2/3 bg-gray-100 p-4 overflow-y-auto">
        <div className="mt-6">
          <h2 className="text-2xl text-pink-500 font-semibold mb-4 text-left">
            Productos disponibles:
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductList key={product.id} product={product} />
            ))}
          </div>
          </div>
        </div>
          <div className="stats-panel w-full md:w-1/3 bg-white p-4 overflow-auto ">
        <h2 className="text-xl font-bold mb-4">Panel de Estadísticas</h2>
       

        <div className="pt-1">
        
           
            <button className="bg-pink-700 rounded p-1 pl-3 pr-3
             m-0 text-white" onClick={() => setShow(!show)}>{show ? "Ocultar" : "Mostrar"}</button>
             <SearchBar
          search={search}
          setSearch={setSearch}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <SortSelect sortOption={sortOption} setSortOption={setSortOption} />

             {/* Renderización condicional */}
            {show && (  <StatsPanel
            filteredProducts={filteredProducts}
            categories={categories}
            products={products}
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
            promedioPrecio={promedioPrecio}
            cantidadPorCategoria={cantidadPorCategoria}
            cantidadStockMayor50={cantidadStockMayor50}
            cantidadRatingMayor45={cantidadRatingMayor45}
            promedioPrecioCategoriaFiltrada={promedioPrecioCategoriaFiltrada}
            promedioRating={promedioRating}

            /> )}
            

            {filteredProducts.length == 0 && <div>No se encontraron productos</div>}
      </div>  
</div>
        </div>
      )}
       
      {/* Texto adicional */}
      
      <p className="text-center text-gray-400 mt-10 text-sm">
        Tienda ISPC - 2025 
      </p>
    </div>
    
  );
}

export default App;