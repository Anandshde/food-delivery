"use client";

import { FoodMenuSection } from "../../_components/FoodMenuSection";

export default function AdminFoodMenuPage() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Food menu</h1>
      <FoodMenuSection />
    </div>
  );
}
