"use client";

import Heading from "@/components/Header";
import * as z from "zod";
import axios from "axios";

import { MusicIcon, VideoIcon } from "lucide-react";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Empty } from "@/components/Empty";
import { Loading } from "@/components/Loading";
import { useProModal } from "@/app/hooks/use-pro-modal";

const videoPage = () => {
  const [video, setVideo] = useState<string>();
  const router = useRouter();
  const proModal = useProModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setVideo(undefined);

      const response = await axios.post("/api/video", values);

      setVideo(response.data[0]);
      form.reset();
      console.log(response.data[0], "data");
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      }
      console.log(error, "error in sending request");
    } finally {
      router.refresh();
    }
  }

  return (
    <div>
      <Heading
        title="Video Generation"
        description="Turn your prompt to a Video"
        icon={VideoIcon}
        iconColor="text-red-500"
        bgColor="bg-red-500/10"
      ></Heading>
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="focus-within:shadow-sm border w-full p-4 grid grid-cols-12 px-3 md:px-6 rounded-lg gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="p-0 m-0">
                      <Input
                        className="border-0 outline-none  focus-visible:ring-0 focus-visible:ring-transparent"
                        placeholder="beach view with sunset"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="lg:col-span-2 col-span-12 w-full"
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="mt-4 space-y-4">
          {isLoading && (
            <div className="p-8 rounded-lg bg-muted flex items-center justify-center">
              <Loading />
            </div>
          )}
          {!video && !isLoading && <Empty label="No music generated" />}
          {video && (
            <video
              controls
              className="w-full mt-8 border bg-black aspect-video rounded-lg"
            >
              <source src={video} />
            </video>
          )}
        </div>
      </div>
    </div>
  );
};

export default videoPage;
