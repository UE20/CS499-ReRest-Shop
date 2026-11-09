// Money helpers used on several pages.
// Same idea as price.js and tax.js in the modules practice: small functions
// that we export here and import where we need them.

export const FREE_SHIPPING_MIN = 75; // free standard shipping from $75
export const SHIPPING_COST = 4;
export const TAX_RATE = 0.07; // Indiana sales tax

// 18 -> "$18.00"
export function formatPrice(amount) {
  return '$' + amount.toFixed(2);
}

// Adds up price x quantity for every line.
// Works for bag lines and for order items.
export function calculateSubtotal(lines) {
  let subtotal = 0;
  lines.forEach((line) => {
    subtotal += line.price * line.quantity;
  });
  return subtotal;
}

export function calculateShipping(subtotal) {
  if (subtotal >= FREE_SHIPPING_MIN) {
    return 0;
  }
  return SHIPPING_COST;
}

// Rounded to cents, so we never show something like $1.2600000000000002
export function calculateTax(subtotal) {
  return Math.round(subtotal * TAX_RATE * 100) / 100;
}

// How much more the customer needs to add to get free shipping.
export function amountLeftForFreeShipping(subtotal) {
  return Math.max(FREE_SHIPPING_MIN - subtotal, 0);
}
