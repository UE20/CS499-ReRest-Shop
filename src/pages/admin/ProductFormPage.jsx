// Admin: one form for both "Add product" and "Edit product".
// product is null when adding a new product.
import { useState } from 'react';
import { categories } from '../../data/products';

export default function ProductFormPage({ product, onSave, onCancel }) {
  const isEditing = product !== null;

  // Every input is "controlled": its value comes from state, and typing
  // updates the state. Editing starts with the product's current values.
  const [name, setName] = useState(isEditing ? product.name : '');
  const [summary, setSummary] = useState(isEditing ? product.summary : '');
  const [description, setDescription] = useState(isEditing ? product.description : '');
  const [category, setCategory] = useState(isEditing ? product.category : '');
  const [price, setPrice] = useState(isEditing ? String(product.price) : '');
  const [stock, setStock] = useState(isEditing ? String(product.stock) : '');
  const [image, setImage] = useState(isEditing ? product.image : '');
  const [includesText, setIncludesText] = useState(isEditing ? product.includes.join('\n') : '');
  const [error, setError] = useState('');

  // The "Included items" box only shows for kits.
  const isKit = category === 'Hygiene kits';

  function handleSubmit(event) {
    event.preventDefault();

    // Inputs give us text, so turn price and stock into numbers.
    const priceNumber = Number(price);
    const stockNumber = Number(stock);

    // A few checks before saving. The server will check these again later.
    if (name.trim() === '' || category === '') {
      setError('Please add a product name and choose a category.');
      return;
    }
    if (!(priceNumber > 0)) {
      setError('Price must be more than $0.');
      return;
    }
    if (!Number.isInteger(stockNumber) || stockNumber < 0) {
      setError('Stock must be a whole number, 0 or more.');
      return;
    }

    // Turn the text box into a list: one item per line, empty lines skipped.
    const includes = includesText
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line !== '');

    onSave({
      id: isEditing ? product.id : null, // App gives new products an id
      name: name.trim(),
      summary: summary.trim(),
      description: description.trim(),
      category: category,
      price: priceNumber,
      stock: stockNumber,
      image: image.trim(),
      includes: isKit ? includes : [],
    });
  }

  return (
    <>
      <h1 className="page-title">{isEditing ? 'Edit product' : 'Add product'}</h1>
      <p className="page-subtitle">Product information appears in your shop.</p>

      <div className="form-layout">
        <form className="form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="product-name">Product name</label>
            <input
              id="product-name"
              type="text"
              placeholder="Enter a product name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="product-summary">Short line for the product card</label>
            <input
              id="product-summary"
              type="text"
              placeholder="For example: Wipes, sanitizer & seat covers"
              value={summary}
              onChange={(event) => setSummary(event.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="product-description">Description</label>
            <textarea
              id="product-description"
              rows="3"
              placeholder="Describe what is included, quantities and intended use."
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="product-category">Category</label>
            <select
              id="product-category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              required
            >
              <option value="">Choose category</option>
              {categories.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="product-price">Price (USD)</label>
              <input
                id="product-price"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="product-stock">Stock</label>
              <input
                id="product-stock"
                type="number"
                min="0"
                step="1"
                placeholder="0"
                value={stock}
                onChange={(event) => setStock(event.target.value)}
                required
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="product-image">Product image</label>
            <p className="field-help">Paste an image link (JPG, PNG or WebP). Uploads come with the server.</p>
            <input
              id="product-image"
              type="text"
              placeholder="Enter image URL"
              value={image}
              onChange={(event) => setImage(event.target.value)}
            />
          </div>

          {/* Only kits have a list of what is inside */}
          {isKit && (
            <div className="field">
              <label htmlFor="product-includes">Included items (kits only)</label>
              <p className="field-help">One item and its quantity per line.</p>
              <textarea
                id="product-includes"
                rows="4"
                placeholder={'e.g. 1 travel pouch\n6 pocket wipes'}
                value={includesText}
                onChange={(event) => setIncludesText(event.target.value)}
              />
            </div>
          )}

          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}

          <div className="form-actions">
            <button className="btn btn-primary" type="submit">
              {isEditing ? 'Save changes' : 'Create product'}
            </button>
            <button className="btn btn-secondary" type="button" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>

        <div>
          {/* Shows the image so the admin can check the link */}
          <div className="image-preview">
            {image ? (
              <img src={image} alt="Product preview" />
            ) : (
              <p className="muted">Preview appears after adding an image URL.</p>
            )}
          </div>
          <p className="small muted">Image preview</p>
        </div>
      </div>
    </>
  );
}
