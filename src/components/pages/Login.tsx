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
import { getCurrentUser, LoginResponse, loginUser } from "@/services/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "../ui/use-toast";
import { useAuth } from "@/store/useAuth";

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
      const response: LoginResponse = await loginUser(values);
      //console.log("login response", response);

      if (response.success) {
        toast({
          title: "Login Successful",
          variant: "success",
          description: `Welcome back, ${response.data.username}!`,
        });

        //sessionStorage.setItem("username", response.data.username);

        try {
          const currentUser = await getCurrentUser();
          //console.log("Fetched currentUser:", currentUser);

          if (currentUser) {
            useAuth.getState().setUser(currentUser);
            //console.log("Zustand store user:", useAuth.getState().user);
          }
        } catch (err) {
          console.error("Error fetching current user:", err);
        }

        router.push("/dashboard");
      } else {
        setErrorMessage(response.message || "Invalid Credentiials, please try again.");
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      if (axiosError?.response?.status === 401) {
        setErrorMessage(
          "Invalid credentials, please check your email and password."
        );
        toast({
          title: "Error",
          variant: "destructive",
          description: `Invalid credentials, please check your email and password.`,
        });
      } else if (axiosError?.response?.status === 500) {
        setErrorMessage(
          "Internal server error. Please try again later or contact support."
        );
        toast({
          title: "Error",
          variant: "destructive",
          description: `Internal server error. Please try again later or contact support.`,
        });
      } else {
        setErrorMessage(
          "An unexpected error occurred. Please try again later."
        );
        toast({
          title: "Error",
          variant: "destructive",
          description: `An unexpected error occurred. Please try again later.`,
        });
      }
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
          <a href="#" className="underline underline-offset-4">
            Sign up
          </a>
        </div>
      </form>
    </Form>
  );
}
