// Mock orders for My orders and the admin pages.
// Each item keeps the price at the time of purchase, so old orders do not
// change when the admin edits a product price later.
// status can be 'pending' (not paid yet), 'paid' or 'shipped'.

export const orders = [
  {
    id: 'RR-1042',
    date: 'Nov 1, 2026',
    customerName: 'Abdo Ey',
    customerEmail: 'abdo@example.com',
    status: 'paid',
    items: [{ productId: 1, name: 'Traveler’s Essential', price: 18, quantity: 1 }],
    shipping: 4,
    tax: 1.26,
    address: ['Abdo Ey', '1800 Lincoln Ave', 'Evansville, IN 47722', 'United States'],
  },
  {
    id: 'RR-1041',
    date: 'Nov 1, 2026',
    customerName: 'Jamie Lee',
    customerEmail: 'jamie@example.com',
    status: 'pending',
    items: [{ productId: 1, name: 'Traveler’s Essential', price: 18, quantity: 1 }],
    // Shipping, tax and the address are added when the customer pays.
    shipping: null,
    tax: null,
    address: null,
  },
  {
    id: 'RR-1031',
    date: 'Oct 24, 2026',
    customerName: 'Abdo Ey',
    customerEmail: 'abdo@example.com',
    status: 'shipped',
    items: [{ productId: 4, name: 'Travel Pouch', price: 8, quantity: 1 }],
    shipping: 4,
    tax: 0.56,
    address: ['Abdo Ey', '1800 Lincoln Ave', 'Evansville, IN 47722', 'United States'],
  },
];
