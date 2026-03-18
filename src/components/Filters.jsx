const STATUS_OPTIONS = [
  { value: "", label: "All Statuses" },
  { value: "todo", label: "Todo" },
  { value: "in-progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
];

const PRIORITY_OPTIONS = [
  { value: "", label: "All Priorities" },
  { value: "low", label: "Low Priority" },
  { value: "medium", label: "Medium Priority" },
  { value: "high", label: "High Priority" },
];

export default function Filters({
  searchInput,
  onSearchChange,
  selectedFilter,
  onFilterChange,
  selectedPriority,
  onPriorityChange,
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
      {/* Search */}
      <div className="relative flex-1 max-w-sm">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
          </svg>
        </span>
        <input
          type="text"
          value={searchInput}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search tasks..."
          className="w-full bg-[#1a1f2e] border border-[#2a3040] text-white text-sm placeholder-gray-600 rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:border-indigo-500 transition-all duration-200"
        />
        {searchInput && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
          >
            ×
          </button>
        )}
      </div>

      {/* Filter Dropdowns */}
      <div className="flex gap-3">
        {/* Status Dropdown */}
        <select
          value={selectedFilter}
          onChange={(e) => onFilterChange(e.target.value)}
          className="bg-[#1a1f2e] border border-[#2a3040] text-gray-300 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-indigo-500 transition-all duration-200 cursor-pointer min-w-[140px]"
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Priority Dropdown */}
        <select
          value={selectedPriority}
          onChange={(e) => onPriorityChange(e.target.value)}
          className="bg-[#1a1f2e] border border-[#2a3040] text-gray-300 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-indigo-500 transition-all duration-200 cursor-pointer min-w-[140px]"
        >
          {PRIORITY_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
