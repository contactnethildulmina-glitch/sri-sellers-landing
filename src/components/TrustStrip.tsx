const stats = [
  { value: '10 min', label: 'Typical shop setup time', note: 'example' },
  { value: 'LKR', label: 'Prices shown in local currency', note: 'built-in' },
  { value: 'Island-wide', label: 'Designed for sellers across Sri Lanka', note: 'focus' },
]

export function TrustStrip() {
  return (
    <section
      className="border-b border-cream-dark bg-teal"
      aria-labelledby="trust-heading"
    >
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <h2 id="trust-heading" className="sr-only">
          Why sellers choose SRI Sellers
        </h2>
        <p className="mb-6 text-center text-xs font-medium uppercase tracking-wider text-cream/60">
          Example figures for illustration — not live platform metrics
        </p>
        <ul className="grid gap-6 sm:grid-cols-3 sm:gap-8">
          {stats.map((stat) => (
            <li key={stat.label} className="text-center">
              <p className="font-display text-3xl font-semibold text-amber sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-cream/90">{stat.label}</p>
              <p className="mt-1 text-[11px] uppercase tracking-wide text-cream/50">
                {stat.note}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
