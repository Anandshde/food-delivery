"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin } from "lucide-react";

export function DeliveryAddressDialog() {
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState("");

  const handleSubmit = () => {
    console.log("📦 Address:", address);
    setOpen(false); // close dialog
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="w-[251px] h-[36px] color-[#71717A] bg-[#FFFFFF] rounded-2xl"
          variant="ghost"
        >
          <MapPin />
          Delivery address: Add Location
          <ArrowRight />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Please write your delivery address!
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Please share your complete address
          </DialogDescription>
        </DialogHeader>

        <Input
          placeholder="1234 Fresh Street, City"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="mt-4"
        />

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Deliver Here</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
