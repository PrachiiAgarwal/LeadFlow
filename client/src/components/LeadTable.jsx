function LeadTable({
  leads,
  onStatusChange,
  updatingLeadId,
}) {
  if (leads.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-xl">
          ↗
        </div>

        <h2 className="mt-4 text-lg font-semibold text-slate-900">
          No leads found
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Try a different search or submit a new project enquiry.
        </p>
      </div>
    );
  }

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const getStatusStyle = (status) => {
    if (status === "New") {
      return "border-blue-200 bg-blue-50 text-blue-700";
    }

    if (status === "Contacted") {
      return "border-amber-200 bg-amber-50 text-amber-700";
    }

    if (status === "Closed") {
      return "border-emerald-200 bg-emerald-50 text-emerald-700";
    }

    return "border-slate-200 bg-slate-50 text-slate-700";
  };

  return (
    <>
      {/* DESKTOP / TABLET */}
      <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px]">
            <thead className="bg-slate-50">
              <tr className="border-b border-slate-200">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Lead
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Budget
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Message
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Created
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {leads.map((lead) => {
                const updating = updatingLeadId === lead._id;

                return (
                  <tr
                    key={lead._id}
                    className="transition hover:bg-slate-50"
                  >
                    <td className="px-6 py-5">
                      <p className="font-semibold text-slate-900">
                        {lead.name}
                      </p>

                      <a
                        href={`mailto:${lead.email}`}
                        className="mt-1 block text-sm text-blue-600 hover:underline"
                      >
                        {lead.email}
                      </a>
                    </td>

                    <td className="whitespace-nowrap px-6 py-5 text-sm font-medium text-slate-700">
                      {lead.budget}
                    </td>

                    <td className="max-w-xs px-6 py-5">
                      <p
                        className="truncate text-sm text-slate-600"
                        title={lead.message}
                      >
                        {lead.message}
                      </p>
                    </td>

                    <td className="whitespace-nowrap px-6 py-5">
                      <select
                        value={lead.status}
                        disabled={updating}
                        onChange={(event) =>
                          onStatusChange(
                            lead._id,
                            event.target.value
                          )
                        }
                        className={`cursor-pointer rounded-lg border px-3 py-2 text-sm font-semibold outline-none transition focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-60 ${getStatusStyle(
                          lead.status
                        )}`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">
                          Contacted
                        </option>
                        <option value="Closed">Closed</option>
                      </select>

                      {updating && (
                        <p className="mt-1 text-xs text-slate-400">
                          Updating...
                        </p>
                      )}
                    </td>

                    <td className="whitespace-nowrap px-6 py-5 text-sm text-slate-500">
                      {formatDate(lead.createdAt)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* MOBILE */}
      <div className="space-y-4 md:hidden">
        {leads.map((lead) => {
          const updating = updatingLeadId === lead._id;

          return (
            <article
              key={lead._id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div>
                <h3 className="break-words font-semibold text-slate-900">
                  {lead.name}
                </h3>

                <a
                  href={`mailto:${lead.email}`}
                  className="mt-1 block break-all text-sm text-blue-600"
                >
                  {lead.email}
                </a>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4 border-y border-slate-100 py-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Budget
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {lead.budget}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Created
                  </p>

                  <p className="mt-1 text-sm text-slate-700">
                    {formatDate(lead.createdAt)}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Message
                </p>

                <p className="mt-2 break-words text-sm leading-6 text-slate-600">
                  {lead.message}
                </p>
              </div>

              <div className="mt-5">
                <label
                  htmlFor={`status-${lead._id}`}
                  className="text-xs font-medium uppercase tracking-wide text-slate-400"
                >
                  Status
                </label>

                <select
                  id={`status-${lead._id}`}
                  value={lead.status}
                  disabled={updating}
                  onChange={(event) =>
                    onStatusChange(
                      lead._id,
                      event.target.value
                    )
                  }
                  className={`mt-2 w-full rounded-xl border px-4 py-3 text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-60 ${getStatusStyle(
                    lead.status
                  )}`}
                >
                  <option value="New">New</option>
                  <option value="Contacted">
                    Contacted
                  </option>
                  <option value="Closed">Closed</option>
                </select>

                {updating && (
                  <p className="mt-2 text-xs text-slate-500">
                    Updating status...
                  </p>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}

export default LeadTable;