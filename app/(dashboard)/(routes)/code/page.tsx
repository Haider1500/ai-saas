"use client";

import Heading from "@/components/Header";
import * as z from "zod";
import axios from "axios";
import ReactMarkDown from "react-markdown";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";

import { CodeIcon, MessageSquareIcon } from "lucide-react";
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
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";

const CodePage = () => {
  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const userMessage: ChatCompletionMessageParam = {
        role: "user",
        content: values.prompt,
      };

      const newMessages = [...messages, userMessage];

      const response = await axios.post("/api/code", {
        messages: newMessages,
      });

      setMessages((current) => [...current, userMessage, response.data]);

      console.log(response.data, "data");
    } catch (error) {
      console.log(error, "error in sending request");
    } finally {
      router.refresh();
    }
  }

  return (
    <div>
      <Heading
        title="Code"
        description="Get the code for your query"
        icon={CodeIcon}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
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
                        placeholder="Create a button using shadcn"
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
          s
          {messages.length === 0 && !isLoading && (
            <Empty label="No conversation started" />
          )}
          <div className=" flex flex-col-reverse gap-y-4">
            {messages.map((message: any) => (
              <div
                key={message.content}
                className={cn(
                  "p-8 w-full flex items-start rounded-lg gap-x-8",
                  message.role === "user"
                    ? "bg-white border border-black/10"
                    : "bg-muted"
                )}
              >
                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                <ReactMarkDown
                  components={{
                    pre: ({ node, ...props }) => (
                      <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                        <pre {...props} />
                      </div>
                    ),
                    code: ({ node, ...props }) => (
                      <code
                        className="bg-black/10 rounded-lg p-1"
                        {...props}
                      ></code>
                    ),
                  }}
                  className="text-sm overflow-hidden leading-7"
                >
                  {message.content || ""}
                </ReactMarkDown>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodePage;
