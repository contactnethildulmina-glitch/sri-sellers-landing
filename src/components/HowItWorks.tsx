const steps = [
  {
    step: '01',
    title: 'Create your account',
    body: 'Register with email and a password. Credentials are hashed with bcrypt — never stored in plaintext.',
  },
  {
    step: '02',
    title: 'Choose a plan',
    body: 'Pick Monthly, Quarterly, or Yearly. Prices and features come from the SQLite plans table via the API.',
  },
  {
    step: '03',
    title: 'Place an order',
    body: 'Authenticated checkout creates a pending order. Mock payment marks it paid from your account page.',
  },
  {
    step: '04',
    title: 'Config (placeholder)',
    body: 'Real VPN server provisioning is out of scope for this demo. A config download slot can be added later.',
  },
]

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-20 border-b border-cream-dark"
      aria-labelledby="how-heading"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-deep">
            How it works
          </p>
          <h2
            id="how-heading"
            className="mt-2 font-display text-3xl font-semibold tracking-tight text-teal sm:text-4xl"
          >
            From signup to subscription
          </h2>
        </div>
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <li
              key={s.step}
              className="rounded-2xl border border-teal/8 bg-white p-5 shadow-sm"
            >
              <span className="font-display text-sm font-bold text-amber-deep">{s.step}</span>
              <h3 className="mt-2 font-display text-lg font-semibold text-teal">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
