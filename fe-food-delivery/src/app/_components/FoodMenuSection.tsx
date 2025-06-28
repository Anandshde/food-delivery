"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { FoodDetailDialog } from "./FoodDetailDialog";
import api from "@/lib/api";

type FoodItem = {
  _id: string;
  foodName: string;
  ingredients: string;
  price: number;
  image: string;
  category: string; // ObjectId
};

type CategoryItem = {
  _id: string;
  name: string;
};

export default function FoodMenuSection() {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const foodRes = await api.get("/food");
        const catRes = await api.get("/category");

        setFoods(foodRes.data.foods);
        setCategories(catRes.data.categories);
      } catch (err) {
        console.error("❌ Failed to fetch food or category data", err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <section className="px-6 md:px-20 py-12 bg-[#2c2c2c] text-white">
        {categories.map((cat) => {
          const items = foods.filter((f) => f.category === cat._id);
          if (items.length === 0) return null;

          return (
            <div key={cat._id} className="mb-10">
              <h3 className="text-3xl font-semibold mb-4">{cat.name}</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {items.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white text-black rounded-xl overflow-hidden shadow hover:shadow-lg transition"
                  >
                    <img
                      src={item.image}
                      alt={item.foodName}
                      className="w-full h-44 object-cover"
                    />
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-base font-semibold">
                          {item.foodName}
                        </h3>
                        <button onClick={() => setSelectedFood(item)}>
                          <Plus size={18} />
                        </button>
                      </div>
                      <p className="text-xs text-gray-600">
                        {item.ingredients}
                      </p>
                      <div className="text-sm font-bold text-right mt-2">
                        ${item.price.toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {selectedFood && (
        <FoodDetailDialog
          open={true}
          onClose={() => setSelectedFood(null)}
          food={{
            name: selectedFood.foodName,
            description: selectedFood.ingredients,
            price: selectedFood.price,
            image: selectedFood.image,
          }}
        />
      )}
    </>
  );
}
