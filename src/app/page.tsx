import { RedirectToSignIn } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { preloadQuery } from "convex/nextjs";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { api } from "@/../convex/_generated/api";
import { getConvexAuthToken } from "@/lib/auth";
import { UserInfoView } from "@/modules/auth/ui/views/user-info-view";
import { TasksView } from "@/modules/tasks/ui/views/tasks-view";
import { TasksViewError } from "@/modules/tasks/ui/views/tasks-view-error";
import { TasksViewLoading } from "@/modules/tasks/ui/views/tasks-view-loading";

const Home = async () => {
  const { userId } = await auth();

  if (!userId) {
    return <RedirectToSignIn />;
  }

  const user = await currentUser();
  if (!user) {
    return <RedirectToSignIn />;
  }

  const token = await getConvexAuthToken();
  const preloadedTasks = await preloadQuery(
    api.tasks.list.default,
    {},
    { token }
  );

  return (
    <div className="min-h-screen p-4">
      <div className="mx-auto max-w-4xl space-y-6 py-8">
        <UserInfoView user={user} />

        <Suspense fallback={<TasksViewLoading />}>
          <ErrorBoundary fallback={<TasksViewError />}>
            <TasksView preloadedTasks={preloadedTasks} />
          </ErrorBoundary>
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
