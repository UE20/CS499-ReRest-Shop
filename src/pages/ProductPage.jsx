// Product details: photo, price, stock, quantity and "Add to bag".
import { useState } from 'react';
import QuantityStepper from '../components/QuantityStepper';
import { formatPrice } from '../utils/price';

export default function ProductPage({ product, onBack, onAddToBag }) {
  // How many the customer wants. Starts at 1.
  const [quantity, setQuantity] = useState(1);

  // The admin may have deleted this product.
  if (!product) {
    return (
      <section className="container section">
        <h1 className="page-title">This product is no longer available</h1>
        <button className="btn btn-primary" onClick={onBack}>
          Browse products
        </button>
      </section>
    );
  }

  // true if there is at least one left
  const inStock = product.stock > 0;

  return (
    <section className="container section">
      <button className="link-button back-link" onClick={onBack}>
        ← All products
      </button>

      <div className="product-detail">
        <div className="product-detail-photo">
          {product.image ? (
            <img src={product.image} alt={product.name} />
          ) : (
            <span className="no-photo">No photo yet</span>
          )}
        </div>

        <div className="product-detail-info">
          <p className="eyebrow">{product.category}</p>
          <h1 className="product-title">{product.name}</h1>
          <p className="product-price">{formatPrice(product.price)}</p>
          <p className="muted">{product.description}</p>

          {/* In stock: quantity and Add to bag. Out of stock: disabled button */}
          {inStock ? (
            <>
              <p className="stock in-stock">In stock · {product.stock} available</p>
              <p className="field-label">Quantity</p>
              <QuantityStepper value={quantity} max={product.stock} onChange={setQuantity} />
              <button
                className="btn btn-primary btn-full"
                onClick={() => onAddToBag(product.id, quantity)}
              >
                Add to bag
              </button>
              <p className="small muted">Shipping and any tax are shown before payment.</p>
            </>
          ) : (
            <>
              <p className="stock out-of-stock">Out of stock</p>
              <button className="btn btn-full" disabled>
                Out of stock
              </button>
              <button className="btn btn-secondary btn-full" onClick={onBack}>
                Browse other products
              </button>
              <p className="small muted">Back in stock soon.</p>
            </>
          )}

          {/* Only kits have a list of what is inside */}
          {product.includes.length > 0 && (
            <div className="includes">
              <h2>Inside your kit</h2>
              <ul>
                {product.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
