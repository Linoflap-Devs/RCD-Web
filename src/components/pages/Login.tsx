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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "../ui/use-toast";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { LoginResponse, loginUser } from "@/services/auth/auth.api";

const formSchema = z.object({
  username: z.string().min(1, "Please enter username"),
  password: z.string().min(1, {
    message: "Please enter password.",
  }),
});

export default function Login() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [isErrorMessage, setErrorMessage] = useState<string | null>(null)
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
    setErrorMessage("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
        credentials: "include", // important for cookies
      });

      const cookieResponse = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("Invalid credentials, please check your email and password.");
        } else if (res.status === 500) {
          throw new Error("Internal server error. Please try again later or contact support.");
        } else {
          throw new Error(cookieResponse?.message || "An unexpected error occurred.");
        }
      }

      const response: LoginResponse = await loginUser(values);

      toast({
        title: "Login Successful",
        variant: "success",
        description: `Welcome back, ${response.data.username || "User"}!`,
      });

      router.push("/dashboard");

    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again later.";

      setErrorMessage(message);
      toast({
        title: "Error",
        variant: "destructive",
        description: message,
      });
    } finally {
      setLoading(false);
    }
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
                        placeholder="Enter Username"
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
                  </div>

                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        {...field}
                        className={`pr-10 ${fieldState.error
                          ? "border-red-500 ring-red-500 focus-visible:ring-red-200 focus-visible:border-red-500"
                          : ""
                          }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                        tabIndex={-1} // prevents focus stealing when tabbing through fields
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log in"}
          </Button>
        </div>
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="underline underline-offset-4">
            Sign up
          </Link>
        </div>
      </form>
    </Form>
  );
}
