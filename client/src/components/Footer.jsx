function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 border-b border-white/10 pb-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <a
              href="/"
              className="text-xl font-bold tracking-tight text-white"
            >
              Lead<span className="text-blue-400">Flow</span>
            </a>

            <p className="mt-2 max-w-md text-sm leading-6">
              A simple lead capture and management workflow for digital
              project enquiries.
            </p>
          </div>

          <div className="flex gap-5 text-sm">
            <a
              href="/"
              className="transition hover:text-white"
            >
              Website
            </a>

            <a
              href="/admin"
              className="transition hover:text-white"
            >
              Dashboard
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 LeadFlow</p>

          <a
            href="https://digitalheroesco.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-blue-400 transition hover:text-blue-300"
          >
            Built for Digital Heroes Training Task
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;