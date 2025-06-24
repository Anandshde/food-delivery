"use client";

import { useState } from "react";
import { Minus, Plus, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

type Props = {
  open: boolean;
  onClose: () => void;
  food: {
    name: string;
    description: string;
    price: number;
    image: string;
  };
};

export const FoodDetailDialog = ({ open, onClose, food }: Props) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCartWithQuantity } = useCart();

  const handleAdd = () => {
    addToCartWithQuantity(
      {
        name: food.name,
        description: food.description,
        image: food.image,
        price: food.price,
      },
      quantity
    );
    onClose();
    setQuantity(1);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[826px] h-[412px] rounded-[20px] p-6 bg-white">
        <div className="flex h-full gap-6">
          {/* Left: Image */}
          <div className="w-1/2 h-full overflow-hidden rounded-xl">
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right: Content */}
          <div className="w-1/2 flex flex-col justify-between">
            {/* Top section: title, desc, close */}
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold text-[#EF4444]">
                  {food.name}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {food.description}
                </p>
              </div>
              <button onClick={onClose}>
                <X className="text-gray-400 hover:text-black" />
              </button>
            </div>

            {/* Bottom section: price, quantity, button */}
            <div className="flex items-center justify-between mt-auto">
              {/* Price */}
              <div>
                <p className="text-sm text-muted-foreground">Total price</p>
                <p className="text-lg font-bold">
                  ${(food.price * quantity).toFixed(2)}
                </p>
              </div>

              {/* Quantity control */}
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus />
                </Button>
                <span className="w-6 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus />
                </Button>
              </div>

              {/* Add to cart */}
              <Button
                className="bg-black text-white px-6 py-2 rounded-full"
                onClick={handleAdd}
              >
                Add to cart
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
