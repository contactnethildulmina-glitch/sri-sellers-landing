const audiences = [
  {
    title: 'Home-based makers',
    body: 'Bakers, craftspeople, and cottage brands who need a clean link to share orders and catalogues.',
  },
  {
    title: 'Retail shops & boutiques',
    body: 'Brick-and-mortar stores ready to list bestsellers online without rebuilding their whole business.',
  },
  {
    title: 'Regional wholesalers',
    body: 'Traders outside Colombo who want island-wide reach with clear pricing and product details.',
  },
  {
    title: 'Growing SMEs',
    body: 'Teams expanding from Instagram DMs to a dedicated shop they can manage and update easily.',
  },
]

export function WhoItsFor() {
  return (
    <section
      id="who-its-for"
      className="scroll-mt-20 border-b border-cream-dark"
      aria-labelledby="audience-heading"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16 lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-deep">
              Who it’s for
            </p>
            <h2
              id="audience-heading"
              className="mt-2 font-display text-3xl font-semibold tracking-tight text-teal sm:text-4xl"
            >
              Built for the sellers who keep Sri Lanka’s markets moving
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
              Whether you sell from a stall, a storefront, or your kitchen table — SRI
              Sellers gives you a professional shop without the complexity of enterprise
              platforms.
            </p>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {audiences.map((item) => (
              <li
                key={item.title}
                className="rounded-2xl border border-teal/8 bg-white p-5 shadow-sm"
              >
                <h3 className="font-display text-lg font-semibold text-teal">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
