"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar28 } from "./calendar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Pagination } from "./pagination";

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

export default function AdminOrders() {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(false);

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
        setLoading(true);
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
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 text-sm">
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex w-full items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Orders</h1>
            <h4 className="text-gray-500 text-sm mt-1">
              Total orders: {orders.length}
            </h4>
          </div>
          <div className="flex items-center gap-4">
            <Calendar28 />
            <Button className="rounded-3xl">Change delivery state</Button>
          </div>
        </div>

        <Table className="mt-6">
          <TableCaption>List of recent orders.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">
                <Checkbox />
              </TableHead>
              <TableHead className="w-[40px]">№</TableHead>
              <TableHead className="w-[160px]">Customer</TableHead>
              <TableHead className="w-[160px]">Food</TableHead>
              <TableHead className="w-[140px]">Date</TableHead>
              <TableHead className="w-[100px]">Total</TableHead>
              <TableHead className="w-[220px]">Delivery Address</TableHead>
              <TableHead className="w-[160px]">Delivery State</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  No orders found.
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order, index) => (
                <TableRow key={order._id}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>
                    {order.items.map((item, i) => (
                      <div key={i} className="mb-1">
                        <span className="font-medium">{item.name}</span> x{" "}
                        {item.quantity}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell className="text-right">
                    ${order.total.toFixed(2)}
                  </TableCell>
                  <TableCell>{order.address}</TableCell>
                  <TableCell>
                    <div className="inline-flex items-center gap-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : order.status === "Delivered"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {order.status}
                      </span>
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(
                            order._id,
                            e.target.value as OrderStatus
                          )
                        }
                        className="border border-gray-300 rounded px-2 py-1 text-xs bg-white"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Canceled">Canceled</option>
                      </select>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <Pagination />
      </main>
    </div>
  );
}
