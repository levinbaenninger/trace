import { auth } from "@clerk/nextjs/server";
import { preloadQuery } from "convex/nextjs";
import { ErrorBoundary } from "react-error-boundary";

import { getToken } from "@/lib/auth";
import { UserInfo, UserInfoError } from "@/modules/auth/ui/views/user-info";
import { Tasks, TasksError } from "@/modules/tasks/ui/views/tasks";
import { api } from "../../convex/_generated/api";

const Home = async () => {
  const { redirectToSignIn, isAuthenticated } = await auth();

  if (!isAuthenticated) {
    redirectToSignIn();
  }

  const preloadedTasks = await preloadQuery(
    api.tasks.list.default,
    {},
    { token: await getToken() }
  );

  return (
    <div className="min-h-screen p-4">
      <div className="mx-auto max-w-4xl space-y-6 py-8">
        <ErrorBoundary fallback={<UserInfoError />}>
          <UserInfo />
        </ErrorBoundary>

        <ErrorBoundary fallback={<TasksError />}>
          <Tasks preloadedTasks={preloadedTasks} />
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default Home;
