import { NavBar } from "./_components/Navbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <NavBar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
