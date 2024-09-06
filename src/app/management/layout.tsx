import Sidebar from "@/components/views/management/sidebar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className="flex border-collapse overflow-hidden"
      style={{ height: "calc(100vh - 60px)" }}
    >
      <Sidebar />
      <main className="flex-1 overflow-y-auto overflow-x-hidden bg-secondary/10">
        {children}
      </main>
    </div>
  );
}
