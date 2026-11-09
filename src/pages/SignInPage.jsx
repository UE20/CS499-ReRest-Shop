// Sign in and sign up. The shop has no separate account: this is the same
// ReRest account people use on the restroom finder.
// In this milestone sign-in is only pretend (checked against data/users.js).
import { useState } from 'react';
import { demoUsers } from '../data/users';

export default function SignInPage({ message, onSignIn }) {
  const [mode, setMode] = useState('signin'); // 'signin' or 'signup'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Switch between the Sign Up and Sign In tabs.
  function switchMode(newMode) {
    setMode(newMode);
    setError('');
  }

  // Fills the form with a demo account so it is quick to test.
  function fillDemoAccount(account) {
    setMode('signin');
    setEmail(account.email);
    setPassword(account.password);
    setError('');
  }

  function handleSubmit(event) {
    event.preventDefault(); // stop the browser from reloading the page

    // Look for this email in the demo users.
    const cleanEmail = email.trim().toLowerCase();
    const account = demoUsers.find((user) => user.email === cleanEmail);

    if (mode === 'signin') {
      if (!account || account.password !== password) {
        setError('Email or password is not correct.');
        return;
      }
      // We pass the account without the password.
      onSignIn({ name: account.name, email: account.email, role: account.role, address: account.address });
    } else {
      // Sign up: the email has to be new.
      if (account) {
        setError('An account with this email already exists. Please sign in.');
        return;
      }
      onSignIn({ name: name.trim(), email: cleanEmail, role: 'customer', address: null });
    }
  }

  return (
    <section className="signin-page">
      {message && <p className="signin-message">{message}</p>}

      {/* Tabs above the form */}
      <div className="signin-tabs">
        <button
          className={mode === 'signup' ? 'signin-tab signin-tab-active' : 'signin-tab'}
          onClick={() => switchMode('signup')}
        >
          Sign Up
        </button>
        <button
          className={mode === 'signin' ? 'signin-tab signin-tab-active' : 'signin-tab'}
          onClick={() => switchMode('signin')}
        >
          Sign In
        </button>
      </div>

      <div className="signin-card">
        <form className="form" onSubmit={handleSubmit}>
          {/* Name is only needed to sign up */}
          {mode === 'signup' && (
            <div className="field">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>
          )}

          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email here"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder={mode === 'signup' ? 'At least 6 characters' : 'Enter your password'}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              minLength={mode === 'signup' ? 6 : undefined}
              required
            />
          </div>

          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}

          <button className="btn btn-primary btn-full btn-large" type="submit">
            {mode === 'signin' ? 'Sign In' : 'Create account'}
          </button>
        </form>

        <p className="signin-note">One ReRest account works for the restroom finder and the shop.</p>
      </div>

      {/* Quick buttons that fill in a demo account */}
      <div className="demo-box">
        <p className="demo-title">Demo accounts for this prototype</p>
        <div className="demo-buttons">
          {demoUsers.map((account) => (
            <button key={account.email} className="btn btn-secondary" onClick={() => fillDemoAccount(account)}>
              {account.role === 'admin' ? 'Admin' : 'Customer'}: {account.email}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
