import AdminFoodMenuPage from "./menu/page";
import AdminOrdersPage from "./_components/board";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

const AdminPage = () => {
  return (
    <div className="flex h-screen bg-gray-100 text-sm">
      <main className="flex-1 p-8 overflow-y-auto">
        {" "}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold">Orders</h1>
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-2 text-gray-500 border px-3 py-1 rounded">
              <Calendar className="w-4 h-4" />
              <span>13 June – 14 July</span>
            </div>
            <Button variant="secondary" disabled>
              Change delivery state
            </Button>
          </div>
        </div>
        <div className="flex justify-center items-center mt-6 gap-2">
          {[1, 2, 3, "...", 6].map((num, idx) => (
            <Button key={idx} variant="ghost" size="sm">
              {num}
            </Button>
          ))}
        </div>
      </main>
    </div>
  );
};
export default AdminPage;
