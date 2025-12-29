import { SignUp } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registrieren",
};

const SignUpPage = () => {
  return <SignUp />;
};

export default SignUpPage;
