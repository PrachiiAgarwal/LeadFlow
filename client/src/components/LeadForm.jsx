import { useState } from "react";
import { createLead } from "../services/leadApi";

const budgetOptions = [
  "₹25k – ₹50k",
  "₹50k – ₹1L",
  "₹1L – ₹2L",
  "₹2L+",
];

const initialState = {
  name: "",
  email: "",
  budget: "",
  message: "",
};

function LeadForm() {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [serverError, setServerError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));

    setSuccess("");
    setServerError("");
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must contain at least 2 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!budgetOptions.includes(formData.budget)) {
      newErrors.budget = "Select your project budget.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Tell us about your project.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message =
        "Please provide at least 10 characters.";
    } else if (formData.message.length > 500) {
      newErrors.message =
        "Project details cannot exceed 500 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSuccess("");
    setServerError("");

    if (!validate()) {
      return;
    }

    try {
      setLoading(true);

      await createLead({
        name: formData.name.trim(),
        email: formData.email.trim(),
        budget: formData.budget,
        message: formData.message.trim(),
      });

      setSuccess(
        "Project enquiry received. We'll get back to you soon."
      );

      setFormData(initialState);
      setErrors({});
    } catch (error) {
      setServerError(
        error.response?.data?.message ||
          "We couldn't submit your enquiry. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field) =>
    `mt-2 w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4 ${
      errors[field]
        ? "border-red-300 focus:border-red-400 focus:ring-red-100"
        : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
    }`;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60 sm:p-8"
    >
      {success && (
        <div
          role="status"
          className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4"
        >
          <div className="flex gap-3">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
              ✓
            </div>

            <div>
              <p className="font-semibold text-emerald-800">
                Enquiry submitted
              </p>

              <p className="mt-1 text-sm leading-5 text-emerald-700">
                {success}
              </p>
            </div>
          </div>
        </div>
      )}

      {serverError && (
        <div
          role="alert"
          className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700"
        >
          {serverError}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="text-sm font-semibold text-slate-700"
          >
            Your name
          </label>

          <input
            id="name"
            type="text"
            name="name"
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className={inputClass("name")}
          />

          {errors.name && (
            <p className="mt-1.5 text-xs font-medium text-red-600">
              {errors.name}
            </p>
          )}
        </div>

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
            placeholder="john@example.com"
            className={inputClass("email")}
          />

          {errors.email && (
            <p className="mt-1.5 text-xs font-medium text-red-600">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5">
        <label
          htmlFor="budget"
          className="text-sm font-semibold text-slate-700"
        >
          Project budget
        </label>

        <select
          id="budget"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          className={inputClass("budget")}
        >
          <option value="">Select a budget range</option>

          {budgetOptions.map((budget) => (
            <option key={budget} value={budget}>
              {budget}
            </option>
          ))}
        </select>

        {errors.budget && (
          <p className="mt-1.5 text-xs font-medium text-red-600">
            {errors.budget}
          </p>
        )}
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between gap-4">
          <label
            htmlFor="message"
            className="text-sm font-semibold text-slate-700"
          >
            Tell us about your project
          </label>

          <span
            className={`text-xs ${
              formData.message.length > 500
                ? "font-semibold text-red-600"
                : "text-slate-400"
            }`}
          >
            {formData.message.length}/500
          </span>
        </div>

        <textarea
          id="message"
          name="message"
          rows="6"
          value={formData.message}
          onChange={handleChange}
          placeholder="What are you looking to build? Share your goals, requirements and timeline..."
          className={`${inputClass(
            "message"
          )} min-h-36 resize-y`}
        />

        {errors.message && (
          <p className="mt-1.5 text-xs font-medium text-red-600">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/15 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-400 disabled:shadow-none"
      >
        {loading ? (
          <>
            <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            Submitting...
          </>
        ) : (
          <>
            Send Project Enquiry
            <span className="ml-2">→</span>
          </>
        )}
      </button>

      <p className="mt-4 text-center text-xs leading-5 text-slate-400">
        Your details are used only to respond to this project enquiry.
      </p>
    </form>
  );
}

export default LeadForm;