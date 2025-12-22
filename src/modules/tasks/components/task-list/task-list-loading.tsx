import { Skeleton } from "@/components/ui/skeleton";

const SKELETON_ITEMS = ["skeleton-1", "skeleton-2", "skeleton-3"] as const;

export const TaskListLoading = () => {
  return (
    <div className="space-y-2">
      {SKELETON_ITEMS.map((id) => (
        <div className="flex items-center gap-2 rounded-lg border p-3" key={id}>
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-4 flex-1" />
          <Skeleton className="h-8 w-8 rounded" />
        </div>
      ))}
    </div>
  );
};
