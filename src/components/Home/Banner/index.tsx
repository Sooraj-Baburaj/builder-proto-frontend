import React from "react";

import Navbar from "@/components/Navbar";
import Iridescence from "@/components/WebGL/Iridescence";
import CreateNew from "./CreateNew";

export interface Template {
  _id: string;
  name: string;
  amplifyAppId: string;
  description: string;
  structure: any;
  createdAt: string;
  __v: number;
}

interface HomeBannerProps {
  isConnected: boolean;
  templates: Template[];
}

const HomeBanner = ({ isConnected, templates }: HomeBannerProps) => {
  return (
    <div className="w-full h-screen select-none">
      <Navbar />
      <section className="w-full h-screen relative z-10">
        <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
          <h1 className="text-7xl font-bold text-white">
            Build without Limits
          </h1>
          <CreateNew templates={templates} />
        </div>
      </section>
      <div className="w-full h-screen absolute top-0 left-0">
        <Iridescence
          color={[1, 1, 1]}
          mouseReact={false}
          amplitude={0.1}
          speed={1.0}
        />
      </div>
      <div className="absolute bottom-0 right-0 z-20 p-4 flex items-center gap-2">
        <p className="text-white text-sm">Connected to Backend</p>
        <div
          className={`w-2 h-2 rounded-full animate-ping ${
            isConnected ? "bg-green-500" : "bg-red-500"
          }`}
        ></div>
      </div>
    </div>
  );
};

export default HomeBanner;
