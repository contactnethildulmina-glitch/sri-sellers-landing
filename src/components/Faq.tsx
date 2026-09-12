const faqs = [
  {
    q: 'Is this a real VPN network?',
    a: 'This project is a sales storefront with a real SQLite database for customers, plans, and orders. It does not provision VPN servers or issue live configs yet.',
  },
  {
    q: 'How does payment work?',
    a: 'Orders are created as pending. A mock “Mark as paid” action on your account simulates manual payment confirmation — no card gateway is required for the demo.',
  },
  {
    q: 'Will GitHub Pages run the API?',
    a: 'No. GitHub Pages hosts the static marketing frontend only. Run the Node server locally (or on any host) for full register / login / order flows.',
  },
  {
    q: 'Are passwords stored safely?',
    a: 'Yes. Passwords are hashed with bcrypt before insert. Protected routes require a JWT Bearer token.',
  },
]

export function Faq() {
  return (
    <section
      id="faq"
      className="scroll-mt-20 border-b border-cream-dark"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-deep">FAQ</p>
          <h2
            id="faq-heading"
            className="mt-2 font-display text-3xl font-semibold tracking-tight text-teal sm:text-4xl"
          >
            Common questions
          </h2>
        </div>
        <ul className="mt-10 space-y-4">
          {faqs.map((item) => (
            <li
              key={item.q}
              className="rounded-2xl border border-teal/10 bg-white px-5 py-4 shadow-sm"
            >
              <h3 className="font-display text-base font-semibold text-teal">{item.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.a}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
