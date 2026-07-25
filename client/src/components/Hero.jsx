function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />

      {/* NAVBAR */}
      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-6 sm:px-6 lg:px-8">
        <a
          href="/"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Lead<span className="text-blue-400">Flow</span>
        </a>

        <a
          href="/admin"
          className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10 hover:text-white"
        >
          Admin
        </a>
      </nav>

      {/* HERO */}
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-12 sm:px-6 sm:pb-24 sm:pt-16 lg:grid-cols-2 lg:px-8 lg:pb-28 lg:pt-20">
        {/* LEFT */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1.5 text-xs font-semibold text-blue-300 sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-blue-400" />
            Simple lead management for digital teams
          </div>

          <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl lg:leading-[1.08]">
            Turn project enquiries into
            <span className="text-blue-400"> real opportunities.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
            Capture project requirements, understand budgets and keep every
            potential client organised through one simple lead pipeline.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#project-form"
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
            >
              Start Your Project
              <span className="ml-2">→</span>
            </a>

            <a
              href="/admin"
              className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900 px-6 py-3.5 text-sm font-semibold text-slate-200 transition hover:border-slate-600 hover:bg-slate-800"
            >
              View Dashboard
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-400">
            <span>✓ Quick enquiry</span>
            <span>✓ Clear budgets</span>
            <span>✓ Track every lead</span>
          </div>
        </div>

        {/* RIGHT — PIPELINE PREVIEW */}
        <div className="relative mx-auto w-full max-w-lg lg:mx-0 lg:ml-auto">
          <div className="absolute -inset-3 rounded-3xl bg-blue-500/10 blur-xl" />

          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/90 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div>
                <p className="text-sm font-semibold text-white">
                  Lead Pipeline
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Today's project enquiries
                </p>
              </div>

              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-slate-600" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-600" />
                <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
              </div>
            </div>

            <div className="space-y-3 p-4 sm:p-5">
              <div className="rounded-2xl border border-white/10 bg-slate-800/80 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-white">
                      Website Redesign
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Growth Studio
                    </p>
                  </div>

                  <span className="rounded-full bg-blue-500/15 px-2.5 py-1 text-xs font-semibold text-blue-300">
                    New
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Budget</span>
                  <span className="font-medium text-slate-300">
                    ₹1L – ₹2L
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-800/80 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-white">
                      E-commerce Platform
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Northstar Retail
                    </p>
                  </div>

                  <span className="rounded-full bg-amber-500/15 px-2.5 py-1 text-xs font-semibold text-amber-300">
                    Contacted
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Budget</span>
                  <span className="font-medium text-slate-300">
                    ₹2L+
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-emerald-500/10 bg-emerald-500/5 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400">
                      Pipeline overview
                    </p>

                    <p className="mt-1 text-lg font-bold text-white">
                      Every enquiry. One place.
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                    ✓
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;