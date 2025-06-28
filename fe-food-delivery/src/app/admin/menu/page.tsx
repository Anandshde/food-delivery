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
  const [cats, setCats] = useState<Record<string, string>[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const foodRes = await api.get("/food");
        setFoods(foodRes.data.foods);

        const catRes = await api.get("/category");
        const catList: string[] = catRes.data.categories.map(
          (c: any) => c.name
        );
        setCategories(catList);
        setCats(catRes.data.categories);

        if (!selectedCategory && catList.length > 0) {
          setSelectedCategory(""); // default: show all
        }
      } catch (err) {
        console.error("❌ Failed to fetch foods or categories", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getFoodsByCategoryId = (catId: string) =>
    foods.filter((f) => f.category === catId);

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
              const catObj = cats.find((c) => c.name === cat);
              const count = catObj
                ? foods.filter((f) => f.category === catObj._id).length
                : 0;
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
              onAdd={(newCat) => {
                setCats((prev) => [...prev, newCat]);
                setCategories((prev) => [...prev, newCat.name]);
              }}
            />
          </div>
          <h1 className="text-xl font-semibold">Food menu</h1>
        </div>

        {/* DISPLAY FOODS */}
        {loading ? (
          <p>Loading...</p>
        ) : selectedCategory ? (
          // Filtered view
          (() => {
            const catObj = cats.find((c) => c.name === selectedCategory);
            const filtered = catObj
              ? foods.filter((f) => f.category === catObj._id)
              : [];

            return (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-3">
                  {selectedCategory}{" "}
                  <span className="text-gray-500">({filtered.length})</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Add Dish Card */}
                  {catObj && (
                    <AddFoodDialog
                      category={catObj}
                      categoryName={selectedCategory}
                      onAdd={(f) => {
                        setFoods((prev) => [...prev, f]);
                        if (f.category && !categories.includes(f.category)) {
                          setCategories((prev) => [...prev, f.category]);
                        }
                      }}
                    />
                  )}

                  {/* Foods */}
                  {filtered.map((food) => (
                    <div
                      key={food._id}
                      className="bg-white p-4 rounded shadow text-center"
                    >
                      <img
                        src={food.image}
                        alt={food.foodName}
                        className="h-40 w-full object-cover rounded"
                      />
                      <h3 className="mt-2 font-semibold text-red-600">
                        {food.foodName}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {food.ingredients}
                      </p>
                      <p className="font-bold">
                        ${food.price?.toFixed?.(2) ?? food.price}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()
        ) : (
          // All dishes grouped by category
          cats.map((cat) => {
            const items = getFoodsByCategoryId(cat._id);
            return (
              <div key={cat._id} className="mb-10">
                <h2 className="text-xl font-semibold mb-3">
                  {cat.name}{" "}
                  <span className="text-gray-500">({items.length})</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <AddFoodDialog
                    category={cat}
                    categoryName={cat.name}
                    onAdd={(f) => {
                      setFoods((prev) => [...prev, f]);
                    }}
                  />

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
                        {food.ingredients}
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
