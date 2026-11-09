// "The collection": every product with search, category filter and sort.
import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import { categories } from '../data/products';

export default function CatalogPage({ products, onOpenProduct, onAddToBag }) {
  // These only matter on this page, so they live here and not in App.
  const [searchText, setSearchText] = useState('');
  const [category, setCategory] = useState('All products');
  const [sortBy, setSortBy] = useState('featured');

  // 1. Keep the products that match the search and the category.
  const search = searchText.trim().toLowerCase();
  let visibleProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search);
    const matchesCategory = category === 'All products' || product.category === category;
    return matchesSearch && matchesCategory;
  });

  // 2. Sort them. sort() changes the array it is called on,
  // so we copy the array first with [...visibleProducts].
  if (sortBy === 'price-low') {
    visibleProducts = [...visibleProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    visibleProducts = [...visibleProducts].sort((a, b) => b.price - a.price);
  }

  // Used by the "Clear filters" button when nothing matches.
  function clearFilters() {
    setSearchText('');
    setCategory('All products');
    setSortBy('featured');
  }

  return (
    <section className="container section">
      <h1 className="page-title">The collection</h1>
      <p className="page-subtitle">Simple essentials for your next stop.</p>

      {/* Search box and sort menu */}
      <div className="toolbar">
        <label className="visually-hidden" htmlFor="search">
          Search products by name
        </label>
        <input
          id="search"
          className="search-input"
          type="search"
          placeholder="Search products by name"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />

        <div className="sort">
          <label htmlFor="sort">Sort:</label>
          <select id="sort" value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
            <option value="featured">Featured</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
          </select>
        </div>
      </div>

      <CategoryFilter categories={categories} selected={category} onSelect={setCategory} />

      <p className="result-count">
        {visibleProducts.length} {visibleProducts.length === 1 ? 'product' : 'products'}
      </p>

      {/* Show the grid, or a message if nothing matches */}
      {visibleProducts.length > 0 ? (
        <div className="product-grid">
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpen={onOpenProduct}
              onAddToBag={onAddToBag}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No products found</h2>
          <p className="muted">Try a different name or category.</p>
          <button className="btn btn-primary" onClick={clearFilters}>
            Clear filters
          </button>
        </div>
      )}
    </section>
  );
}
