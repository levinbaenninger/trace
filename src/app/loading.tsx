import { UserInfoSkeleton } from "@/modules/auth/ui/views/user-info";
import { TasksSkeleton } from "@/modules/tasks/ui/views/tasks";

const Loading = () => {
  return (
    <div className="min-h-screen p-4">
      <div className="mx-auto max-w-4xl space-y-6 py-8">
        <UserInfoSkeleton />
        <TasksSkeleton />
      </div>
    </div>
  );
};

export default Loading;
