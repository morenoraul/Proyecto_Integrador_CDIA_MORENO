import { useState, useEffect } from "react";
import { useRef } from "react";
import axios from "axios";
import "./App.css";
import ProductList from "./components/ProductList"; 
import StatsPanel from "./components/StatsPanel";
import SearchBar from "./components/SearchBar";
import SortSelect from "./components/SortSelect";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const containerRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const [sortOption, setSortOption] = useState('');

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
  }, []); 
  
  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) &&
      (selectedCategory === "all" || p.category === selectedCategory)
  );
  const totalProducts = filteredProducts.length;
  const maxProductObj = filteredProducts.reduce((max, p) => (p.price > max.price ? p : max), filteredProducts[0]);
  const minProductObj = filteredProducts.reduce((min, p) => (p.price < min.price ? p : min), filteredProducts[0]);
  const mayor20 = filteredProducts.filter((p) => p.title.length > 20).length;
  const totalPrice = filteredProducts.reduce((sum, p) => sum + p.price, 0).toFixed(2);
  const promedioDescuento = filteredProducts.length > 0
    ? (filteredProducts.reduce((sum, p) => sum + p.discountPercentage, 0) / filteredProducts.length).toFixed(2)
    : 0;
  const maxRatingObj = filteredProducts.reduce((max, p) => (p.rating > max.rating ? p : max), filteredProducts[0]);
  const promedioPrecio = filteredProducts.length > 0
    ? (filteredProducts.reduce((sum, p) => sum + p.price, 0) / filteredProducts.length).toFixed(2)
    : 0;
  const minRatingObj = filteredProducts.reduce((min, p) => (p.rating < min.rating ? p : min), filteredProducts[0]);
  const minPriceObj = filteredProducts.reduce((min, p) => (p.price < min.price ? p : min), filteredProducts[0]);
  const maxDiscountObj = filteredProducts.reduce((max, p) => (p.discountPercentage > max.discountPercentage ? p : max), filteredProducts[0]);
  const minDiscountObj = filteredProducts.reduce((min, p) => (p.discountPercentage < min.discountPercentage ? p : min), filteredProducts[0]);
  const cantidadPorCategoria = selectedCategory === "all"
    ? filteredProducts.length
    : filteredProducts.filter((p) => p.category === selectedCategory).length; 
   const cantidadStockMayor50 = filteredProducts.filter(p => p.stock > 50).length;
  const cantidadStockMenor10 = filteredProducts.filter(p => p.stock < 10).length;
  const cantidadStockCero = filteredProducts.filter(p => p.stock === 0).length;
  const cantidadStockMayor100 = filteredProducts.filter(p => p.stock > 100).length;
  const cantidadRatingMayor45 = filteredProducts.filter(p => p.rating > 4.5).length;
  const promedioRating = filteredProducts.length > 0
    ? (filteredProducts.reduce((sum, p) => sum + p.rating, 0) / filteredProducts.length).toFixed(2)
    : 0;
  const promedioPrecioCategoriaFiltrada =
  selectedCategory !== "all"
    ? (
        products
          .filter((p) => p.category === selectedCategory)
          .reduce((sum, p) => sum + p.price, 0) /
        products.filter((p) => p.category === selectedCategory).length || 0
      ).toFixed(2)
    : "-";

  const promedioRatingCategoriaFiltrada =
  selectedCategory !== "all"
    ? (
        products
          .filter((p) => p.category === selectedCategory)
          .reduce((sum, p) => sum + p.rating, 0) /
        products.filter((p) => p.category === selectedCategory).length || 0
      ).toFixed(2)
    : "-";
  // const promedioDescuentoCategoriaFiltrada =

    const toggleDarkMode = ()=>{
      setDarkMode(!darkMode);
          containerRef.current.classList.toggle("dark-mode");
   
    };
  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(search.toLowerCase())
  );
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSearch(""); // Limpiar la búsqueda al cambiar de categoría
  }
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
              cantidadPorCategoria={cantidadPorCategoria}
              cantidadStockMayor50={cantidadStockMayor50}
              cantidadStockMenor10={cantidadStockMenor10}
              cantidadStockCero={cantidadStockCero}
              cantidadStockMayor100={cantidadStockMayor100}
              cantidadRatingMayor45={cantidadRatingMayor45}
              promedioRating={promedioRating}
              promedioDescuento={promedioDescuento}
              promedioPrecio={promedioPrecio}
              promedioPrecioCategoriaFiltrada={promedioPrecioCategoriaFiltrada}
              promedioRatingCategoriaFiltrada={promedioRatingCategoriaFiltrada}
              minRatingTitle={minRatingObj.title}
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


import { Bar, Pie } from 'react-chartjs-2';
import { CSVLink } from 'react-csv';

const Visualization = ({ products }) => {
  const categories = [...new Set(products.map(product => product.category))];
  const categoryCounts = categories.map(category => products.filter(product => product.category === category).length);
  const stockCounts = categories.map(category => products.filter(product => product.category === category).reduce((acc, product) => acc + product.stock, 0));

  const barData = {
    labels: categories,
    datasets: [
      {
        label: 'Cantidad de productos por categoría',
        data: categoryCounts,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: categories,
    datasets: [
      {
        label: 'Proporción de stock por categoría',
        data: stockCounts,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const csvData = products.map(product => ({
    id: product.id,
    title: product.title,
    price: product.price,
    category: product.category,
    stock: product.stock,
    rating: product.rating,
  }));

  return (
    <div>
      <h2>Visualización de Datos</h2>
      <div>
        <Bar data={barData} />
      </div>
      <div>
        <Pie data={pieData} />
      </div>
      <CSVLink data={csvData} filename={"productos.csv"}>
        Exportar productos filtrados a CSV
      </CSVLink>
    </div>
  );
};

export { Visualization };

export default App;