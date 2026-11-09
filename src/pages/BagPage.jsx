// "Your bag": the items in the bag and the order summary.
import QuantityStepper from '../components/QuantityStepper';
import SummaryRow from '../components/SummaryRow';
import { formatPrice, calculateSubtotal, amountLeftForFreeShipping } from '../utils/price';

export default function BagPage({
  lines,
  user,
  onChangeQuantity,
  onRemove,
  onCheckout,
  onOpenProduct,
  onNavigate,
}) {
  // Empty bag: show a message and a button to the products.
  if (lines.length === 0) {
    return (
      <section className="container section">
        <h1 className="page-title">Your bag</h1>
        <p className="page-subtitle">Your bag is empty. Explore the collection to find your essentials.</p>
        <button className="btn btn-primary" onClick={() => onNavigate('catalog')}>
          Browse products
        </button>
      </section>
    );
  }

  // Count all items (2 wipes + 1 kit = 3 items).
  let itemCount = 0;
  lines.forEach((line) => {
    itemCount += line.quantity;
  });
  const itemText = itemCount === 1 ? '1 item' : itemCount + ' items';

  // Money for the summary box.
  const subtotal = calculateSubtotal(lines);
  const leftForFreeShipping = amountLeftForFreeShipping(subtotal);

  return (
    <section className="container section">
      <h1 className="page-title">Your bag</h1>
      <p className="page-subtitle">{itemText}, ready for your next trip.</p>

      <div className="two-columns">
        <div>
          {/* One row for each product in the bag */}
          {lines.map((line) => (
            <div className="bag-line" key={line.productId}>
              <button
                className="bag-line-photo"
                onClick={() => onOpenProduct(line.productId)}
                aria-label={'View ' + line.name}
              >
                {line.image ? <img src={line.image} alt="" /> : <span className="no-photo">No photo</span>}
              </button>

              <div className="bag-line-info">
                <button className="text-button bag-line-name" onClick={() => onOpenProduct(line.productId)}>
                  {line.name}
                </button>
                <p className="small muted">{formatPrice(line.price)} each</p>
                <QuantityStepper
                  value={line.quantity}
                  max={line.stock}
                  onChange={(newQuantity) => onChangeQuantity(line.productId, newQuantity)}
                />
              </div>

              <div className="bag-line-end">
                <p className="bag-line-total">{formatPrice(line.price * line.quantity)}</p>
                <button className="link-button" onClick={() => onRemove(line.productId)}>
                  Remove
                </button>
              </div>
            </div>
          ))}

          <button className="link-button" onClick={() => onNavigate('catalog')}>
            ← Continue shopping
          </button>
        </div>

        <aside className="summary-box">
          <h2>Order summary</h2>
          <SummaryRow label={'Subtotal (' + itemText + ')'} value={formatPrice(subtotal)} />

          {/* Free shipping message ($75 or more) */}
          {leftForFreeShipping > 0 ? (
            <p className="small muted">
              You’re {formatPrice(leftForFreeShipping)} away from free standard shipping.
            </p>
          ) : (
            <p className="small free-shipping">Your order ships free.</p>
          )}

          {/* Guests sign in first. Signed-in users go to payment. */}
          {user ? (
            <>
              <button className="btn btn-primary btn-full" onClick={onCheckout}>
                Continue to secure payment
              </button>
              <p className="small muted">Shipping and tax are added at checkout.</p>
            </>
          ) : (
            <>
              <button className="btn btn-primary btn-full" onClick={onCheckout}>
                Sign in to check out
              </button>
              <p className="small muted">Your bag stays with you when you sign in.</p>
            </>
          )}
        </aside>
      </div>
    </section>
  );
}
