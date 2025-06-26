import { Button } from "@/components/ui/button";

export const Pagination = () => {
  return (
    <div className="flex justify-center items-center mt-6 gap-2">
      {[1, 2, 3, "...", 6].map((num, idx) => (
        <Button key={idx} variant="ghost" size="sm">
          {num}
        </Button>
      ))}
    </div>
  );
};
