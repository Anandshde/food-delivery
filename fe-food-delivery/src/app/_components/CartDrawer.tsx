"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, ReactNode, useEffect } from "react";
import { Minus, Plus, Trash2, Clock, CheckCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import api from "@/lib/api";

export default function CartDrawer({ children }: { children?: ReactNode }) {
  const { cart, increment, decrement, remove, clearCart } = useCart();
  const [address, setAddress] = useState("");

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  type Order = {
    id: string;
    date: string;
    total: number;
    status: string;
    items: string[];
  };

  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await api.get("/order/getOrders");
        const data: Order[] = res.data.order.map((o: any) => ({
          id: o._id,
          date: new Date(o.createdAt).toLocaleDateString(),
          total: o.totalPrice,
          status: o.status,
          items: o.foodOrderItems.map((i: any) => i.name),
        }));
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      }
    }
    fetchOrders();
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children ?? <Button variant="outline">Cart</Button>}
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[420px] sm:w-[440px] p-6 bg-white rounded-l-[20px] flex flex-col justify-between"
      >
        <div>
          <SheetHeader>
            <SheetTitle className="text-lg font-semibold text-black">
              Order detail
            </SheetTitle>
          </SheetHeader>

          <Tabs defaultValue="cart" className="mt-4 w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-100 rounded-full mb-4">
              <TabsTrigger
                value="cart"
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-full"
              >
                Cart
              </TabsTrigger>
              <TabsTrigger
                value="order"
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-full"
              >
                Order
              </TabsTrigger>
            </TabsList>

            {/* CART TAB */}
            <TabsContent value="cart">
              <ScrollArea className="h-[300px] pr-2">
                {cart.length === 0 ? (
                  <p className="text-muted-foreground text-sm">
                    Your cart is empty.
                  </p>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start gap-3 border-b pb-4 mb-4"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-md object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.description}
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => decrement(item.id)}
                          >
                            <Minus size={14} />
                          </Button>
                          <span className="w-5 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => increment(item.id)}
                          >
                            <Plus size={14} />
                          </Button>
                        </div>
                      </div>
                      <div className="flex flex-col justify-between items-end h-full">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => remove(item.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                        <p className="text-sm font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </ScrollArea>

              <div className="mt-4">
                <label className="text-sm font-medium block mb-1">
                  Delivery location
                </label>
                <Input
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="rounded-full text-sm px-4 py-2"
                />
              </div>

              <div className="space-y-1 text-sm text-muted-foreground border-t pt-4 mt-4">
                <div className="flex justify-between">
                  <span>Items</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>$0.99</span>
                </div>
                <div className="flex justify-between font-semibold text-black">
                  <span>Total</span>
                  <span>${(totalPrice + 0.99).toFixed(2)}</span>
                </div>
              </div>
            </TabsContent>

            {/* ORDER HISTORY TAB */}
            <TabsContent value="order">
              <ScrollArea className="h-[360px] pr-2 space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="border rounded-xl p-4 text-sm space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <p className="font-semibold">
                        ${order.total.toFixed(2)}{" "}
                        <span className="text-xs">{order.id}</span>
                      </p>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          order.status === "Pending"
                            ? "bg-orange-100 text-orange-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <ul className="list-disc list-inside text-muted-foreground">
                      {order.items.map((item, idx) => (
                        <li key={idx}>{item} ×1</li>
                      ))}
                    </ul>
                    <p className="text-xs text-gray-400">{order.date}</p>
                  </div>
                ))}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
        <Button
          className="w-full mt-6"
          onClick={async () => {
            if (cart.length === 0) return;

            if (!address.trim()) {
              alert("⚠️ Please enter a delivery address.");
              return;
            }

            const token = localStorage.getItem("token"); // or your auth system
            if (!token) {
              alert("⚠️ Please log in first.");
              return;
            }

            try {
              console.log("Submitting order with:", {
                address,
                totalPrice: totalPrice + 0.99,
                foodOrderItems: cart,
              });

              await api.post(
                "/order/createOrder",
                {
                  address,
                  totalPrice: totalPrice + 0.99,
                  foodOrderItems: cart.map((c) => ({
                    name: c.name,
                    image: c.image,
                    price: c.price,
                    quantity: c.quantity,
                  })),
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              alert(`✅ Order placed to: ${address}`);
              clearCart();
              setAddress("");
            } catch (err: any) {
              console.error("Order error:", err);
              console.log("Server says:", err.response?.data);
              alert("❌ Failed to place order");
            }
          }}
        >
          Checkout
        </Button>
      </SheetContent>
    </Sheet>
  );
}
