"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";

const cards = [
  {
    id: 1,
    title: "Create Your Personal Website",
    description:
      "Build beautiful, responsive websites with our intuitive drag-and-drop builder",
    image: "/assets/personal-portfolio.png",
  },
  {
    id: 2,
    title: "Launch Your Business Portfolio",
    description:
      "Start your online presence with professional templates and easy customization",
    image: "/assets/store-portfolio.png",
  },
];

const CreateNew = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        className="cursor-pointer bg-transparent border-white text-white hover:backdrop-blur-xl hover:bg-transparent hover:text-white"
        size="lg"
        variant="outline"
        onClick={() => setOpen(true)}
      >
        Get Started
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Choose Your Template</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {cards.map((card) => (
              <Card
                key={card.id}
                className="overflow-hidden transition-all hover:shadow-lg cursor-pointer bg-gray-50"
              >
                <div className="aspect-video w-full relative">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <CardHeader>
                  <CardTitle>{card.title}</CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between">
                  <Button size="default" className="w-full cursor-pointer">
                    Create Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        <div className=" px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="button"
            data-autofocus
            onClick={() => setOpen(false)}
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
};

export default CreateNew;
