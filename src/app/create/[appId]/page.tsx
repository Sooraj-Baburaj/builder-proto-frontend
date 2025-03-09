import React from "react";

import Navbar from "@/components/Navbar";
import RenderForm from "@/components/CreateForms/RenderForm";

const CreateApp = async ({
  params,
}: {
  params: Promise<{ appId: string }>;
}) => {
  const { appId } = await params;
  return (
    <>
      <div className="w-full h-screen select-none">
        <Navbar textBlack />
        <div className="container mx-auto h-full px-4 flex flex-col justify-center max-w-2xl">
          <RenderForm appId={appId} />
        </div>
      </div>
    </>
  );
};

export default CreateApp;
