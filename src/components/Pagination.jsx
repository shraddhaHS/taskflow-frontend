const PAGE_SIZE_OPTIONS = [10, 25, 50];

export default function Pagination({
  currentPage,
  totalPages,
  limit,
  totalCount,
  onPageChange,
  onLimitChange,
}) {
  const start = totalCount === 0 ? 0 : (currentPage - 1) * limit + 1;
  const end = Math.min(currentPage * limit, totalCount);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-5 border-t border-[#2a3040]">
      {/* Info */}
      <div className="text-sm text-gray-500">
        {totalCount > 0 ? (
          <>
            Showing{" "}
            <span className="text-gray-300 font-medium">{start}–{end}</span>{" "}
            of{" "}
            <span className="text-gray-300 font-medium">{totalCount}</span>{" "}
            tasks
          </>
        ) : (
          <span>No tasks</span>
        )}
      </div>

      <div className="flex items-center gap-3">
        {/* Page size */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Rows:</span>
          <select
            value={limit}
            onChange={(e) => onLimitChange(Number(e.target.value))}
            className="bg-[#1a1f2e] border border-[#2a3040] text-gray-300 text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:border-indigo-500 cursor-pointer transition-all"
          >
            {PAGE_SIZE_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Page controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#2a3040] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 text-sm"
            title="First page"
          >
            «
          </button>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#2a3040] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 text-sm"
            title="Previous page"
          >
            ‹
          </button>

          {/* Page number indicator */}
          <div className="flex items-center gap-1 px-2">
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let page;
              if (totalPages <= 5) {
                page = i + 1;
              } else if (currentPage <= 3) {
                page = i + 1;
              } else if (currentPage >= totalPages - 2) {
                page = totalPages - 4 + i;
              } else {
                page = currentPage - 2 + i;
              }
              return (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  className={`w-8 h-8 rounded-lg text-xs font-medium transition-all duration-200 ${
                    page === currentPage
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/40"
                      : "text-gray-400 hover:text-white hover:bg-[#2a3040]"
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#2a3040] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 text-sm"
            title="Next page"
          >
            ›
          </button>
          <button
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages || totalPages === 0}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#2a3040] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 text-sm"
            title="Last page"
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
}
