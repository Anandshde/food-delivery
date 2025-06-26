import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import api from "@/lib/api";

interface Props {
  onAdd: (category: string) => void;
}

export default function AddCategoryDialog({ onAdd }: Props) {
  const [open, setOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!categoryName.trim()) return;
    try {
      setLoading(true);
      const res = await api.post("/category", { name: categoryName });
      onAdd(res.data.name); // assumes backend returns { name }
      setCategoryName("");
      setOpen(false);
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to add category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-full w-8 h-8 p-0">
          <Plus size={18} className="text-red-500" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Add new category</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Type category name..."
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>
        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={handleAdd}
            disabled={!categoryName.trim() || loading}
          >
            {loading ? "Adding..." : "Add category"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
