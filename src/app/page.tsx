import { RedirectToSignIn } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";

import { UserProfileCard } from "@/modules/auth/components/user-profile-card";
import { TaskList } from "@/modules/tasks/components/task-list/task-list";

const Home = async () => {
  const { userId } = await auth();

  if (!userId) {
    <RedirectToSignIn />;
  }

  const user = await currentUser();
  if (!user) {
    return <RedirectToSignIn />;
  }

  return (
    <div className="min-h-screen p-4">
      <div className="mx-auto max-w-4xl space-y-6 py-8">
        <UserProfileCard user={user} />
        <TaskList />
      </div>
    </div>
  );
};

export default Home;
