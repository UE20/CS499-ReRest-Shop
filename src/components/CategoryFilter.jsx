// The row of category buttons on the catalog page.
// The selected one is navy. "All products" shows everything.
export default function CategoryFilter({ categories, selected, onSelect }) {
  // Put "All products" first, then the real categories.
  const options = ['All products', ...categories];

  return (
    <div className="pills" role="group" aria-label="Categories">
      {options.map((option) => (
        <button
          key={option}
          className={option === selected ? 'pill pill-active' : 'pill'}
          aria-pressed={option === selected}
          onClick={() => onSelect(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
