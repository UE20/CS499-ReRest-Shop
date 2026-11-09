// Admin: every customer order, with a search box.
import { useState } from 'react';
import { formatPrice } from '../../utils/price';
import { statusLabels, getOrderTotal } from '../../utils/orderHelpers';

export default function AdminOrdersPage({ orders, onOpenOrder }) {
  const [searchText, setSearchText] = useState('');

  // Match the order number, the customer name or the email.
  const search = searchText.trim().toLowerCase();
  const visibleOrders = orders.filter((order) => {
    return (
      order.id.toLowerCase().includes(search) ||
      order.customerName.toLowerCase().includes(search) ||
      order.customerEmail.toLowerCase().includes(search)
    );
  });

  // Pending orders get a * because shipping and tax are not added yet.
  let hasPending = false;
  visibleOrders.forEach((order) => {
    if (order.status === 'pending') {
      hasPending = true;
    }
  });

  return (
    <>
      <h1 className="page-title">Orders</h1>
      <p className="page-subtitle">Review customer orders and payment status.</p>

      <div className="field admin-search">
        <label htmlFor="order-search">Find an order</label>
        <input
          id="order-search"
          type="search"
          placeholder="Order number or customer email"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
      </div>

      {/* One row per order. * means the total can still change */}
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Order / customer</th>
              <th>Date</th>
              <th>Status</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {visibleOrders.map((order) => (
              <tr key={order.id}>
                <td>
                  {order.id} · {order.customerName}
                </td>
                <td>{order.date}</td>
                <td>
                  <span className={'status status-' + order.status}>{statusLabels[order.status]}</span>
                </td>
                <td>
                  {formatPrice(getOrderTotal(order))}
                  {order.status === 'pending' && '*'}
                </td>
                <td>
                  <button className="link-button" onClick={() => onOpenOrder(order.id)}>
                    View →
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {visibleOrders.length === 0 && <p className="muted empty-note">No orders match your search.</p>}
      {hasPending && (
        <p className="small muted empty-note">* Pending amount may change until shipping and tax are confirmed.</p>
      )}
    </>
  );
}
