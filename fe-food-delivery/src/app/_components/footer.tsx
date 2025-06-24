import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white text-sm">
      {/* 🔴 Top announcement bar */}
      <div className="bg-[#e53935] text-center py-2 font-semibold tracking-wide uppercase">
        <div className="animate-marquee whitespace-nowrap">
          Fresh fast delivered • Fresh fast delivered • Fresh fast delivered •
          Fresh fast delivered
        </div>
      </div>

      {/* 🧱 Main content */}
      <div className="px-6 py-12 md:px-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* 🍔 Logo + tagline */}
        <div>
          <div className="text-2xl font-bold text-white mb-2">NomNom</div>
          <p className="text-gray-400">
            Swift delivery. Fresh meals at your door.
          </p>
        </div>

        {/* 🗂 NOMNOM Section */}
        <div>
          <h4 className="font-semibold text-white mb-3">NOMNOM</h4>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="#" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Contact us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Delivery zone
              </a>
            </li>
          </ul>
        </div>

        {/* 🍽 Menu Section */}
        <div>
          <h4 className="font-semibold text-white mb-3">Menu</h4>
          <ul className="space-y-2 text-gray-400 grid grid-cols-2 gap-x-6">
            <li>
              <a href="#" className="hover:text-white">
                Appetizers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Salads
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Pizzas
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Main dishes
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Desserts
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Side dish
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Brunch
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Beverages
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Fish & Seafood
              </a>
            </li>
          </ul>
        </div>

        {/* 🔗 Social Media */}
        <div>
          <h4 className="font-semibold text-white mb-3">Follow us</h4>
          <div className="flex gap-4 text-gray-300">
            <a href="#" aria-label="Facebook" className="hover:text-white">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-white">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-white">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* 📄 Bottom Legal Section */}
      <div className="border-t border-gray-800 text-gray-500 px-6 md:px-20 py-6 flex flex-col md:flex-row items-center justify-between text-xs">
        <span>© {new Date().getFullYear()} NomNom LLC</span>
        <div className="flex gap-4 mt-2 md:mt-0">
          <a href="#" className="hover:underline">
            Privacy policy
          </a>
          <a href="#" className="hover:underline">
            Terms and conditions
          </a>
          <a href="#" className="hover:underline">
            Cookie policy
          </a>
        </div>
      </div>
    </footer>
  );
}
