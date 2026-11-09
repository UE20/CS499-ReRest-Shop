// Mock product data for Milestone 2.
// Later these products will come from the Express API and the PostgreSQL
// "products" table, so the field names here match the planned table.
// The photos are sample images for now.

export const categories = ['Hygiene kits', 'Travel bags', 'Wipes', 'Sanitizer', 'Other'];

export const products = [
  {
    id: 1,
    name: 'Traveler’s Essential',
    category: 'Hygiene kits',
    price: 18,
    stock: 24,
    image: 'images/products/travelers-essential.jpg',
    summary: 'Wipes, sanitizer & seat covers',
    description:
      'A compact kit for a more comfortable stop. Keep your everyday essentials together in one reusable pouch.',
    includes: [
      '1 reusable travel pouch',
      '6 individually wrapped pocket wipes',
      '1 travel hand sanitizer bottle',
      '10 paper seat covers',
    ],
  },
  {
    id: 2,
    name: 'Parent’s Everyday Kit',
    category: 'Hygiene kits',
    price: 20,
    stock: 12,
    image: 'images/products/parents-everyday-kit.jpg',
    summary: 'A changing pad and everyday essentials',
    description:
      'A changing pad and everyday essentials in one reusable pouch. Made for quick stops with little ones.',
    includes: [
      '1 reusable travel pouch',
      '1 foldable changing pad',
      '6 individually wrapped pocket wipes',
      '1 travel hand sanitizer bottle',
    ],
  },
  {
    id: 3,
    name: 'Driver’s Compact Kit',
    category: 'Hygiene kits',
    price: 14,
    stock: 18,
    image: 'images/products/drivers-compact-kit.jpg',
    summary: 'Small essentials for your glove box',
    description: 'Small essentials for your glove box. Clean hands and a fresh stop on every drive.',
    includes: ['1 slim zip pouch', '1 hand sanitizer spray', '6 individually wrapped pocket wipes'],
  },
  {
    id: 4,
    name: 'Travel Pouch',
    category: 'Travel bags',
    price: 8,
    stock: 30,
    image: 'images/products/travel-pouch.jpg',
    summary: 'A reusable home for your essentials',
    description: 'A reusable home for your essentials. Fits wipes, sanitizer and seat covers.',
    includes: [],
  },
  {
    id: 5,
    name: 'Pocket Wipes',
    category: 'Wipes',
    price: 6,
    stock: 40,
    image: 'images/products/pocket-wipes.jpg',
    summary: 'Six individually packed travel wipes',
    description: 'Six individually packed travel wipes. Small enough for any pocket.',
    includes: [],
  },
  {
    id: 6,
    name: 'Hand Sanitizer',
    category: 'Sanitizer',
    price: 4,
    stock: 0,
    image: 'images/products/hand-sanitizer.jpg',
    summary: 'A compact bottle for your day bag',
    description: 'A compact bottle for your day bag. Clean hands when there is no sink.',
    includes: [],
  },
  {
    id: 7,
    name: 'Seat Covers',
    category: 'Other',
    price: 5,
    stock: 35,
    image: 'images/products/seat-covers.jpg',
    summary: 'Ten individually packed paper covers',
    description: 'Ten individually packed paper seat covers. Flat and light for any bag.',
    includes: [],
  },
  {
    id: 8,
    name: 'Pocket Tissues',
    category: 'Other',
    price: 7,
    stock: 50,
    image: 'images/products/pocket-tissues.jpg',
    summary: 'Six pocket packs for everyday carry',
    description: 'Six pocket packs for everyday carry. Soft, compact and easy to share.',
    includes: [],
  },
];
