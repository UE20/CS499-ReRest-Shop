// One order for the customer: items, delivery address and payment summary.
import SummaryRow from '../components/SummaryRow';
import { formatPrice } from '../utils/price';
import { statusLabels, getOrderSubtotal, getOrderTotal } from '../utils/orderHelpers';

export default function OrderDetailsPage({ order, products, onBack }) {
  if (!order) {
    return null;
  }

  // Paid and shipped orders both count as paid.
  const isPaid = order.status !== 'pending';

  return (
    <section className="container section">
      <button className="link-button back-link" onClick={onBack}>
        ← My orders
      </button>
      <h1 className="page-title">Order {order.id}</h1>
      <p className="page-subtitle">
        Placed {order.date} · {statusLabels[order.status]}
      </p>

      <div className="two-columns">
        <div>
          {order.items.map((item) => {
            // Show the product photo if the product is still in the shop.
            const product = products.find((p) => p.id === item.productId);
            return (
              <div className="order-item" key={item.productId}>
                {product && product.image && <img src={product.image} alt="" />}
                <div>
                  <p className="item-name">
                    {item.name} × {item.quantity}
                  </p>
                  <p className="small muted">Item price at purchase: {formatPrice(item.price)}</p>
                </div>
              </div>
            );
          })}

          {/* Address lines saved with the order */}
          <h2 className="small-heading">Delivery address</h2>
          {order.address ? (
            <p className="muted address">
              {order.address.map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          ) : (
            <p className="muted">Added when the payment is complete.</p>
          )}
        </div>

        <aside className="summary-box">
          <h2>Payment summary</h2>
          <SummaryRow label="Subtotal" value={formatPrice(getOrderSubtotal(order))} />
          {/* Shipping and tax only show after payment */}
          {isPaid && (
            <>
              <SummaryRow label="Shipping" value={order.shipping === 0 ? 'Free' : formatPrice(order.shipping)} />
              <SummaryRow label="Tax" value={formatPrice(order.tax)} />
            </>
          )}
          <SummaryRow label={isPaid ? 'Paid' : 'Total so far'} value={formatPrice(getOrderTotal(order))} isTotal />
          <p className={isPaid ? 'status status-paid' : 'status status-pending'}>
            {isPaid ? 'Payment confirmed' : 'Waiting for payment'}
          </p>
        </aside>
      </div>
    </section>
  );
}
