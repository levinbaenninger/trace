import { UserInfoViewLoading } from "@/modules/auth/ui/views/user-info-view-loading";
import { TasksViewLoading } from "@/modules/tasks/ui/views/tasks-view-loading";

const Loading = () => {
  return (
    <div className="min-h-screen p-4">
      <div className="mx-auto max-w-4xl space-y-6 py-8">
        <UserInfoViewLoading />
        <TasksViewLoading />
      </div>
    </div>
  );
};

export default Loading;
