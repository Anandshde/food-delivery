"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useCart } from "@/context/CartContext"; // 👈 import cart context

const appetizers = [
  {
    name: "Finger food",
    description:
      "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
    price: 12.99,
    image: "/images/finger-food.jpg",
  },
  {
    name: "Cranberry Brie Bites",
    description:
      "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
    price: 12.99,
    image: "/images/cranberry.jpg",
  },
  {
    name: "Sunshine Stackers",
    description:
      "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
    price: 12.99,
    image: "/images/stackers.jpg",
  },
  {
    name: "Brie Crostini Appetizer",
    description:
      "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
    price: 12.99,
    image: "/images/brie.jpg",
  },
  {
    name: "Grilled chicken",
    description:
      "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
    price: 12.99,
    image: "/images/chicken.jpg",
  },
];

export function FoodMenuSection() {
  const { addToCart } = useCart(); // ✅ use cart context

  return (
    <section className="px-6 md:px-20 py-12 bg-[#2c2c2c] text-white">
      <h2 className="text-2xl font-bold mb-6">Appetizers</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {appetizers.map((item, index) => (
          <div
            key={index}
            className="bg-white text-black rounded-xl overflow-hidden shadow hover:shadow-lg transition"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-44 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-base font-semibold">{item.name}</h3>
                <button
                  onClick={() =>
                    addToCart({
                      name: item.name,
                      description: item.description,
                      image: item.image,
                      price: item.price,
                    })
                  }
                  className="bg-red-500 rounded-full p-1 hover:bg-red-600 text-white"
                >
                  <Plus size={18} />
                </button>
              </div>
              <p className="text-xs text-gray-600">{item.description}</p>
              <div className="text-sm font-bold text-right mt-2">
                ${item.price.toFixed(2)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
