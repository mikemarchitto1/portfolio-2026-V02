import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return <div className="mx-16 max-w-[1200px]">{children}</div>;
}
