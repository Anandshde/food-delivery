"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import AddFoodDialog from "./AddFoodDialog";

export default function AdminFoodMenuPage() {
  const [foods, setFoods] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchFoods() {
      try {
        setLoading(true);
        const res = await api.get("/food");
        setFoods(res.data.foods);
      } catch (err) {
        console.error("Failed to fetch foods", err);
      } finally {
        setLoading(false);
      }
    }
    fetchFoods();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 text-sm">
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold">Food menu</h1>
          <AddFoodDialog onAdd={(f) => setFoods((prev) => [...prev, f])} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? (
            <p>Loading...</p>
          ) : foods.length === 0 ? (
            <p>No food items.</p>
          ) : (
            foods.map((food) => (
              <div key={food._id} className="bg-white p-4 rounded shadow">
                <img
                  src={food.image}
                  alt={food.foodName}
                  className="h-40 w-full object-cover rounded"
                />
                <h3 className="mt-2 font-semibold">{food.foodName}</h3>
                <p className="text-sm text-gray-600">{food.ingriedents}</p>
                <p className="font-bold">${food.price?.toFixed?.(2) ?? food.price}</p>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
