import { useState } from "react";
import { createTask } from "../api/taskApi";
import { showApiToast } from "../utils/toast";

const TITLE_MAX = 100;
const DESC_MAX = 3000;

const PRIORITY_OPTIONS = [
  { value: "low", label: "🟢 Low" },
  { value: "medium", label: "🟡 Medium" },
  { value: "high", label: "🔴 High" },
];

const initial = { title: "", description: "", priority: "medium" };

export default function TaskForm({ onCreated }) {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = "Title is required.";
    else if (form.title.length > TITLE_MAX)
      errs.title = `Title must be ≤ ${TITLE_MAX} characters.`;
    if (!form.description.trim()) errs.description = "Description is required.";
    else if (form.description.length > DESC_MAX)
      errs.description = `Description must be ≤ ${DESC_MAX} characters.`;
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    try {
      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        priority: form.priority,
      };
      const res = await createTask(payload);
      const { flag, message, data } = res.data;
      showApiToast({ flag, message });
      if (flag === 1) {
        onCreated(data);
        setForm(initial);
        setIsOpen(false);
      }
    } catch {
      showApiToast({ flag: 0, message: "Failed to create task." });
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setForm(initial);
    setErrors({});
  };

  return (
    <>
      {/* Trigger button — always visible */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl shadow-lg shadow-indigo-900/40 transition-all duration-200 text-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
          <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
        </svg>
        New Task
      </button>

      {/* Modal overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.65)", backdropFilter: "blur(4px)" }}
          onMouseDown={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          {/* Modal panel */}
          <div
            className="relative bg-[#1a1f2e] border border-[#2a3040] rounded-2xl p-6 shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.6)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-white font-semibold text-base">Create New Task</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-white transition-colors w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#2a3040]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Title */}
              <div>
                <label className="text-xs text-gray-400 font-medium mb-1.5 block">
                  Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  maxLength={TITLE_MAX + 1}
                  placeholder="Enter task title..."
                  autoFocus
                  className={`w-full bg-[#0f1421] border rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none transition-all duration-200 ${
                    errors.title ? "border-red-500 focus:border-red-400" : "border-[#2a3040] focus:border-indigo-500"
                  }`}
                />
                <div className="flex justify-between mt-1">
                  {errors.title ? (
                    <span className="text-red-400 text-xs">{errors.title}</span>
                  ) : (
                    <span />
                  )}
                  <span className={`text-xs ml-auto ${form.title.length > TITLE_MAX ? "text-red-400" : "text-gray-600"}`}>
                    {form.title.length}/{TITLE_MAX}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-xs text-gray-400 font-medium mb-1.5 block">
                  Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  maxLength={DESC_MAX + 1}
                  rows={4}
                  placeholder="Describe the task..."
                  className={`w-full bg-[#0f1421] border rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none transition-all duration-200 resize-none ${
                    errors.description ? "border-red-500 focus:border-red-400" : "border-[#2a3040] focus:border-indigo-500"
                  }`}
                />
                <div className="flex justify-between mt-1">
                  {errors.description ? (
                    <span className="text-red-400 text-xs">{errors.description}</span>
                  ) : (
                    <span />
                  )}
                  <span className={`text-xs ml-auto ${form.description.length > DESC_MAX ? "text-red-400" : "text-gray-600"}`}>
                    {form.description.length}/{DESC_MAX}
                  </span>
                </div>
              </div>

              {/* Priority */}
              <div>
                <label className="text-xs text-gray-400 font-medium mb-1.5 block">
                  Priority
                </label>
                <select
                  name="priority"
                  value={form.priority}
                  onChange={handleChange}
                  className="w-full bg-[#0f1421] border border-[#2a3040] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all duration-200 cursor-pointer"
                >
                  {PRIORITY_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-2.5 rounded-xl bg-[#2a3040] text-gray-300 hover:bg-[#374151] text-sm font-medium transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white text-sm font-medium transition-all duration-200 shadow-lg shadow-indigo-900/40 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Creating...
                    </>
                  ) : (
                    "Create Task"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
