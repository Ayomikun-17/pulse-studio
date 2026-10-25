
export default function QuantityStepper({ value, onChange }) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => onChange(Math.max(0, value - 1))}
        className="h-9 w-9 rounded-lg border border-slate-300 font-bold hover:bg-slate-100"
        aria-label="Decrease quantity"
      >
        −
      </button>

      <span className="min-w-6 text-center font-semibold" aria-live="polite">
        {value}
      </span>

      <button
        type="button"
        onClick={() => onChange(value + 1)}
        className="h-9 w-9 rounded-lg bg-slate-950 font-bold text-white hover:bg-slate-800"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
