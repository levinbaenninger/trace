import { SignUp } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
};

const SignUpPage = () => {
  return <SignUp />;
};

export default SignUpPage;
