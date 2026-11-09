// Shown after a payment goes through.
import SummaryRow from '../components/SummaryRow';
import { formatPrice } from '../utils/price';
import { getOrderSubtotal, getOrderTotal } from '../utils/orderHelpers';

export default function ConfirmationPage({ order, onViewOrder }) {
  // Nothing to show without an order.
  if (!order) {
    return null;
  }

  return (
    <section className="container section">
      <h1 className="page-title">You’re ready for your next trip.</h1>
      <p className="page-subtitle">Payment confirmed · Order {order.id}</p>
      <span className="gold-line spaced" />

      <div className="two-columns">
        <div className="stack">
          {/* What was bought */}
          {order.items.map((item) => (
            <p className="item-name" key={item.productId}>
              {item.name} × {item.quantity}
            </p>
          ))}
          <p className="status status-paid">Paid · Preparing your order</p>

          {order.address ? (
            <p className="muted">
              Delivery to {order.address[0]}
              <br />
              {order.address[1]}, {order.address[2]}
            </p>
          ) : (
            <p className="muted">The delivery address is added on Stripe in the final version.</p>
          )}

          <p className="muted">Check My orders for the latest status.</p>
          <button className="btn btn-primary" onClick={() => onViewOrder(order.id)}>
            View order
          </button>
        </div>

        {/* What was paid */}
        <aside className="summary-box">
          <SummaryRow label="Items" value={formatPrice(getOrderSubtotal(order))} />
          <SummaryRow label="Shipping" value={order.shipping === 0 ? 'Free' : formatPrice(order.shipping)} />
          <SummaryRow label="Tax" value={formatPrice(order.tax)} />
          <SummaryRow label="Total paid" value={formatPrice(getOrderTotal(order))} isTotal />
        </aside>
      </div>
    </section>
  );
}
