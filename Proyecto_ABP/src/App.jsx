import { useState, useEffect, useRef } from "react";
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

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          axios.get("https://dummyjson.com/products?limit=100"),
          axios.get("https://dummyjson.com/products/categories"),
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

  let filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) &&
      (selectedCategory === "all" || p.category === selectedCategory)
  );

  // Ordenamiento sin reasignar const
  let sortedProducts = [...filteredProducts];
  if (sortOption === "price-asc") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === "price-desc") {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (sortOption === "rating-asc") {
    sortedProducts.sort((a, b) => a.rating - b.rating);
  } else if (sortOption === "rating-desc") {
    sortedProducts.sort((a, b) => b.rating - a.rating);
  }

  const totalProducts = sortedProducts.length;
  const maxProductObj = sortedProducts.reduce((max, p) => (p.price > max.price ? p : max), sortedProducts[0]);
  const minProductObj = sortedProducts.reduce((min, p) => (p.price < min.price ? p : min), sortedProducts[0]);
  const mayor20 = sortedProducts.filter((p) => p.title.length > 20).length;
  const totalPrice = sortedProducts.reduce((sum, p) => sum + p.price, 0).toFixed(2);
  const promedioDescuento = sortedProducts.length > 0
    ? (sortedProducts.reduce((sum, p) => sum + p.discountPercentage, 0) / sortedProducts.length).toFixed(2)
    : 0;
  const maxRatingObj = sortedProducts.reduce((max, p) => (p.rating > max.rating ? p : max), sortedProducts[0]);
  const promedioPrecio = sortedProducts.length
    ? (sortedProducts.reduce((sum, p) => sum + p.price, 0) / sortedProducts.length).toFixed(2)
    : 0;
  const cantidadPorCategoria = selectedCategory === "all"
    ? sortedProducts.length
    : sortedProducts.filter(p => p.category === selectedCategory).length;
  const cantidadStockMayor50 = sortedProducts.filter(p => p.stock > 50).length;
  const cantidadRatingMayor45 = sortedProducts.filter(p => p.rating > 4.5).length;
  const promedioRating = sortedProducts.length
    ? (sortedProducts.reduce((sum, p) => sum + p.rating, 0) / sortedProducts.length).toFixed(2)
    : 0;
  const promedioPrecioCategoriaFiltrada =
    selectedCategory !== "all"
      ? (
          products
            .filter((p) => p.category === selectedCategory)
            .reduce((sum, p) => sum + p.price, 0) /
          products.filter((p) => p.category === selectedCategory).length
        ).toFixed(2)
      : "-";

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    containerRef.current.classList.toggle("dark-mode");
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-green-50 p-6">
      <h1 className="text-3xl text-gray-800 font-bold text-center mb-8">
        Listado de Productos
      </h1>

      <button className="button" onClick={toggleDarkMode}>
        Ver modo {darkMode ? "Claro" : "Oscuro"}
      </button>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500 animate-pulse">Cargando productos...</p>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row h-screen w-full">
          <div className="w-full md:w-2/3 bg-gray-100 p-4 overflow-y-auto">
            <h2 className="text-2xl text-pink-500 font-semibold mb-4 text-left">
              Productos disponibles:
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <ProductList key={product.id} product={product} />
              ))}
            </div>
          </div>

          <div className="w-full md:w-1/3 bg-white p-4 overflow-auto">
            <h2 className="text-xl font-bold mb-4">Panel de Estadísticas</h2>
            <button
              className="bg-pink-700 rounded p-1 pl-3 pr-3 m-0 text-white"
              onClick={() => setShow(!show)}
            >
              {show ? "Ocultar" : "Mostrar"}
            </button>

            <SearchBar
              search={search}
              setSearch={setSearch}
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            <SortSelect sortOption={sortOption} setSortOption={setSortOption} />

            {show && (
              <StatsPanel
                filteredProducts={sortedProducts}
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
              />
            )}

            {sortedProducts.length === 0 && <div>No se encontraron productos</div>}
          </div>
        </div>
      )}

      <p className="text-center text-gray-400 mt-10 text-sm">
        Tienda ISPC - 2025
      </p>
    </div>
  );
}

export default App;