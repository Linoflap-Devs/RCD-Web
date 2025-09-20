"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  username: z.string().min(1, "Please enter username"),
  password: z.string().min(1, {
    message: "Please enter password.",
  }),
});

export default function Login() {
  const [isLoading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Handle submit
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    console.log("Login values:", values);

    // TODO: Replace with API call
    setTimeout(() => {
      setLoading(false);
      alert("Logged in!");
    }, 1000);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-wrap">
            Enter your username below to login to your account
          </p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="username"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel
                    className={`${fieldState.error ? "text-red-500" : ""
                      }`}
                  >
                    Username
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="m@example.com"
                        {...field}
                        className={` ${fieldState.error
                          ? "border-red-500 ring-red-500 focus-visible:ring-red-200 focus-visible:border-red-500"
                          : ""
                          }`}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-3">

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel
                      className={`${fieldState.error ? "text-red-500" : ""}`}
                    >
                      Password
                    </FormLabel>
                    <a
                      href="#"
                      className="text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      {...field}
                      className={`${fieldState.error
                          ? "border-red-500 ring-red-500 focus-visible:ring-red-200 focus-visible:border-red-500"
                          : ""
                        }`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>

              )}
            />
          </div>
          <Button type="submit" className="w-full" >
            {isLoading ? "Logging in..." : "Log in"}
          </Button>
        </div>
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <a href="#" className="underline underline-offset-4">
            Sign up
          </a>
        </div>
      </form>
    </Form>
  );
}
