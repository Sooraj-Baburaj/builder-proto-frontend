"use client";
import React, { useState } from "react";
import FormOne from "../AppOne";
import FormTwo from "../AppTwo";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Modal from "@/components/ui/modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createWebsite } from "./api";
import { toast } from "sonner";

const RenderForm = ({ appId }: { appId: string }) => {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  const handleFormSubmit = (values: any) => {
    setContent(values);
    setModalOpen(true);
  };

  const renderForm = () => {
    switch (appId) {
      case "dspxp64vrlzom":
        return <FormOne handleSubmit={handleFormSubmit} />;
      case "d1elbr6as5bi46":
        return <FormTwo handleSubmit={handleFormSubmit} />;
      default:
        return null;
    }
  };
  const router = useRouter();

  const formSchema = z.object({
    name: z
      .string()
      .min(1, { message: "Name must be at least 1 character long" })
      .max(20, { message: "Name must be at most 20 characters long" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    const response = await createWebsite({
      appId,
      name: values.name,
      content,
    });
    if (response.status === 200) {
      const url = response.data.domain.startsWith("http")
        ? response.data.domain
        : `https://${response.data.domain}`;

      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      toast.error(response.data.error ?? "An error occurred");
    }
    setLoading(false);
  };

  return (
    <>
      <div className="flex items-center mb-6">
        <Button
          onClick={() => router.back()}
          className="mr-2 cursor-pointer"
          variant={"outline"}
        >
          <ArrowLeft className="w-6 h-6 " />
        </Button>
        <h2 className="text-3xl font-bold">Create a New App</h2>
      </div>
      {renderForm()}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Name Your Website</h2>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Taylor Smith" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              {loading ? <Loader2 className="animate-spin" /> : null} Submit
            </Button>
          </form>
        </Form>
      </Modal>
    </>
  );
};

export default RenderForm;
