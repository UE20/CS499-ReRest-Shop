// Shop home: a short welcome and the hygiene kits.
import ProductCard from '../components/ProductCard';

export default function HomePage({ products, onOpenProduct, onAddToBag, onNavigate }) {
  // The home page shows up to 3 kits. The full list is on the catalog page.
  const kits = products.filter((product) => product.category === 'Hygiene kits').slice(0, 3);

  return (
    <>
      {/* Top part: title, button and a big photo */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-text">
            <span className="gold-line" />
            <h1>Travel with confidence.</h1>
            <p>
              Small essentials. More comfortable days.
              <br />
              Hygiene kits for wherever life takes you.
            </p>
            <button className="btn btn-primary" onClick={() => onNavigate('catalog')}>
              Explore the collection
            </button>
          </div>
          <img
            className="hero-photo"
            src="images/products/travelers-essential.jpg"
            alt="A navy travel pouch with wipes, a sanitizer bottle and seat covers"
          />
        </div>
      </section>

      <section className="container section">
        <h2 className="page-title">Everyday essentials</h2>
        <p className="page-subtitle">A small collection, thoughtfully put together.</p>

        {/* The kits as cards */}
        <div className="product-grid">
          {kits.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpen={onOpenProduct}
              onAddToBag={onAddToBag}
            />
          ))}
        </div>

        <button className="link-button" onClick={() => onNavigate('catalog')}>
          Shop all {products.length} products →
        </button>
      </section>
    </>
  );
}
