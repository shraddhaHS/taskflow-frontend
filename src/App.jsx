import { useState, useEffect, useCallback } from "react";
import { Toaster } from "react-hot-toast";
import { fetchTasks } from "./api/taskApi";
import { showApiToast, shrinkBarKeyframe } from "./utils/toast";
import { useDebounce } from "./hooks/useDebounce";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Filters from "./components/Filters";
import Pagination from "./components/Pagination";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // Filter & search state
  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [searchInput, setSearchInput] = useState("");

  // Debounced search (300ms)
  const debouncedSearch = useDebounce(searchInput, 300);

  const totalPages = Math.max(1, Math.ceil(totalCount / limit));

  // ─── Fetch Tasks ────────────────────────────────────────────
  const loadTasks = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        limit,
      };
      if (selectedFilter) params.status = selectedFilter;
      if (selectedPriority) params.priority = selectedPriority;
      const trimmedSearch = debouncedSearch.trim();
      if (trimmedSearch) params.search = trimmedSearch;

      const res = await fetchTasks(params);
      const { flag, message, data } = res.data;

      if (flag === 1) {
        setTasks(data.tasks || []);
        setTotalCount(data.pagination.totalTasks || 0);
      } else {
        showApiToast({ flag, message });
      }
    } catch {
      showApiToast({ flag: 0, message: "Failed to load tasks." });
    } finally {
      setLoading(false);
    }
  }, [currentPage, limit, selectedFilter, selectedPriority, debouncedSearch]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  // ─── Filter change → reset to page 1 ──────────────────────
  const handleFilterChange = (value) => {
    setSelectedFilter(value);
    setCurrentPage(1);
  };

  // ─── Priority change → reset to page 1 ────────────────────
  const handlePriorityChange = (value) => {
    setSelectedPriority(value);
    setCurrentPage(1);
  };

  // ─── Search change → reset to page 1 ──────────────────────
  const handleSearchChange = (value) => {
    setSearchInput(value);
    setCurrentPage(1);
  };

  // ─── Limit change → reset to page 1 ──────────────────────
  const handleLimitChange = (value) => {
    setLimit(value);
    setCurrentPage(1);
  };

  // ─── CRUD Callbacks ────────────────────────────────────────
  const handleTaskCreated = (newTask) => {
    // Re-fetch to reflect proper pagination
    loadTasks();
  };

  const handleTaskDeleted = (deletedId) => {
    setTasks((prev) => prev.filter((t) => (t.id || t._id) !== deletedId));
    setTotalCount((prev) => Math.max(0, prev - 1));
  };

  const handleTaskUpdated = (updatedTask) => {
    if (!updatedTask) return;
    // If filtering by status, remove card from current view if status changed
    setTasks((prev) =>
      prev.map((t) =>
        (t.id || t._id) === (updatedTask.id || updatedTask._id) ? updatedTask : t
      )
    );
  };

  return (
    <>
      {/* Inject keyframes for toast bar animation */}
      <style>{shrinkBarKeyframe}</style>

      {/* Toast container */}
      <Toaster
        position="top-right"
        gutter={10}
        containerStyle={{ top: 20, right: 20 }}
        toastOptions={{ style: { maxWidth: 380 } }}
      />

      <div className="min-h-screen bg-[#0a0d17] text-white">
        {/* ── Sidebar-style Header ── */}
        <header className="border-b border-[#1a1f2e] bg-[#0d1120] sticky top-0 z-30 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-sm shadow-lg shadow-indigo-900/50">
                ✓
              </div>
              <div>
                <h1 className="text-white font-bold text-lg leading-none">TaskFlow</h1>
                <p className="text-gray-500 text-xs leading-none mt-0.5">Task Management</p>
              </div>
            </div>
          </div>
        </header>

        {/* ── Main Content ── */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          {/* Top Bar: Form + Filters */}
          <div className="flex flex-col gap-5 mb-7">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">My Tasks</h2>
                <p className="text-gray-500 text-sm mt-0.5">
                  Manage and track your work efficiently
                </p>
              </div>
              <TaskForm onCreated={handleTaskCreated} />
            </div>

            <Filters
              searchInput={searchInput}
              onSearchChange={handleSearchChange}
              selectedFilter={selectedFilter}
              onFilterChange={handleFilterChange}
              selectedPriority={selectedPriority}
              onPriorityChange={handlePriorityChange}
            />
          </div>

          {/* Task Grid */}
          <TaskList
            tasks={tasks}
            loading={loading}
            limit={limit}
            onDeleted={handleTaskDeleted}
            onUpdated={handleTaskUpdated}
          />

          {/* Pagination */}
          {!loading && totalCount > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              limit={limit}
              totalCount={totalCount}
              onPageChange={setCurrentPage}
              onLimitChange={handleLimitChange}
            />
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-[#1a1f2e] mt-12 py-5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center text-gray-600 text-xs">
            TaskFlow Dashboard 
          </div>
        </footer>
      </div>
    </>
  );
}
