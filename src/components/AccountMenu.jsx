// The round avatar for a signed-in user, with a small menu under it.
// Same idea as the profile menu on the ReRest site.
import { useState } from 'react';
import Icon from './Icon';

// "Abdo Ey" -> "AE"
function getInitials(name) {
  const words = name.trim().split(' ');
  let initials = '';
  words.forEach((word) => {
    if (word !== '') {
      initials += word[0];
    }
  });
  return initials.slice(0, 2).toUpperCase();
}

export default function AccountMenu({ user, onNavigate, onSignOut }) {
  // true when the menu is open
  const [isOpen, setIsOpen] = useState(false);

  // Close the menu first, then go to the page.
  function goToPage(pageName) {
    setIsOpen(false);
    onNavigate(pageName);
  }

  // Close the menu and sign out.
  function handleLogOutClick() {
    setIsOpen(false);
    onSignOut();
  }

  return (
    <div className="account">
      <button
        className="account-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Account menu"
      >
        <span className="avatar">{getInitials(user.name)}</span>
        <Icon name="chevronDown" size={18} />
      </button>

      {isOpen && (
        <>
          {/* Clicking anywhere outside the menu closes it */}
          <div className="menu-backdrop" onClick={() => setIsOpen(false)} />

          <div className="account-menu">
            <div className="account-info">
              <span className="avatar avatar-large">{getInitials(user.name)}</span>
              <div>
                <p className="account-name">{user.name}</p>
                <p className="account-email">{user.email}</p>
              </div>
            </div>

            {/* Menu links */}
            <button className="menu-item" onClick={() => goToPage('my-orders')}>
              <Icon name="receipt" size={20} />
              My orders
            </button>

            {/* Only admins see the admin panel link */}
            {user.role === 'admin' && (
              <button className="menu-item" onClick={() => goToPage('admin-products')}>
                <Icon name="shield" size={20} />
                <span>
                  Admin panel
                  <span className="menu-item-note">Shown only to admins</span>
                </span>
              </button>
            )}

            <button className="menu-item menu-item-danger" onClick={handleLogOutClick}>
              <Icon name="logout" size={20} />
              Log out
            </button>
          </div>
        </>
      )}
    </div>
  );
}
