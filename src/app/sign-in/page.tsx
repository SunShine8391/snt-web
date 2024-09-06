"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import routes from "@/config/routes";
import { SupabaseContext } from "@/lib/hooks/providers/supabase-provider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast, Toaster } from "sonner";

export const userLoginFormSchema = z.object({
  emailAddress: z.string({ required_error: "Email address is required" }),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have more than 8 characters"),
});

export type UserLoginFormData = z.infer<typeof userLoginFormSchema>;

const SignInPage = () => {
  const router = useRouter();
  const { supabaseClient, setSession } = useContext(SupabaseContext);
  const loginForm = useForm<UserLoginFormData>({
    resolver: zodResolver(userLoginFormSchema),
  });

  async function onSubmit(values: UserLoginFormData) {
    try {
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: values.emailAddress,
        password: values.password,
      });

      if (error) {
        toast.error(error.message);
      }

      if (data) {
        await supabaseClient
          .rpc("get_user_list", {
            search_param: values.emailAddress,
            page_size: 100,
            page_offset: 0,
          })
          .then((res) => {
            if (res.data[0].role_id === "admin") {
              router.push(routes.secure.admin);
            } else {
              router.push(res.data[0].route);
            }
          });
        const {
          data: { session },
        } = await supabaseClient.auth.getSession();
        setSession(session);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      className="h-full flex flex-col justify-center items-center gap-8 px-2 pt-16"
      style={{ height: "calc(100vh - 60px)" }}
    >
      <h1>Welcome to S&amp;T Biotech</h1>
      <Form {...loginForm}>
        <form
          onSubmit={loginForm.handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-2 max-w-sm xl:max-w-md"
        >
          <FormField
            control={loginForm.control}
            name="emailAddress"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Email"
                    className="h-12 text-base"
                    {...field}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={loginForm.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Password"
                    className="h-12 text-base"
                    {...field}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full h-12 mt-2">
            Sign In
          </Button>
          <Link
            href={routes.base.passwordResetEmail}
            className="underline text-end"
          >
            Forgot Password
          </Link>
        </form>
      </Form>
      <Toaster richColors position="top-right" />
    </div>
  );
};

export default SignInPage;
