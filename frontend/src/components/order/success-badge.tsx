const SEAL_POINTS = Array.from({ length: 24 }, (_, i) => {
  const radius = i % 2 === 0 ? 30 : 26.5;
  const angle = (Math.PI / 12) * i - Math.PI / 2;
  return `${(32 + radius * Math.cos(angle)).toFixed(2)},${(32 + radius * Math.sin(angle)).toFixed(2)}`;
}).join(" ");

export function SuccessBadge() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="size-15">
      <polygon points={SEAL_POINTS} fill="#4caf50" stroke="#4caf50" strokeWidth="3" strokeLinejoin="round" />
      <path d="M21 33l7.5 7.5L43 25" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
