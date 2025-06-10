import CategoryFilter from './CategoryFilter';

function SearchBar({ search, setSearch, categories, selectedCategory, setSelectedCategory}) {
  return (
    <div className="flex gap-2 mb-4">
      <input
        className="bg-gray-100 rounded p-1 mr-2 w-65"
        type="text"
        placeholder="Buscar producto"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <CategoryFilter 
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </div>
  );
}

export default SearchBar;