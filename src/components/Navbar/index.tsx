import React from "react";

import { Exo_2 } from "next/font/google";

const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-exo2",
});

const Navbar = () => {
  return (
    <nav className="w-full h-16 fixed top-0 left-0 z-10">
      <div className="w-full h-full flex items-center justify-between">
        <div className="w-1/2 h-full flex items-center justify-start px-16">
          <h1 className={`${exo2.className} text-2xl font-bold text-white`}>
            Builder
          </h1>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
