import { useEffect } from "react";

export default function DeleteConfirmModal({ taskTitle, onConfirm, onCancel }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onCancel]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
      onClick={onCancel}
    >
      <div
        className="bg-[#161b2a] border border-[#3f1f1f] rounded-2xl w-full max-w-sm p-6 shadow-2xl"
        style={{ boxShadow: "0 20px 60px rgba(239,68,68,0.2)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-red-900/30 border border-red-500/40 flex items-center justify-center text-2xl">
            🗑️
          </div>
        </div>

        <h3 className="text-white font-semibold text-center text-base mb-2">
          Delete Task
        </h3>
        <p className="text-gray-400 text-sm text-center mb-1">
          Are you sure you want to delete
        </p>
        <p className="text-red-400 text-sm font-medium text-center truncate mb-5 px-4">
          "{taskTitle}"?
        </p>
        <p className="text-gray-500 text-xs text-center mb-6">
          This action cannot be undone.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-[#2a3040] text-gray-300 hover:bg-[#374151] transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-red-600 hover:bg-red-500 text-white transition-all duration-200 shadow-lg shadow-red-900/40"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
