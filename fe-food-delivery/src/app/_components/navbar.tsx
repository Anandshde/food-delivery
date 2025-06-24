import { DeliveryAddressDialog } from "./DeliveryAdressDialog";
import { ShoppingCart, User } from "lucide-react";

export const Navbar = () => {
  return (
    <div className="w-full h-[68px] bg-[#18181B] flex items-center px-12">
      <div className="flex justify-between w-full items-center">
        {/* Logo & Text */}
        <div className="flex items-center space-x-3">
          <img
            src="https://res.cloudinary.com/duazor4ye/image/upload/v1750384072/Screenshot_2024-12-17_at_18.02.18_1_Traced_pqggwe.png"
            alt="Logo"
            className="w-[46px] h-[37.29px] object-cover"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-white text-sm font-semibold">NomNom</span>
            <span className="text-gray-300 text-xs">Swift delivery</span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-6">
          <DeliveryAddressDialog />
          <ShoppingCart className="text-black cursor-pointer bg-[#F4F4F5] rounded-full h-9 w-9 p-1" />

          <User className="text-white cursor-pointer bg-[#EF4444] rounded-full h-9 w-9 p-1" />
        </div>
      </div>
    </div>
  );
};
