import { useState, useEffect } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import { CSVLink } from "react-csv";
import "chart.js/auto";
import "./App.css";
import ProductList from "./components/ProductList";
import SearchBar from "./components/SearchBar";
import SortSelect from "./components/SortSelect";
import ProductList from "./components/ProductList";
import StatsPanel from "./components/StatsPanel";
import SearchBar from "./components/SearchBar";
import SortSelect from "./components/SortSelect";
import { useState, useEffect } from "react";
import axios from "axios";
import { CSVLink } from "react-csv";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";     

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          axios.get("https://dummyjson.com/products?limit=100"),
          axios.get("https://dummyjson.com/products/categories"),
        ]);
        setProducts(productsRes.data.products);
        setCategories(categoriesRes.data);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

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

  const barData = {
    labels: categories,
    datasets: [
      {
        label: "Cantidad de productos por categoría",
        data: categories.map(
          (cat) => products.filter((p) => p.category === cat).length
        ),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const pieData = {
    labels: categories,
    datasets: [
      {
        label: "Proporción de stock por categoría",
        data: categories.map((cat) =>
          products
            .filter((p) => p.category === cat)
            .reduce((sum, p) => sum + p.stock, 0)
        ),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <h1 className="text-3xl text-blue-800 font-bold text-center mb-10">
        Proyecto de Ventas de Productos
      </h1>

      <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
      <SortSelect value={sortOption} onChange={(e) => setSortOption(e.target.value)} />

      <div className="my-6">
        <h2 className="text-xl font-semibold mb-2">Visualización de Datos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Bar data={barData} />
          <Pie data={pieData} />
        </div>
      </div>

      <div className="my-4">
        <CSVLink
          data={sortedProducts}
          filename={"productos_filtrados.csv"}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Exportar productos filtrados a CSV
        </CSVLink>
      </div>

      <ProductList products={sortedProducts} />

      <p className="text-center text-blue-400 mt-10 text-sm">
        Proyecto RS-MORENO TSDCIA
      </p>
    </div>
  );
}

export default App;
import React from "react";
import React from "react";
import React from "react";
import React from "react";
import React from "react";
import React from "react";
import React from "react"; 