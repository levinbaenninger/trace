import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      {children}
    </div>
  );
};

export default AuthLayout;
