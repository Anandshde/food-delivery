"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import AddFoodDialog from "./AddFoodDialog";
import AddCategoryDialog from "./AddCategoryDialog";

export default function AdminFoodMenuPage() {
  const [foods, setFoods] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const fetchFoods = async () => {
    try {
      setLoading(true);
      const res = await api.get("/food");
      setFoods(res.data.foods);
      const unique = Array.from(
        new Set(res.data.foods.map((f: any) => f.category))
      ).filter(Boolean) as string[];
      setCategories(unique);
      if (!selectedCategory && unique.length > 0) {
        setSelectedCategory(unique[0]);
      }
    } catch (err) {
      console.error("Failed to fetch foods", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const filteredFoods = selectedCategory
    ? foods.filter((f) => f.category === selectedCategory)
    : foods;

  return (
    <div className="flex h-screen bg-gray-100 text-sm">
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "ghost"}
                className="rounded-full"
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Button>
            ))}
            <AddCategoryDialog
              onAdd={(newCat) => setCategories((prev) => [...prev, newCat])}
            />
          </div>

          <h1 className="text-xl font-semibold">Food menu</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AddFoodDialog
            category={selectedCategory || categories[0] || ""}
            onAdd={(f) => {
              setFoods((prev) => [...prev, f]);
              if (f.category && !categories.includes(f.category)) {
                setCategories((prev) => [...prev, f.category]);
              }
            }}
          />
          {loading ? (
            <p>Loading...</p>
          ) : filteredFoods.length === 0 ? (
            <p>No food items.</p>
          ) : (
            filteredFoods.map((food) => (
              <div key={food._id} className="bg-white p-4 rounded shadow">
                <img
                  src={food.image}
                  alt={food.foodName}
                  className="h-40 w-full object-cover rounded"
                />
                <h3 className="mt-2 font-semibold">{food.foodName}</h3>
                <p className="text-sm text-gray-600">{food.ingriedents}</p>
                <p className="font-bold">
                  ${food.price?.toFixed?.(2) ?? food.price}
                </p>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
