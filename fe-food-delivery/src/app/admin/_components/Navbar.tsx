import { Button } from "@/components/ui/button";
import Link from "next/link";

export const NavBar = () => {
  return (
    <aside className="w-[260px] bg-white border-r p-6 flex flex-col gap-6">
      <div className="text-2xl font-bold text-red-500">NomNom</div>
      <nav className="flex flex-col gap-2 text-gray-700">
        <Link href={"/admin/orders"}>
          <Button className="w-full h-[40px]">Orders</Button>
        </Link>
        <Link href={"/admin/menu"}>
          <Button className="w-full h-[40px]">Food menu</Button>
        </Link>
      </nav>
    </aside>
  );
};
