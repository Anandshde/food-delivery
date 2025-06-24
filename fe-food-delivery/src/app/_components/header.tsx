import { Navbar } from "./navbar";
import Image from "next/image";

export const Header = () => {
  return (
    <div>
      <Navbar />
      <div className="relative w-[100%] h-[570px] overflow-hidden">
        <img
          src="https://res.cloudinary.com/duazor4ye/image/upload/v1750382004/BG_sbh1af.png"
          alt="Hero Background"
          className="absolute top-0 left-0 w-[100%] h-[570px] object-cover"
        />
      </div>
    </div>
  );
};
