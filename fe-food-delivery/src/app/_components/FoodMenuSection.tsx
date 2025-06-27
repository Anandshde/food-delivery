"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { FoodDetailDialog } from "./FoodDetailDialog";
import api from "@/lib/api";

type FoodItem = {
  name: string;
  description: string;
  price: number;
  image: string;
};

export function FoodMenuSection() {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await api.get("/food");
        const fetched = res.data.foods.map((f: any) => ({
          name: f.foodName,
          description: f.ingriedents,
          price: f.price,
          image: f.image,
        }));
        setFoods(fetched);
      } catch (err) {
        console.error("Failed to fetch foods", err);
      }
    };

    fetchFoods();
  }, []);

  return (
    <>
      <section className="px-6 md:px-20 py-12 bg-[#2c2c2c] text-white">
        <h2 className="text-2xl font-bold mb-6">Menu</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {foods.map((item, index) => (
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
                  <button onClick={() => setSelectedFood(item)}>
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
      {selectedFood && (
        <FoodDetailDialog
          open={true}
          onClose={() => setSelectedFood(null)}
          food={selectedFood}
        />
      )}
    </>
  );
}
