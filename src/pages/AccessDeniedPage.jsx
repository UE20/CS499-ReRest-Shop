// Shown if someone who is not an admin tries to open an admin page.
export default function AccessDeniedPage({ onNavigate }) {
  return (
    <section className="container section">
      <div className="empty-state">
        <h1 className="page-title">Admin access required</h1>
        <p className="muted">Your account cannot open this page.</p>
        <button className="btn btn-primary" onClick={() => onNavigate('home')}>
          Back to shop
        </button>
      </div>
    </section>
  );
}
