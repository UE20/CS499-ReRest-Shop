// Top bar on every customer page. It has the same look as the ReRest header:
// logo on the left, then the bag and the Login button (or the avatar) on the right.
import Icon from './Icon';
import AccountMenu from './AccountMenu';

export default function Header({ user, bagCount, onNavigate, onLoginClick, onSignOut }) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        {/* Logo goes back to the shop home */}
        <button className="brand" onClick={() => onNavigate('home')} aria-label="ReRest Shop home">
          <img className="brand-logo" src="images/logo-navy.svg" alt="ReRest" />
          <span className="brand-tag">SHOP</span>
        </button>

        <nav className="header-nav" aria-label="Shop">
          {/* My orders only shows when someone is signed in */}
          {user && (
            <button className="nav-link hide-on-phone" onClick={() => onNavigate('my-orders')}>
              My orders
            </button>
          )}

          {/* Bag with the number of items */}
          <button className="nav-link" onClick={() => onNavigate('bag')}>
            <Icon name="bag" />
            <span>
              <span className="hide-on-phone">Bag </span>({bagCount})
            </span>
          </button>

          {/* Signed in: avatar menu. Guest: Login button */}
          {user ? (
            <AccountMenu user={user} onNavigate={onNavigate} onSignOut={onSignOut} />
          ) : (
            <button className="btn btn-primary btn-login" onClick={onLoginClick}>
              <Icon name="login" size={18} />
              Login
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
