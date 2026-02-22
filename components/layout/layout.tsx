import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full max-w-[1328px] mx-auto">
      {children}
    </div>
  );
}
