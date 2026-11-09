// Pop-up that shows after a product is added to the bag.
import Modal from './Modal';

export default function AddedToBagModal({ productName, onViewBag, onClose }) {
  return (
    <Modal title="Added to bag" onClose={onClose}>
      <p className="muted">{productName} is in your bag.</p>
      {/* Go to the bag or keep shopping */}
      <div className="modal-actions">
        <button className="btn btn-primary" onClick={onViewBag}>
          View bag
        </button>
        <button className="btn btn-secondary" onClick={onClose}>
          Continue shopping
        </button>
      </div>
    </Modal>
  );
}
