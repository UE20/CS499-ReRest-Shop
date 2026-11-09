// Left menu on the admin pages. Same look as the ReRest admin panel.
// For this class only the shop parts (Products and Orders) are built.
import Icon from './Icon';

export default function AdminSidebar({ activeSection, onNavigate }) {
  return (
    <aside className="admin-sidebar">
      <button className="admin-logo" onClick={() => onNavigate('home')} aria-label="ReRest Shop home">
        <img src="images/logo-navy.svg" alt="ReRest" />
      </button>

      <p className="admin-label">ADMIN PANEL</p>

      {/* The open section gets admin-link-active so it looks selected */}
      <nav className="admin-nav" aria-label="Admin">
        <button
          className={activeSection === 'products' ? 'admin-link admin-link-active' : 'admin-link'}
          onClick={() => onNavigate('admin-products')}
        >
          <Icon name="store" size={20} />
          Products
        </button>
        <button
          className={activeSection === 'orders' ? 'admin-link admin-link-active' : 'admin-link'}
          onClick={() => onNavigate('admin-orders')}
        >
          <Icon name="receipt" size={20} />
          Orders
        </button>
      </nav>

      {/* Leave the admin panel */}
      <button className="admin-back" onClick={() => onNavigate('home')}>
        Back to shop ›
      </button>
    </aside>
  );
}
