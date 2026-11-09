// Wraps every admin page: the sidebar on the left and the page on the right.
// The admin page itself comes in as "children".
import AdminSidebar from './AdminSidebar';

export default function AdminLayout({ activeSection, onNavigate, children }) {
  return (
    <div className="admin-layout">
      <AdminSidebar activeSection={activeSection} onNavigate={onNavigate} />
      <main className="admin-content">{children}</main>
    </div>
  );
}
