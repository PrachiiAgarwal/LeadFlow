import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginAdmin } from "../services/leadApi";

function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("leadflow_token");

    if (token) {
      navigate("/admin", {
        replace: true,
      });
    }
  }, [navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = formData.email.trim();
    const password = formData.password;

    if (!email || !password) {
      setError("Enter your email and password.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await loginAdmin({
        email,
        password,
      });

      localStorage.setItem(
        "leadflow_token",
        response.data.token
      );

      localStorage.setItem(
        "leadflow_admin",
        JSON.stringify(response.data.admin)
      );

      navigate("/admin", {
        replace: true,
      });
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to log in. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* LEFT */}
        <div className="hidden border-r border-white/10 lg:flex lg:flex-col lg:justify-between lg:p-12">
          <a
            href="/"
            className="text-2xl font-bold tracking-tight text-white"
          >
            Lead<span className="text-blue-400">Flow</span>
          </a>

          <div className="max-w-lg">
            <div className="inline-flex rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1.5 text-sm font-semibold text-blue-300">
              Admin Workspace
            </div>

            <h1 className="mt-6 text-5xl font-bold leading-tight tracking-tight text-white">
              Keep every opportunity
              <span className="text-blue-400"> moving forward.</span>
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-400">
              Review project enquiries, search your pipeline and manage
              lead status from one protected workspace.
            </p>
          </div>

          <p className="text-sm text-slate-600">
            LeadFlow Admin
          </p>
        </div>

        {/* LOGIN */}
        <div className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
          <div className="w-full max-w-md">
            <div className="mb-10 lg:hidden">
              <a
                href="/"
                className="text-2xl font-bold tracking-tight text-white"
              >
                Lead<span className="text-blue-400">Flow</span>
              </a>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-8">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-600">
                  Secure access
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
                  Admin login
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Sign in to access the LeadFlow management dashboard.
                </p>
              </div>

              {error && (
                <div
                  role="alert"
                  className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700"
                >
                  {error}
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="mt-7"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Email address
                  </label>

                  <input
                    id="email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="admin@example.com"
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div className="mt-5">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Password
                  </label>

                  <input
                    id="password"
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-6 flex w-full items-center justify-center rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-400 disabled:shadow-none"
                >
                  {loading ? (
                    <>
                      <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Signing in...
                    </>
                  ) : (
                    "Sign in to Dashboard"
                  )}
                </button>
              </form>

              <div className="mt-6 border-t border-slate-100 pt-6 text-center">
                <a
                  href="/"
                  className="text-sm font-medium text-slate-500 transition hover:text-blue-600"
                >
                  ← Return to website
                </a>
              </div>
            </div>

            <p className="mt-6 text-center text-xs text-slate-600">
              Administrative access only
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;