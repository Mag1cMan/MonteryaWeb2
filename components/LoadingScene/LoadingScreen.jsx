import React from "react";
import Image from 'next/image'

const LoadingScreen = () => {
  return (
    <div className="relative min-h-screen w-full">
      <Image
        //src="/rabbit_nobg.png"
        alt="Rabbit Image"
        layout="fill"
        objectFit="cover"
      />
      <div className="absolute inset-0 h-full w-full bg-gray-900/60" />
      <div className="grid min-h-screen px-8">
        <div className="flex justify-center items-center min-h-screen">
          <div className="loader" />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
