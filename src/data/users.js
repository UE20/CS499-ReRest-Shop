// Two demo accounts so the prototype can show a customer and an admin.
// Sign-in is only pretend in this milestone. In a later milestone the
// server will check the email and a hashed password instead.

export const demoUsers = [
  {
    name: 'Abdo Ey',
    email: 'abdo@example.com',
    password: 'shop123',
    role: 'customer',
    address: ['Abdo Ey', '1800 Lincoln Ave', 'Evansville, IN 47722', 'United States'],
  },
  {
    name: 'ReRest Admin',
    email: 'admin@rerests.com',
    password: 'admin123',
    role: 'admin',
    address: ['ReRest Admin', '1800 Lincoln Ave', 'Evansville, IN 47722', 'United States'],
  },
];
