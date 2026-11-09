// A pop-up box on top of the page.
// Whatever we put between <Modal> and </Modal> comes in as "children".
export default function Modal({ title, onClose, children }) {
  function handleBackgroundClick(event) {
    // Only close when the dark area is clicked, not the white box.
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <div className="modal-background" onClick={handleBackgroundClick}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <h2 className="modal-title" id="modal-title">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}
