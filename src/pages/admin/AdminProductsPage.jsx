// Admin: the list of products with Add, Edit and Delete.
import { useState } from 'react';
import Modal from '../../components/Modal';
import { formatPrice } from '../../utils/price';

export default function AdminProductsPage({ products, onAddProduct, onEditProduct, onDeleteProduct }) {
  // The product waiting for a "Delete?" answer. null means no pop-up.
  const [productToDelete, setProductToDelete] = useState(null);

  // Runs when the admin clicks "Delete product" in the pop-up.
  function handleConfirmDelete() {
    onDeleteProduct(productToDelete.id);
    setProductToDelete(null);
  }

  return (
    <>
      <div className="admin-header">
        <div>
          <h1 className="page-title">Products</h1>
          <p className="page-subtitle">Manage your small collection.</p>
        </div>
        <button className="btn btn-primary" onClick={onAddProduct}>
          Add product
        </button>
      </div>

      {/* One row per product */}
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <div className="table-product">
                    {product.image ? <img src={product.image} alt="" /> : <span className="table-no-photo" />}
                    <span>{product.name}</span>
                  </div>
                </td>
                <td>{product.category}</td>
                <td>{formatPrice(product.price)}</td>
                <td>
                  {product.stock === 0 ? <span className="status status-out">Out of stock</span> : product.stock}
                </td>
                <td>
                  <div className="table-actions">
                    <button className="link-button" onClick={() => onEditProduct(product.id)}>
                      Edit
                    </button>
                    <button className="link-button link-danger" onClick={() => setProductToDelete(product)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {products.length === 0 && <p className="muted empty-note">No products yet. Add your first product.</p>}

      {/* Ask before deleting */}
      {productToDelete && (
        <Modal title={'Delete ' + productToDelete.name + '?'} onClose={() => setProductToDelete(null)}>
          <p className="muted">Past orders keep their item details.</p>
          <div className="modal-actions">
            <button className="btn btn-primary" onClick={() => setProductToDelete(null)}>
              Keep product
            </button>
            <button className="btn btn-danger" onClick={handleConfirmDelete}>
              Delete product
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
