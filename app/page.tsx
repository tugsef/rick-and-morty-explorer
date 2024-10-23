import Home from "@/components/home";
import React from "react";
import logo from "@/public/Rick_and_Morty.svg";
import Image from "next/image";
function Page() {
  return (
    <div className="relative h-screen">
      <Home />
      <Image
              fill

        className="fixed inset-0 -z-10 w-full h-full object-cover opacity-50"
        src={logo}
        alt="Ricky and Martin"
        quality={100}
        sizes="100vw"
      
      />
    </div>
  );
}

export default Page;
