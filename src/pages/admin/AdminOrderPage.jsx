// Admin: one order. Paid orders can be marked as shipped.
// Pending orders have no shipping controls until they are paid.
import { useState } from 'react';
import SummaryRow from '../../components/SummaryRow';
import { formatPrice } from '../../utils/price';
import { getOrderTotal } from '../../utils/orderHelpers';

export default function AdminOrderPage({ order, onBack, onUpdateStatus }) {
  // The status picked in the dropdown, and the "Status updated." message.
  const [newStatus, setNewStatus] = useState(order ? order.status : 'paid');
  const [savedMessage, setSavedMessage] = useState('');

  if (!order) {
    return null;
  }

  const isPending = order.status === 'pending';

  // Pending orders do not have shipping and tax yet.
  let shippingText = 'Set on Stripe';
  let taxText = 'Set on Stripe';
  if (!isPending) {
    shippingText = order.shipping === 0 ? 'Free' : formatPrice(order.shipping);
    taxText = formatPrice(order.tax);
  }

  // Save the new status in App and show a short message.
  function handleUpdateClick() {
    onUpdateStatus(order.id, newStatus);
    setSavedMessage('Status updated.');
  }

  return (
    <>
      <button className="link-button back-link" onClick={onBack}>
        ← All orders
      </button>
      <h1 className="page-title">Order {order.id}</h1>
      <p className="page-subtitle">
        {order.customerName} · {order.customerEmail}
      </p>

      {isPending ? (
        <p className="status status-pending big-status">Payment pending · Not paid yet</p>
      ) : (
        <p className="status status-paid big-status">
          Payment confirmed · {order.status === 'shipped' ? 'Shipped' : 'Paid'}
        </p>
      )}

      {/* Items and money */}
      <div className="admin-order-summary">
        {order.items.map((item) => (
          <SummaryRow
            key={item.productId}
            label={item.name + ' × ' + item.quantity}
            value={formatPrice(item.price * item.quantity)}
          />
        ))}
        <SummaryRow label="Shipping" value={shippingText} />
        <SummaryRow label="Tax" value={taxText} />
        <SummaryRow
          label={isPending ? 'Total so far' : 'Total paid'}
          value={formatPrice(getOrderTotal(order)) + (isPending ? '*' : '')}
          isTotal
        />
        {isPending && (
          <p className="small muted">* Shipping and tax are added on Stripe, so this amount can change.</p>
        )}
      </div>

      <div className="admin-block">
        <h2 className="small-heading">Ship to</h2>
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
          <p className="muted">Added on Stripe when the customer pays.</p>
        )}
        <p className="small muted">
          {isPending
            ? 'Payment reference: Stripe session open, waiting for payment.'
            : 'Payment reference: Stripe session attached to this order.'}
        </p>
      </div>

      <div className="admin-block">
        {/* Only paid orders can be marked as shipped */}
        <h2 className="small-heading">Fulfillment</h2>
        {isPending ? (
          <p className="muted">Fulfillment opens after payment is confirmed.</p>
        ) : (
          <div className="fulfillment">
            <label className="visually-hidden" htmlFor="order-status">
              Order status
            </label>
            <select
              id="order-status"
              value={newStatus}
              onChange={(event) => {
                setNewStatus(event.target.value);
                setSavedMessage('');
              }}
            >
              <option value="paid">Preparing</option>
              <option value="shipped">Shipped</option>
            </select>
            <button className="btn btn-primary" onClick={handleUpdateClick}>
              Update status
            </button>
            {savedMessage && <p className="saved-message">{savedMessage}</p>}
          </div>
        )}
      </div>
    </>
  );
}
