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
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import api from "@/lib/api";
import { cn } from "@/lib/utils";

interface Props {
  category: string;
  onAdd: (food: any) => void;
}

export default function AddFoodDialog({ category, onAdd }: Props) {
  const [open, setOpen] = useState(false);

  const FoodSchema = yup.object().shape({
    foodName: yup.string().required("Food name is required"),
    price: yup
      .number()
      .typeError("Price must be a number")
      .required("Price is required"),
    image: yup.string().url("Invalid image url").required("Image is required"),
    ingredients: yup.string().required("Ingredients are required"),
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          className={cn(
            "cursor-pointer border border-dashed border-red-400 rounded-xl flex flex-col items-center justify-center p-6 bg-white hover:bg-red-50 transition"
          )}
        >
          <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white mb-2">
            <Plus size={20} />
          </div>
          <p className="text-sm text-center text-gray-600">
            Add new Dish to{" "}
            <span className="font-medium text-black">{category}</span>
          </p>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Food</DialogTitle>
        </DialogHeader>

        <Formik
          initialValues={{
            foodName: "",
            price: "",
            image: "",
            ingredients: "",
          }}
          validationSchema={FoodSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              const res = await api.post("/food", {
                name: values.foodName,
                price: Number(values.price),
                image: values.image,
                ingredients: values.ingredients,
                category,
              });
              onAdd(res.data.food);
              resetForm();
              setOpen(false);
            } catch (err: any) {
              alert(err.response?.data?.message || "Failed to create food");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, isValid, dirty }) => (
            <Form className="space-y-4">
              <div className="space-y-1">
                <Field name="foodName" as={Input} placeholder="Food name" />
                <ErrorMessage
                  name="foodName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="space-y-1">
                <Field name="price" as={Input} placeholder="Price" />
                <ErrorMessage
                  name="price"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="space-y-1">
                <Field name="image" as={Input} placeholder="Image URL" />
                <ErrorMessage
                  name="image"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="space-y-1">
                <Field
                  name="ingredients"
                  as={Input}
                  placeholder="Ingredients"
                />
                <ErrorMessage
                  name="ingredients"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  disabled={!isValid || !dirty || isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </Button>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
