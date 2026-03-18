import { useState } from "react";
import DescriptionModal from "./DescriptionModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import { updateTask, deleteTask } from "../api/taskApi";
import { showApiToast } from "../utils/toast";

const PRIORITY_CONFIG = {
  low: {
    label: "Low",
    classes: "bg-emerald-900/40 text-emerald-400 border border-emerald-500/30",
    dot: "bg-emerald-400",
  },
  medium: {
    label: "Medium",
    classes: "bg-amber-900/40 text-amber-400 border border-amber-500/30",
    dot: "bg-amber-400",
  },
  high: {
    label: "High",
    classes: "bg-red-900/40 text-red-400 border border-red-500/30",
    dot: "bg-red-400",
  },
};

const STATUS_CONFIG = {
  todo: {
    label: "Todo",
    classes: "bg-gray-800/60 text-gray-400 border border-gray-600/40",
  },
  "in-progress": {
    label: "In Progress",
    classes: "bg-blue-900/40 text-blue-400 border border-blue-500/30",
  },
  completed: {
    label: "Completed",
    classes: "bg-emerald-900/40 text-emerald-400 border border-emerald-500/30",
  },
};

const STATUS_OPTIONS = ["todo", "in-progress", "completed"];

const DESCRIPTION_LIMIT = 120;

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function TaskCard({ task, onDeleted, onUpdated }) {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [hoverDesc, setHoverDesc] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const priority = PRIORITY_CONFIG[task.priority] || PRIORITY_CONFIG.low;
  const statusConf = STATUS_CONFIG[task.status] || STATUS_CONFIG.todo;
  const isLong =
    task.description && task.description.length > DESCRIPTION_LIMIT;
  const truncated = isLong
    ? task.description.slice(0, DESCRIPTION_LIMIT) + "..."
    : task.description;

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setUpdating(true);

    try {
      const res = await updateTask(task._id, { status: newStatus });
      const { flag, message, data } = res.data;

      showApiToast({ flag, message });

      if (flag === 1) onUpdated(data);
    } catch (error) {
      const backendResponse = error?.response?.data;

      if (backendResponse) {
        const { flag, message } = backendResponse;
        showApiToast({ flag, message });
      } else {
        showApiToast({
          flag: 0,
          message: "Something went wrong. Please try again.",
        });
      }
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    setShowDeleteConfirm(false);
    try {
      const res = await deleteTask(task.id || task._id);
      const { flag, message } = res.data;
      showApiToast({ flag, message });
      if (flag === 1) onDeleted(task.id || task._id);
    } catch {
      showApiToast({ flag: 0, message: "Failed to delete task." });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <div
        className={`relative bg-[#1a1f2e] rounded-2xl p-5 border border-[#2a3040] flex flex-col gap-3 transition-all duration-300 hover:border-[#4a5568] hover:shadow-xl group ${
          deleting ? "opacity-50 pointer-events-none" : ""
        }`}
        style={{
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-white font-semibold text-base leading-snug line-clamp-2 flex-1">
            {task.title}
          </h3>
          <span
            className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5 ${priority.classes}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${priority.dot}`} />
            {priority.label}
          </span>
        </div>

        {/* Description */}
        {task.description && (
          <div
            className="relative cursor-pointer"
            onMouseEnter={() => isLong && setHoverDesc(true)}
            onMouseLeave={() => setHoverDesc(false)}
            onClick={() => isLong && setShowModal(true)}
          >
            <p
              className={`text-gray-400 text-sm leading-relaxed transition-all duration-300 ${
                hoverDesc ? "blur-[2px]" : ""
              }`}
            >
              {truncated}
            </p>
            {isLong && hoverDesc && (
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600/90 hover:bg-indigo-500 text-white text-xs font-medium rounded-lg shadow-lg transition-all duration-200 backdrop-blur-sm">
                  <span>👁</span> View Full Description
                </button>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="mt-auto pt-3 border-t border-[#2a3040] flex items-center justify-between gap-2">
          {/* Status dropdown */}
          <div className="flex items-center gap-2">
            <span
              className={`text-xs px-2 py-1 rounded-lg font-medium ${statusConf.classes}`}
            >
              {statusConf.label}
            </span>
            <select
              value={task.status}
              onChange={handleStatusChange}
              disabled={updating}
              className="text-xs bg-[#0f1421] border border-[#2a3040] text-gray-300 rounded-lg px-2 py-1 cursor-pointer hover:border-indigo-500 focus:outline-none focus:border-indigo-500 transition-all disabled:opacity-50 appearance-none"
              title="Change status"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {STATUS_CONFIG[s].label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            {/* Date */}
            {task.createdAt && (
              <span className="text-gray-600 text-xs hidden sm:block">
                {formatDate(task.createdAt)}
              </span>
            )}
            {/* Delete button */}
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-900/20 transition-all duration-200 border border-transparent hover:border-red-800/40"
              title="Delete task"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Description Modal */}
      {showModal && (
        <DescriptionModal
          description={task.description}
          onClose={() => setShowModal(false)}
        />
      )}

      {/* Delete Confirm Modal */}
      {showDeleteConfirm && (
        <DeleteConfirmModal
          taskTitle={task.title}
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}
    </>
  );
}
