import React from "react";
import { Link } from "react-router-dom";

const popularBrands = [
  {
    name: "Amazon",
    logoText: "Amazon Pay",
    bgColor: "bg-amber-50",
    textColor: "text-amber-700",
    borderColor: "border-amber-200",
    query: "Amazon"
  },
  {
    name: "Google Play",
    logoText: "Google Play",
    bgColor: "bg-emerald-50",
    textColor: "text-emerald-700",
    borderColor: "border-emerald-200",
    query: "Google Play"
  },
  {
    name: "Steam",
    logoText: "Steam",
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
    borderColor: "border-blue-200",
    query: "Steam"
  },
  {
    name: "Netflix",
    logoText: "Netflix",
    bgColor: "bg-red-50",
    textColor: "text-red-600",
    borderColor: "border-red-200",
    query: "Netflix"
  },
  {
    name: "Spotify",
    logoText: "Spotify",
    bgColor: "bg-green-50",
    textColor: "text-green-600",
    borderColor: "border-green-200",
    query: "Spotify"
  },
  {
    name: "Starbucks",
    logoText: "Starbucks",
    bgColor: "bg-teal-50",
    textColor: "text-teal-800",
    borderColor: "border-teal-200",
    query: "Starbucks"
  },
  {
    name: "Nike",
    logoText: "Nike",
    bgColor: "bg-slate-50",
    textColor: "text-slate-800",
    borderColor: "border-slate-200",
    query: "Nike"
  },
  {
    name: "Apple",
    logoText: "Apple Store",
    bgColor: "bg-indigo-50",
    textColor: "text-indigo-700",
    borderColor: "border-indigo-200",
    query: "Apple"
  }
];

const ShopByBrandSection = () => {
  return (
    <section className="py-8 bg-white">
      <div className="max-w-[86rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-16 sm:w-24 bg-slate-200"></span>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-800 text-center whitespace-nowrap">
              Shop by Brand
            </h2>
            <span className="h-px w-16 sm:w-24 bg-slate-200"></span>
          </div>
          <p className="text-center text-slate-500 text-sm mt-1">
            Get instant gift cards and vouchers from your favorite global brands
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {popularBrands.map((brand, idx) => (
            <Link
              key={idx}
              to={`/search?q=${encodeURIComponent(brand.query)}`}
              className={`flex flex-col items-center justify-center p-5 rounded-xl border ${brand.borderColor} ${brand.bgColor} hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group`}
            >
              <div className={`text-lg sm:text-xl font-black ${brand.textColor} tracking-tight select-none`}>
                {brand.logoText}
              </div>
              <span className="text-[11px] font-semibold text-slate-400 mt-2 group-hover:text-slate-600 transition-colors">
                View Vouchers
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByBrandSection;
