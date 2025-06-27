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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch all foods
        const foodRes = await api.get("/food");
        setFoods(foodRes.data.foods);

        // Fetch all categories
        const catRes = await api.get("/category");
        const catList: string[] = catRes.data.categories.map(
          (c: any) => c.name
        );
        setCategories(catList);

        if (!selectedCategory && catList.length > 0) {
          setSelectedCategory(catList[0]);
        }
      } catch (err) {
        console.error("❌ Failed to fetch foods or categories", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredFoods = selectedCategory
    ? foods.filter((f) => f.category === selectedCategory)
    : foods;

  return (
    <div className="flex h-screen bg-gray-100 text-sm">
      <main className="flex-1 p-8 overflow-y-auto">
        {/* CATEGORY FILTERS */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-wrap items-center gap-2">
            {/* All Dishes Button */}
            <Button
              variant={selectedCategory === "" ? "default" : "ghost"}
              className="rounded-full border border-red-500 text-red-600"
              onClick={() => setSelectedCategory("")}
            >
              All Dishes
              <span className="ml-1 px-2 py-0.5 rounded-full bg-black text-white text-xs">
                {foods.length}
              </span>
            </Button>

            {/* Category Buttons */}
            {categories.map((cat) => {
              const count = foods.filter((f) => f.category === cat).length;
              return (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "ghost"}
                  className="rounded-full"
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                  <span className="ml-1 px-2 py-0.5 rounded-full bg-black text-white text-xs">
                    {count}
                  </span>
                </Button>
              );
            })}

            {/* Add Category Button */}
            <AddCategoryDialog
              onAdd={(newCat) => setCategories((prev) => [...prev, newCat])}
            />
          </div>
          <h1 className="text-xl font-semibold">Food menu</h1>
        </div>

        {/* FOOD GROUPS BY CATEGORY */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          (selectedCategory ? [selectedCategory] : categories).map((cat) => {
            const items = foods.filter((f) => f.category === cat);
            return (
              <div key={cat} className="mb-8">
                <h2 className="text-xl font-semibold mb-3">
                  {cat} <span className="text-gray-500">({items.length})</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Add New Dish Card */}
                  <div className="border-2 border-dashed border-red-400 rounded p-4 flex flex-col items-center justify-center text-center min-h-[200px]">
                    <AddFoodDialog
                      category={cat}
                      onAdd={(f) => {
                        setFoods((prev) => [...prev, f]);
                        if (f.category && !categories.includes(f.category)) {
                          setCategories((prev) => [...prev, f.category]);
                        }
                      }}
                    />
                    <p className="text-sm mt-2 text-gray-600">
                      Add new Dish to {cat}
                    </p>
                  </div>

                  {/* Food Items */}
                  {items.map((food) => (
                    <div key={food._id} className="bg-white p-4 rounded shadow">
                      <img
                        src={food.image}
                        alt={food.foodName}
                        className="h-40 w-full object-cover rounded"
                      />
                      <h3 className="mt-2 font-semibold text-red-600">
                        {food.foodName}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {food.ingriedents}
                      </p>
                      <p className="font-bold">
                        ${food.price?.toFixed?.(2) ?? food.price}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </main>
    </div>
  );
}
