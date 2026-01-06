import { auth } from "@clerk/nextjs/server";
import { preloadQuery } from "convex/nextjs";

import { getToken } from "@/lib/auth";
import { StatsView } from "@/modules/stats/ui/views/stats-view";
import { api } from "../../../../convex/_generated/api";

const StatsPage = async () => {
  const { isAuthenticated } = await auth();

  if (!isAuthenticated) {
    return null;
  }

  const preloadedStats = await preloadQuery(
    api.stats.get.default,
    {},
    { token: await getToken() }
  );

  return <StatsView preloadedStats={preloadedStats} />;
};

export default StatsPage;
