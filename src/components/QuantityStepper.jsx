// The "−  1  +" control used on the product page and in the bag.
// It never goes below 1 or above the stock we have.
export default function QuantityStepper({ value, max, onChange }) {
  return (
    <div className="stepper">
      <button
        className="stepper-button"
        onClick={() => onChange(value - 1)}
        disabled={value <= 1}
        aria-label="Decrease quantity"
      >
        −
      </button>
      {/* The current number */}
      <span className="stepper-value" aria-live="polite">
        {value}
      </span>
      <button
        className="stepper-button"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
