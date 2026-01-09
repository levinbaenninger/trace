import { RedirectToSignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { preloadQuery } from "convex/nextjs";
import { ErrorBoundary } from "react-error-boundary";
import { getToken } from "@/lib/auth";
import { Stats, StatsError } from "@/modules/stats/ui/views/stats-view";
import { api } from "../../../../convex/_generated/api";

const StatsPage = async () => {
  const { isAuthenticated } = await auth();

  if (!isAuthenticated) {
    return <RedirectToSignIn />;
  }

  const preloadedStats = await preloadQuery(
    api.stats.get.default,
    {},
    { token: await getToken() }
  );

  return (
    <ErrorBoundary fallback={<StatsError />}>
      <Stats preloadedStats={preloadedStats} />
    </ErrorBoundary>
  );
};

export default StatsPage;
