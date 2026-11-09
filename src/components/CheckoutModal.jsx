// Demo checkout. In a later milestone this step sends the customer to
// Stripe Checkout (test mode), and the order is saved after Stripe confirms the payment.
import Modal from './Modal';
import SummaryRow from './SummaryRow';
import { formatPrice, calculateSubtotal, calculateShipping, calculateTax } from '../utils/price';

export default function CheckoutModal({ lines, onPay, onCancel }) {
  // Work out the money with the helpers in utils/price.js
  const subtotal = calculateSubtotal(lines);
  const shipping = calculateShipping(subtotal);
  const tax = calculateTax(subtotal);
  const total = subtotal + shipping + tax;

  return (
    <Modal title="Secure checkout" onClose={onCancel}>
      <p className="muted">
        This is a demo payment. In the final version, this step opens Stripe in test mode.
      </p>

      {/* Price breakdown */}
      <div className="summary-box">
        <SummaryRow label="Subtotal" value={formatPrice(subtotal)} />
        <SummaryRow label="Shipping" value={shipping === 0 ? 'Free' : formatPrice(shipping)} />
        <SummaryRow label="Tax (7%)" value={formatPrice(tax)} />
        <SummaryRow label="Total" value={formatPrice(total)} isTotal />
      </div>

      <div className="modal-actions">
        <button className="btn btn-primary" onClick={onPay}>
          Pay {formatPrice(total)}
        </button>
        <button className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </Modal>
  );
}
