function LeadStats({ leads }) {
  const total = leads.length;

  const newLeads = leads.filter(
    (lead) => lead.status === "New"
  ).length;

  const contactedLeads = leads.filter(
    (lead) => lead.status === "Contacted"
  ).length;

  const closedLeads = leads.filter(
    (lead) => lead.status === "Closed"
  ).length;

  const cards = [
    {
      label: "Total Leads",
      value: total,
      icon: "↗",
      iconStyle: "bg-slate-900 text-white",
    },
    {
      label: "New",
      value: newLeads,
      icon: "●",
      iconStyle: "bg-blue-100 text-blue-600",
    },
    {
      label: "Contacted",
      value: contactedLeads,
      icon: "✓",
      iconStyle: "bg-amber-100 text-amber-600",
    },
    {
      label: "Closed",
      value: closedLeads,
      icon: "✓",
      iconStyle: "bg-emerald-100 text-emerald-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-medium text-slate-500 sm:text-sm">
                {card.label}
              </p>

              <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                {card.value}
              </p>
            </div>

            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${card.iconStyle}`}
            >
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LeadStats;