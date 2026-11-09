// ReRest Shop: the main component.
// App keeps the data that many pages share (products, bag, signed-in user
// and orders) and shows one page at a time. Pages get what they need as props.

import { useState } from 'react';

import ShippingBar from './components/ShippingBar';
import Header from './components/Header';
import Footer from './components/Footer';
import AdminLayout from './components/AdminLayout';
import AddedToBagModal from './components/AddedToBagModal';
import CheckoutModal from './components/CheckoutModal';

import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductPage from './pages/ProductPage';
import BagPage from './pages/BagPage';
import SignInPage from './pages/SignInPage';
import ConfirmationPage from './pages/ConfirmationPage';
import MyOrdersPage from './pages/MyOrdersPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import AccessDeniedPage from './pages/AccessDeniedPage';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import ProductFormPage from './pages/admin/ProductFormPage';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';
import AdminOrderPage from './pages/admin/AdminOrderPage';

import { products as startingProducts } from './data/products';
import { orders as startingOrders } from './data/orders';
import { calculateSubtotal, calculateShipping, calculateTax } from './utils/price';
import { getNextOrderId, getTodayText } from './utils/orderHelpers';

export default function App() {
  // ---------- State ----------

  // Which page is on the screen. We switch pages with state and conditional
  // rendering (no router), like the Drinks / Full Menu button in the cafe practice.
  const [page, setPage] = useState('home');

  // The mock data is kept in state so the admin pages can change it.
  const [products, setProducts] = useState(startingProducts);
  const [orders, setOrders] = useState(startingOrders);

  // Each bag line looks like { productId: 1, quantity: 2 }
  const [bag, setBag] = useState([]);

  // The signed-in account, or null when nobody is signed in.
  const [user, setUser] = useState(null);

  // Which product or order the detail pages should show.
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [editingProductId, setEditingProductId] = useState(null);

  // Where to go after signing in, for example back to the bag.
  const [pageAfterSignIn, setPageAfterSignIn] = useState('home');

  // Pop-ups. null / false means the pop-up is closed.
  const [addedProductName, setAddedProductName] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // ---------- Values worked out from the state ----------

  const isAdmin = user !== null && user.role === 'admin';

  // Bag lines plus the product details the bag page needs.
  const bagLines = bag.map((line) => {
    const product = products.find((item) => item.id === line.productId);
    return {
      productId: line.productId,
      quantity: line.quantity,
      name: product.name,
      price: product.price,
      image: product.image,
      stock: product.stock,
    };
  });

  // Total number of items, for "Bag (3)" in the header.
  let bagCount = 0;
  bag.forEach((line) => {
    bagCount += line.quantity;
  });

  const selectedProduct = products.find((product) => product.id === selectedProductId);
  const selectedOrder = orders.find((order) => order.id === selectedOrderId);
  const editingProduct = products.find((product) => product.id === editingProductId) || null;
  const myOrders = user ? orders.filter((order) => order.customerEmail === user.email) : [];

  // ---------- Moving between pages ----------

  function goTo(pageName) {
    setPage(pageName);
    window.scrollTo(0, 0); // start every page at the top
  }

  function openProduct(productId) {
    setSelectedProductId(productId);
    goTo('product');
  }

  function openOrder(orderId) {
    setSelectedOrderId(orderId);
    goTo('order');
  }

  function openAdminOrder(orderId) {
    setSelectedOrderId(orderId);
    goTo('admin-order');
  }

  // ---------- Bag ----------

  function addToBag(productId, quantity) {
    const product = products.find((item) => item.id === productId);
    if (product.stock === 0) {
      return;
    }

    const lineInBag = bag.find((line) => line.productId === productId);
    if (lineInBag) {
      // Already in the bag: add to it, but never more than we have in stock.
      const newQuantity = Math.min(lineInBag.quantity + quantity, product.stock);
      setBag(
        bag.map((line) => (line.productId === productId ? { ...line, quantity: newQuantity } : line)),
      );
    } else {
      setBag([...bag, { productId: productId, quantity: quantity }]);
    }

    setAddedProductName(product.name); // opens the "Added to bag" pop-up
  }

  // The − and + buttons in the bag.
  function changeQuantity(productId, quantity) {
    setBag(bag.map((line) => (line.productId === productId ? { ...line, quantity: quantity } : line)));
  }

  // The Remove link in the bag.
  function removeFromBag(productId) {
    setBag(bag.filter((line) => line.productId !== productId));
  }

  // ---------- Signing in and out ----------

  function openSignIn() {
    // Come back to this page after signing in.
    setPageAfterSignIn(page === 'signin' ? 'home' : page);
    goTo('signin');
  }

  function signIn(account) {
    setUser(account);
    goTo(pageAfterSignIn);
  }

  function signOut() {
    setUser(null);
    goTo('home');
  }

  // ---------- Checkout ----------

  function startCheckout() {
    if (user === null) {
      // Guests sign in first. The bag stays in state, so nothing is lost.
      setPageAfterSignIn('bag');
      goTo('signin');
    } else {
      setIsCheckoutOpen(true);
    }
  }

  // Runs when the demo payment is done. With Stripe, this will run only
  // after Stripe tells the server the payment went through.
  function placeOrder() {
    const subtotal = calculateSubtotal(bagLines);

    const newOrder = {
      id: getNextOrderId(orders),
      date: getTodayText(),
      customerName: user.name,
      customerEmail: user.email,
      status: 'paid',
      items: bagLines.map((line) => ({
        productId: line.productId,
        name: line.name,
        price: line.price,
        quantity: line.quantity,
      })),
      shipping: calculateShipping(subtotal),
      tax: calculateTax(subtotal),
      address: user.address,
    };

    // Take the sold items out of stock (never below 0).
    const updatedProducts = products.map((product) => {
      const line = bag.find((item) => item.productId === product.id);
      if (line) {
        return { ...product, stock: Math.max(product.stock - line.quantity, 0) };
      }
      return product;
    });

    setProducts(updatedProducts);
    setOrders([newOrder, ...orders]);
    setBag([]);
    setIsCheckoutOpen(false);
    setSelectedOrderId(newOrder.id);
    goTo('confirmation');
  }

  // ---------- Admin ----------

  // Add and Edit use the same form page. null means a new product.
  function startAddProduct() {
    setEditingProductId(null);
    goTo('admin-product-form');
  }

  function startEditProduct(productId) {
    setEditingProductId(productId);
    goTo('admin-product-form');
  }

  function saveProduct(savedProduct) {
    if (savedProduct.id === null) {
      // A new product gets the next id number.
      let highestId = 0;
      products.forEach((product) => {
        if (product.id > highestId) {
          highestId = product.id;
        }
      });
      setProducts([...products, { ...savedProduct, id: highestId + 1 }]);
    } else {
      setProducts(products.map((product) => (product.id === savedProduct.id ? savedProduct : product)));
    }
    goTo('admin-products');
  }

  function deleteProduct(productId) {
    setProducts(products.filter((product) => product.id !== productId));
    // Also take it out of the bag, so the bag never shows a deleted product.
    setBag(bag.filter((line) => line.productId !== productId));
  }

  // Admin changes an order from Preparing to Shipped.
  function updateOrderStatus(orderId, status) {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: status } : order)));
  }

  // ---------- What to show ----------

  const isAdminPage = page.startsWith('admin');
  const showAdmin = isAdminPage && isAdmin;
  const adminSection = page === 'admin-orders' || page === 'admin-order' ? 'orders' : 'products';
  const signInMessage = pageAfterSignIn === 'bag' ? 'Sign in to check out. Your bag is saved.' : '';

  return (
    <>
      {/* Customer pages: header, the current page and the footer */}
      {!showAdmin && (
        <>
          <ShippingBar />
          <Header
            user={user}
            bagCount={bagCount}
            onNavigate={goTo}
            onLoginClick={openSignIn}
            onSignOut={signOut}
          />

          <main>
            {page === 'home' && (
              <HomePage
                products={products}
                onOpenProduct={openProduct}
                onAddToBag={addToBag}
                onNavigate={goTo}
              />
            )}

            {page === 'catalog' && (
              <CatalogPage products={products} onOpenProduct={openProduct} onAddToBag={addToBag} />
            )}

            {/* key makes React start fresh (quantity back to 1) for each product */}
            {page === 'product' && (
              <ProductPage
                key={selectedProductId}
                product={selectedProduct}
                onBack={() => goTo('catalog')}
                onAddToBag={addToBag}
              />
            )}

            {page === 'bag' && (
              <BagPage
                lines={bagLines}
                user={user}
                onChangeQuantity={changeQuantity}
                onRemove={removeFromBag}
                onCheckout={startCheckout}
                onOpenProduct={openProduct}
                onNavigate={goTo}
              />
            )}

            {page === 'signin' && <SignInPage message={signInMessage} onSignIn={signIn} />}

            {page === 'confirmation' && <ConfirmationPage order={selectedOrder} onViewOrder={openOrder} />}

            {page === 'my-orders' && (
              <MyOrdersPage orders={myOrders} onOpenOrder={openOrder} onNavigate={goTo} />
            )}

            {page === 'order' && (
              <OrderDetailsPage order={selectedOrder} products={products} onBack={() => goTo('my-orders')} />
            )}

            {/* Someone who is not an admin tried to open an admin page */}
            {isAdminPage && <AccessDeniedPage onNavigate={goTo} />}
          </main>

          <Footer onNavigate={goTo} />
        </>
      )}

      {/* Admin pages: sidebar layout, no shop header */}
      {showAdmin && (
        <AdminLayout activeSection={adminSection} onNavigate={goTo}>
          {page === 'admin-products' && (
            <AdminProductsPage
              products={products}
              onAddProduct={startAddProduct}
              onEditProduct={startEditProduct}
              onDeleteProduct={deleteProduct}
            />
          )}

          {page === 'admin-product-form' && (
            <ProductFormPage
              key={editingProductId || 'new'}
              product={editingProduct}
              onSave={saveProduct}
              onCancel={() => goTo('admin-products')}
            />
          )}

          {page === 'admin-orders' && <AdminOrdersPage orders={orders} onOpenOrder={openAdminOrder} />}

          {page === 'admin-order' && (
            <AdminOrderPage
              key={selectedOrderId}
              order={selectedOrder}
              onBack={() => goTo('admin-orders')}
              onUpdateStatus={updateOrderStatus}
            />
          )}
        </AdminLayout>
      )}

      {/* Pop-ups show on top of any page */}
      {addedProductName && (
        <AddedToBagModal
          productName={addedProductName}
          onViewBag={() => {
            setAddedProductName(null);
            goTo('bag');
          }}
          onClose={() => setAddedProductName(null)}
        />
      )}

      {isCheckoutOpen && (
        <CheckoutModal lines={bagLines} onPay={placeOrder} onCancel={() => setIsCheckoutOpen(false)} />
      )}
    </>
  );
}
