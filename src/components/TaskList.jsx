import TaskCard from "./TaskCard";
import SkeletonCard from "./SkeletonCard";

export default function TaskList({ tasks, loading, limit, onDeleted, onUpdated }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {Array.from({ length: limit > 6 ? 6 : limit }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-[#1a1f2e] border border-[#2a3040] flex items-center justify-center text-4xl mb-4">
          📋
        </div>
        <h3 className="text-white font-semibold text-base mb-2">No tasks found</h3>
        <p className="text-gray-500 text-sm max-w-xs">
          Try adjusting your filters or search query, or create a new task to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id || task._id}
          task={task}
          onDeleted={onDeleted}
          onUpdated={onUpdated}
        />
      ))}
    </div>
  );
}
