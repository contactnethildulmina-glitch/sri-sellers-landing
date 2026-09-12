const steps = [
  {
    step: '01',
    title: 'Create your shop',
    body: 'Sign up, name your store, and add a short about section so buyers know who you are.',
  },
  {
    step: '02',
    title: 'Add your products',
    body: 'Upload photos, set LKR prices, and organise items into simple categories.',
  },
  {
    step: '03',
    title: 'Share and sell',
    body: 'Share your shop link on WhatsApp, social media, or with walk-in customers — and keep listings updated.',
  },
]

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-20 border-b border-cream-dark bg-cream-dark/40"
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
            Three steps from idea to shopfront
          </h2>
          <p className="mt-4 text-base text-ink-muted sm:text-lg">
            A simple path designed for busy sellers — not developers.
          </p>
        </div>

        <ol className="mt-12 grid gap-6 lg:grid-cols-3">
          {steps.map((item, index) => (
            <li
              key={item.step}
              className="relative rounded-2xl border border-teal/8 bg-white p-6 sm:p-8"
            >
              <span className="font-display text-4xl font-semibold text-amber/80">
                {item.step}
              </span>
              <h3 className="mt-3 font-display text-xl font-semibold text-teal">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.body}</p>
              {index < steps.length - 1 && (
                <span
                  className="absolute -right-3 top-1/2 hidden h-0.5 w-6 -translate-y-1/2 bg-teal/15 lg:block"
                  aria-hidden="true"
                />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
