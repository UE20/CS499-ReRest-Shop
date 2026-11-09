// One line in a price box: the label on the left and the amount on the right.
// isTotal makes the line bigger and adds a line above it.
export default function SummaryRow({ label, value, isTotal }) {
  return (
    <div className={isTotal ? 'summary-row summary-total' : 'summary-row'}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
