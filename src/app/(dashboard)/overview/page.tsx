import { RedirectToSignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Overview } from "@/modules/overview/ui/views/overview";

const OverviewPage = async () => {
  const { isAuthenticated } = await auth();

  if (!isAuthenticated) {
    return <RedirectToSignIn />;
  }

  return <Overview />;
};

export default OverviewPage;
