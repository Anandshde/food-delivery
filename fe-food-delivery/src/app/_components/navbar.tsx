import { Dialog } from "@/components/ui/dialog";
import { DeliveryAddressDialog } from "./DeliveryAdressDialog";
import { ShoppingCart, User } from "lucide-react";

export const Navbar = () => {
  return (
    <div className="w-[100%] h-[68px] bg-[#18181B] flex items-center p-[48px]">
      <div className="flex justify-between w-[100%] ">
        <div className="flex">
          <img
            src="https://res.cloudinary.com/duazor4ye/image/upload/v1750384072/Screenshot_2024-12-17_at_18.02.18_1_Traced_pqggwe.png"
            alt="Logo"
            className=" w-[46px] h-[37.29px] object-cover"
          />
          <div className="flex flex-col">
            <div className="text-[#F4F4F5]">NomNom</div>
            <div className="text-[#F4F4F5]">Swift delivery</div>
          </div>
        </div>
        <div>
          <DeliveryAddressDialog />
          {/* <ShoppingCart />
          <User /> */}
        </div>
      </div>
    </div>
  );
};
