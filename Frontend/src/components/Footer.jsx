import React from "react";

function Footer() {
  return (
    <div className="bg-gray-900 w-full relative flex flex-col items-center">
      <div className="logo">
        <span className="text-green-600 font-bold text-2xl">
          &lt;<span className="text-white ">Pass</span>OP/&gt;
        </span>
      </div>
      <div className="greeting flex items-center justify-center ">
        <p className="text-white">
          Created with <i className="ri-heart-3-fill text-red-600 text-xl"></i> by
          Gaurish{" "}
        </p>
      </div>
    </div>
  );
}

export default Footer;
