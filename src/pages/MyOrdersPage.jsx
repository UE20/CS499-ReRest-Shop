// "My orders": every order of the signed-in customer.
import { formatPrice } from '../utils/price';
import { statusLabels, getOrderTotal } from '../utils/orderHelpers';

export default function MyOrdersPage({ orders, onOpenOrder, onNavigate }) {
  return (
    <section className="container section">
      <h1 className="page-title">My orders</h1>
      <p className="page-subtitle">Your essentials, from checkout to your door.</p>

      {/* No orders yet, or a table with one row per order */}
      {orders.length === 0 ? (
        <div className="empty-state">
          <h2>No orders yet</h2>
          <p className="muted">Your first order will show up here.</p>
          <button className="btn btn-primary" onClick={() => onNavigate('catalog')}>
            Shop products
          </button>
        </div>
      ) : (
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Placed</th>
                <th>Status</th>
                <th>Total</th>
                <th>
                  <span className="visually-hidden">Details</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {/* The status class gives each status its own color */}
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.date}</td>
                  <td>
                    <span className={'status status-' + order.status}>{statusLabels[order.status]}</span>
                  </td>
                  <td>{formatPrice(getOrderTotal(order))}</td>
                  <td>
                    <button className="link-button" onClick={() => onOpenOrder(order.id)}>
                      View order →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
