// One product in a grid. Clicking the photo or the name opens the product page.
import { formatPrice } from '../utils/price';

export default function ProductCard({ product, onOpen, onAddToBag }) {
  // true if we still have this product
  const inStock = product.stock > 0;

  return (
    <article className="product-card">
      <button
        className="product-card-photo"
        onClick={() => onOpen(product.id)}
        aria-label={'View ' + product.name}
      >
        {/* Placeholder if the product has no photo */}
        {product.image ? (
          <img src={product.image} alt="" />
        ) : (
          <span className="no-photo">No photo yet</span>
        )}
      </button>

      <div className="product-card-top">
        <h3>
          <button className="text-button" onClick={() => onOpen(product.id)}>
            {product.name}
          </button>
        </h3>
        <span>{formatPrice(product.price)}</span>
      </div>

      <p className="product-card-summary">{product.summary}</p>

      {/* Out of stock products get a disabled button */}
      {inStock ? (
        <button className="btn btn-secondary btn-full" onClick={() => onAddToBag(product.id, 1)}>
          Add to bag
        </button>
      ) : (
        <button className="btn btn-full" disabled>
          Out of stock
        </button>
      )}
    </article>
  );
}
