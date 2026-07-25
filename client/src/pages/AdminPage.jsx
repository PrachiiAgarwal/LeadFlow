import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getLeads,
  updateLeadStatus,
} from "../services/leadApi";

import LeadStats from "../components/LeadStats";
import SearchBar from "../components/SearchBar";
import LeadTable from "../components/LeadTable";

function AdminPage() {
  const navigate = useNavigate();

  const [leads, setLeads] = useState([]);
  const [allLeads, setAllLeads] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [updatingLeadId, setUpdatingLeadId] =
    useState(null);

  const [statusError, setStatusError] =
    useState("");

  let admin = null;

  try {
    const storedAdmin =
      localStorage.getItem("leadflow_admin");

    if (storedAdmin) {
      admin = JSON.parse(storedAdmin);
    }
  } catch {
    admin = null;
  }

  useEffect(() => {
    fetchAllLeads();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchDisplayedLeads();
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const fetchAllLeads = async () => {
    try {
      const response = await getLeads("");

      setAllLeads(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDisplayedLeads = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getLeads(search);

      setLeads(response.data.data);
    } catch (error) {
      console.error(error);

      if (error.response?.status !== 401) {
        setError(
          error.response?.data?.message ||
            "Unable to load leads. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (
    leadId,
    newStatus
  ) => {
    try {
      setUpdatingLeadId(leadId);
      setStatusError("");

      const response = await updateLeadStatus(
        leadId,
        newStatus
      );

      const updatedLead = response.data.data;

      setLeads((currentLeads) =>
        currentLeads.map((lead) =>
          lead._id === leadId
            ? updatedLead
            : lead
        )
      );

      setAllLeads((currentLeads) =>
        currentLeads.map((lead) =>
          lead._id === leadId
            ? updatedLead
            : lead
        )
      );
    } catch (error) {
      console.error(error);

      if (error.response?.status !== 401) {
        setStatusError(
          error.response?.data?.message ||
            "Status update failed. Please try again."
        );

        await fetchDisplayedLeads();
        await fetchAllLeads();
      }
    } finally {
      setUpdatingLeadId(null);
    }
  };

  const handleRetry = async () => {
    await fetchDisplayedLeads();
    await fetchAllLeads();
  };

  const handleLogout = () => {
    localStorage.removeItem("leadflow_token");
    localStorage.removeItem("leadflow_admin");

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="min-w-0">
            <a
              href="/"
              className="text-xl font-bold tracking-tight text-slate-900"
            >
              Lead
              <span className="text-blue-600">
                Flow
              </span>
            </a>

            {admin?.name && (
              <p className="mt-1 hidden truncate text-xs text-slate-500 sm:block">
                Signed in as {admin.name}
              </p>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href="/"
              className="hidden rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 sm:inline-flex"
            >
              View Website
            </a>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Workspace
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Admin Dashboard
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Review incoming project enquiries and
            track every lead through your pipeline.
          </p>
        </div>

        <LeadStats leads={allLeads} />

        <div className="mt-8">
          <SearchBar
            search={search}
            setSearch={setSearch}
          />
        </div>

        {statusError && (
          <div className="mt-5 flex items-start justify-between gap-4 rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-medium text-red-700">
              {statusError}
            </p>

            <button
              type="button"
              onClick={() =>
                setStatusError("")
              }
              className="shrink-0 text-sm font-bold text-red-600"
            >
              ×
            </button>
          </div>
        )}

        <section className="mt-6">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Leads
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {search
                  ? `Results for "${search}"`
                  : "Newest enquiries appear first."}
              </p>
            </div>

            {!loading && (
              <p className="shrink-0 text-sm text-slate-500">
                {leads.length}{" "}
                {leads.length === 1
                  ? "lead"
                  : "leads"}
              </p>
            )}
          </div>

          {error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
              <p className="font-medium text-red-700">
                Couldn't load leads
              </p>

              <p className="mt-1 text-sm text-red-600">
                {error}
              </p>

              <button
                type="button"
                onClick={handleRetry}
                className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Try Again
              </button>
            </div>
          ) : loading ? (
            <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-16 animate-pulse rounded-xl bg-slate-100"
                />
              ))}
            </div>
          ) : (
            <LeadTable
              leads={leads}
              onStatusChange={
                handleStatusChange
              }
              updatingLeadId={
                updatingLeadId
              }
            />
          )}
        </section>
      </main>
    </div>
  );
}

export default AdminPage;