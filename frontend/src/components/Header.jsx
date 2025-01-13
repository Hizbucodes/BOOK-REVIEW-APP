import React from "react";

const Header = () => {
  return (
    <header className="bg-[#f4f2e9] w-full flex items-center justify-between px-4 md:px-12 h-20 py-8">
      <h1 className="text-2xl md:text-4xl text-[#8b8262] tracking-wide">
        Read<span className="text-yellow-800">Ripple</span>
      </h1>

      <button className="bg-[#f4f2e9] border-2 border-[#cfc9af] rounded-lg px-2 py-0.5 w-[5rem] md:w-[8rem] font-medium">
        Login
      </button>
    </header>
  );
};

export default Header;
