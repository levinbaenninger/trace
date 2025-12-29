import { SignIn } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Einloggen",
};

const SignInPage = () => {
  return <SignIn />;
};

export default SignInPage;
