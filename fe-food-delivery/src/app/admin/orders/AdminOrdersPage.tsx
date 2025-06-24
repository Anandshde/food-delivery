// app/(admin)/admin/orders/page.tsx or /components/AdminOrders.tsx

"use client";

import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export type OrderStatus = "Pending" | "Delivered" | "Canceled";

export interface OrderItem {
  _id: string;
  customer: string;
  items: {
    name: string;
    image: string;
    quantity: number;
  }[];
  date: string;
  total: number;
  address: string;
  status: OrderStatus;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const router = useRouter();

  const handleStatusChange = async (id: string, status: OrderStatus) => {
    try {
      await api.patch("/order/updateStatus", { orderId: id, status });
      setOrders((prev) =>
        prev.map((o) => (o._id === id ? { ...o, status } : o))
      );
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await api.get("/order/getOrders");
        const mapped: OrderItem[] = res.data.order.map((o: any) => ({
          _id: o._id,
          customer: o.user?.email || "Unknown",
          items: o.foodOrderItems.map((i: any) => ({
            name: i.name,
            image: i.image,
            quantity: i.quantity,
          })),
          date: new Date(o.createdAt).toLocaleDateString(),
          total: o.totalPrice,
          address: o.address || "",
          status: o.status,
        }));
        setOrders(mapped);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      }
    }
    fetchOrders();
  }, []);
  return (
    <div className="flex h-screen bg-gray-100 text-sm">
      {/* Sidebar */}
      <aside className="w-[260px] bg-white border-r p-6 flex flex-col gap-6">
        <div className="text-2xl font-bold text-red-500">NomNom</div>
        <nav className="flex flex-col gap-2 text-gray-700">
          <Button onClick={() => router.push("/admin")}>Orders</Button>
          <Button onClick={() => router.push("/admin/menu")}>Food menu</Button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
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

        {/* Table */}
        <div className="bg-white rounded-lg shadow border overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-gray-50 text-left text-gray-500 font-medium">
              <tr>
                <th className="p-4">#</th>
                <th>Customer</th>
                <th>Food</th>
                <th>Date</th>
                <th>Total</th>
                <th>Delivery Address</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, i) => (
                <tr key={order._id} className="border-t hover:bg-gray-50">
                  <td className="p-4">{i + 1}</td>
                  <td>{order.customer}</td>
                  <td>
                    <div className="flex gap-2 items-center">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-1">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-8 h-8 rounded object-cover border"
                          />
                          <span className="text-xs">x{item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td>{order.date}</td>
                  <td>${order.total.toFixed?.(2) ?? order.total}</td>
                  <td>{order.address}</td>
                  <td>
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(
                          order._id,
                          e.target.value as OrderStatus
                        )
                      }
                      className="border rounded p-1"
                    >
                      {[
                        "PENDING",
                        "DELIVERED",
                        "CANCELED",
                      ].map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
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
}
