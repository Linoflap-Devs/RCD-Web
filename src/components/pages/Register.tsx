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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "../ui/use-toast";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { BranchesItem, getBranches } from "@/services/branches/branches.api";
import { registerEmployee } from "@/services/auth/auth.api";
import { Eye, EyeOff } from "lucide-react";

const formSchema = z.object({
  userCode: z.string().min(1, "Please enter user code"),
  userName: z.string().min(1, "Please enter username"),
  empName: z.string().min(1, "Please enter name"),
  role: z.string().min(1, "Please enter role"),
  branchId: z.string().min(1, "Please select a branch"),
  password: z.string().min(1, {
    message: "Please enter password.",
  }),
});

export default function RegistrationForm() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [branches, setBranches] = useState<BranchesItem[]>([]);
  const [errorBranches, setErrorBranches] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        setLoading(true);
        const res = await getBranches();
        setBranches(res.data);
        //console.log("Branches fetched:", res.data);
      } catch (err: any) {
        console.error("Failed to fetch branches:", err);
        setErrorBranches(err.message || "Failed to fetch branches");
      } finally {
        setLoading(false);
      }
    };

    fetchBranches();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userCode: "",
      userName: "",
      empName: "",
      role: "",
      branchId: "",
      password: "",
    },
  });

  const roleOptions = [
    { label: "ADMIN", value: 1 },
    { label: "SALES ADMIN", value: 2 },
    { label: "ACCOUNTING STAFF", value: 3 },
    { label: "MANAGEMENT LEVEL", value: 4 },
    { label: "BRANCH SALES STAFF", value: 5 },
    { label: "HO SALES STAFF", value: 6 },
  ];

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);

      const payload = {
        ...values,
        branchID: Number(values.branchId),
      };

      const response = await registerEmployee(payload);

      toast({
        title: "Account Created!",
        description: `User registered successfully for branch ID: ${values.branchId}`,
        variant: "success",
      });

      router.push("/");
    } catch (error: any) {
      console.error("Registration error:", error);

      if (error.response) {
        console.error("API Error Response:", {
          status: error.response.status,
          data: error.response.data,
        });
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Unexpected error:", error.message);
      }

      toast({
        title: "Registration Failed",
        description: error.message || "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-muted-foreground text-sm">
            Fill in the form below to create your account
          </p>
        </div>

        <div className="grid gap-6">
          {/* User Code */}
          <FormField
            control={form.control}
            name="userCode"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className={cn(fieldState.error && "text-red-500")}>
                  User Code
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter user code"
                    {...field}
                    className={cn(
                      fieldState.error &&
                        "border-red-500 ring-red-500 focus-visible:ring-red-200"
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Username */}
          <FormField
            control={form.control}
            name="userName"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className={cn(fieldState.error && "text-red-500")}>
                  Username
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter username"
                    {...field}
                    className={cn(
                      fieldState.error &&
                        "border-red-500 ring-red-500 focus-visible:ring-red-200"
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Name */}
          <FormField
            control={form.control}
            name="empName"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className={cn(fieldState.error && "text-red-500")}>
                  Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter name"
                    {...field}
                    className={cn(
                      fieldState.error &&
                        "border-red-500 ring-red-500 focus-visible:ring-red-200"
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Role */}
          <FormField
            control={form.control}
            name="role"
            render={({ field, fieldState }) => (
              <FormItem className="w-full gap-2 mt-1">
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(selectedLabel) =>
                      field.onChange(selectedLabel)
                    }
                    value={field.value}
                  >
                    <SelectTrigger
                      className={cn(
                        "w-full rounded-md h-10 gap-2",
                        fieldState.invalid
                          ? "border-red-500 focus:ring-red-500"
                          : "border-[#E0E0E0]"
                      )}
                    >
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roleOptions.map((role) => (
                        <SelectItem key={role.value} value={role.label}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Branch Selection */}
          <FormField
            control={form.control}
            name="branchId"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className={cn(fieldState.error && "text-red-500")}>
                  Branch
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={isLoading || branches.length === 0}
                  >
                    <SelectTrigger
                      className={cn(
                        "w-full rounded-md h-10",
                        fieldState.invalid &&
                          "border-red-500 focus:ring-red-500"
                      )}
                    >
                      <SelectValue
                        placeholder={
                          isLoading ? "Loading branches..." : "Select a branch"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {branches.map((branch, index) => {
                        const branchId =
                          branch.BranchID ?? branch.branchID ?? index; // fallback
                        const branchName =
                          branch.BranchName ??
                          branch.branchName ??
                          "Unnamed Branch";

                        return (
                          <SelectItem key={branchId} value={String(branchId)}>
                            {branchName}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Create Account"}
          </Button>
        </div>

        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/" className="underline underline-offset-4">
            Log in
          </Link>
        </div>
      </form>
    </Form>
  );
}
