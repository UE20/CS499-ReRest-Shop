// Small helpers for orders.
import { calculateSubtotal } from './price';

// What each status looks like on the page.
export const statusLabels = {
  pending: 'Pending payment',
  paid: 'Paid · Preparing',
  shipped: 'Shipped',
};

export function getOrderSubtotal(order) {
  return calculateSubtotal(order.items);
}

// Pending orders do not have shipping and tax yet (they are null),
// so we count those as 0 for now.
export function getOrderTotal(order) {
  const shipping = order.shipping || 0;
  const tax = order.tax || 0;
  return getOrderSubtotal(order) + shipping + tax;
}

// Finds the highest order number and adds 1. "RR-1042" -> "RR-1043"
export function getNextOrderId(orders) {
  let highest = 1000;
  orders.forEach((order) => {
    const number = Number(order.id.replace('RR-', ''));
    if (number > highest) {
      highest = number;
    }
  });
  return 'RR-' + (highest + 1);
}

// Today's date written like "Nov 4, 2026"
export function getTodayText() {
  return new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
