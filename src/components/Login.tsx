"use client";

import { Button } from "@./components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@./components/ui/form";
import { Input } from "@./components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed, Info, LockIcon, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  username: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Please enter a password.",
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
    <div>
      <div className="pb-1">
        {/* <Image
          src="/logo-vector.png"
          alt="RCD Logo"
          width={70}
          height={70}
          className="object-contain pr-3"
        /> */}
        <h2 className="flex text-2xl font-bold text-[#D75C3C] mb-1">
          Login
        </h2>
        <h2 className="flex text-sm text-[#9E9E9E] text-bold mb-6">
          Please log in to your account
        </h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel
                  className={`text-sm ${fieldState.error ? "text-red-600" : "text-[#424242]"
                    }`}
                >
                  Username
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <User
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={14}
                    />
                    <Input
                      type="text"
                      placeholder="Enter username"
                      {...field}
                      className={`h-10 text-sm pl-10 pr-3 focus-visible:ring-gray-200 focus-visible:border-gray-300 rounded-xl ${fieldState.error
                          ? "border-red-500 ring-red-500 focus-visible:ring-red-200 focus-visible:border-red-500"
                          : ""
                        }`}
                    />
                  </div>
                </FormControl>

                {fieldState.error && (
                  <div className="text-xs flex items-center gap-1">
                    <Info className="w-4 h-4 text-red-500" />
                    <span className="ml-1 text-red-500">{fieldState.error.message}</span>
                  </div>
                )}

              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel
                  className={`text-sm ${fieldState.error ? "text-red-600" : "text-[#424242]"
                    }`}
                >
                  Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <LockIcon
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={14}
                    />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      {...field}
                      className={`h-10 text-sm pl-10 pr-10 focus-visible:ring-gray-200 focus-visible:border-gray-300 rounded-xl ${fieldState.error
                          ? "border-red-500 ring-red-500 focus-visible:ring-red-200 focus-visible:border-red-500"
                          : ""
                        }`}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-400 focus:outline-none"
                    >
                      {showPassword ? (
                        <EyeClosed size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                </FormControl>
                {fieldState.error && (
                  <div className="text-xs flex items-center gap-1">
                    <Info className="w-4 h-4 text-red-500" />
                    <span className="ml-1 text-red-500">{fieldState.error.message}</span>
                  </div>
                )}

                <div className="flex justify-end mt-1">
                  <button
                    type="button"
                    className="text-xs font-medium text-[#D75C3C] hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
              </FormItem>
            )}
          />

          {/* Submit */}
          <Button
            type="submit"
            className="w-full rounded-xl h-10 mt-2 text-sm bg-[#D75C3C] hover:bg-[#D75C3C]/90"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log in"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
