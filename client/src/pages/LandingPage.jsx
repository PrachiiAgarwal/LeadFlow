import Hero from "../components/Hero";
import LeadForm from "../components/LeadForm";
import Footer from "../components/Footer";

function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Hero />

      <main>
        {/* INTRO / FORM */}
        <section
          id="project-form"
          className="scroll-mt-8 px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
        >
          <div className="mx-auto max-w-6xl">
            <div className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              {/* LEFT INFORMATION */}
              <div className="lg:sticky lg:top-10">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
                  Start a conversation
                </p>

                <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                  Have a project in mind?
                </h2>

                <p className="mt-5 max-w-lg text-base leading-7 text-slate-600">
                  Share the essentials and your enquiry will be added
                  directly to our project pipeline for review.
                </p>

                <div className="mt-8 space-y-5">
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-700">
                      1
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-900">
                        Tell us what you need
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        Give us a short overview of your project and goals.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-700">
                      2
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-900">
                        Select your budget
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        A budget range helps us understand the right scope.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-700">
                      3
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-900">
                        We review your enquiry
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        Your enquiry enters LeadFlow where it can be tracked
                        from new lead to closure.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FORM */}
              <LeadForm />
            </div>
          </div>
        </section>

        {/* SIMPLE FEATURE STRIP */}
        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:grid-cols-3 sm:px-6 lg:px-8">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Structured enquiries
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Capture the information needed to evaluate a project quickly.
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-900">
                Simple pipeline
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Move leads between New, Contacted and Closed statuses.
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-900">
                Searchable dashboard
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Find enquiries quickly by client, email or project details.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default LandingPage;