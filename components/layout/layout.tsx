export default function Layout({ children }: LayoutProps) {
  return (
    <div className="w-full max-w-[1328px] mx-auto">
      {children}
    </div>
  );
}
