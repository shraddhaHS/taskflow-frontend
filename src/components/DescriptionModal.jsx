import { useEffect } from "react";

export default function DescriptionModal({ description, onClose }) {
  // Close on ESC key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        className="relative bg-[#161b2a] border border-[#2a3040] rounded-2xl w-full max-w-xl max-h-[80vh] flex flex-col shadow-2xl"
        style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.6)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2a3040]">
          <h2 className="text-base font-semibold text-white tracking-wide">
            Full Description
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors duration-200 text-xl leading-none rounded-full w-8 h-8 flex items-center justify-center hover:bg-[#2a3040]"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto px-6 py-5 flex-1">
          <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
            {description}
          </p>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#2a3040] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-sm rounded-lg bg-[#2a3040] text-gray-300 hover:bg-[#374151] transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
