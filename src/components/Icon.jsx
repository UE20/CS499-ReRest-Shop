// Small line icons used around the shop (same style as the ReRest icons).
// They use "currentColor", so each icon takes the text color of its button.

// The SVG lines for each icon, saved by name, so I can write <Icon name="bag" />.
const iconPaths = {
  bag: (
    <>
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </>
  ),
  login: (
    <>
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <path d="m10 17 5-5-5-5" />
      <path d="M15 12H3" />
    </>
  ),
  logout: (
    <>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="m16 17 5-5-5-5" />
      <path d="M21 12H9" />
    </>
  ),
  chevronDown: <path d="m6 9 6 6 6-6" />,
  receipt: (
    <>
      <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 20 6v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6Z" />
      <path d="m8.5 12 2.5 2.5 4.5-5" />
    </>
  ),
  store: (
    <>
      <path d="M3 9.5 4.6 4.2A1.7 1.7 0 0 1 6.2 3h11.6a1.7 1.7 0 0 1 1.6 1.2L21 9.5" />
      <path d="M3 9.5c0 1.5 1.2 2.5 2.6 2.5s2.6-1 2.6-2.5c0 1.5 1.2 2.5 2.6 2.5h2.4c1.4 0 2.6-1 2.6-2.5 0 1.5 1.2 2.5 2.6 2.5S21 11 21 9.5" />
      <path d="M5 12v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-8" />
      <path d="M10 21v-5h4v5" />
    </>
  ),
};

// size is 22 if we do not pass one.
export default function Icon({ name, size = 22 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {iconPaths[name]}
    </svg>
  );
}
