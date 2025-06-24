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
import { useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext"; // ✅ import context

export default function CartDrawer() {
  const { cart, increment, decrement, remove, clearCart } = useCart(); // ✅ get from context

  const [address, setAddress] = useState("");

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Cart</Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[400px] sm:w-[450px]">
        <SheetHeader>
          <SheetTitle>Order detail</SheetTitle>
        </SheetHeader>

        <Tabs defaultValue="cart" className="mt-4 w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="cart">Cart</TabsTrigger>
            <TabsTrigger value="order">Order</TabsTrigger>
          </TabsList>

          <TabsContent value="cart" className="mt-4 space-y-4">
            <ScrollArea className="h-60 pr-4">
              {cart.length === 0 ? (
                <p className="text-muted-foreground text-sm">
                  Your cart is empty.
                </p>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between gap-3 border-b pb-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-md object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
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
                        <span>{item.quantity}</span>
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => increment(item.id)}
                        >
                          <Plus size={14} />
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-between h-full">
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

            <div>
              <label className="text-sm font-medium block mb-1">
                Delivery location
              </label>
              <Input
                placeholder="Please share your complete address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="space-y-1 text-sm text-muted-foreground border-t pt-4">
              <div className="flex justify-between">
                <span>Items</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>$0.99</span>
              </div>
              <div className="flex justify-between font-semibold text-black dark:text-white">
                <span>Total</span>
                <span>${(totalPrice + 0.99).toFixed(2)}</span>
              </div>
            </div>

            <Button
              className="w-full mt-4"
              onClick={() => {
                if (cart.length === 0) return;
                alert(`Order placed to: ${address}`);
                clearCart();
                setAddress("");
              }}
            >
              Checkout
            </Button>
          </TabsContent>

          <TabsContent value="order" className="mt-4">
            <p className="text-muted-foreground">Order history coming soon.</p>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
