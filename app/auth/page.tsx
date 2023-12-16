"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { type Dispatch, useState, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

type LoginState = "login" | "sign up";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5).max(24),
});

const Auth = () => {
  const [loginState, setLoginState] = useState<LoginState>("login");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {}

  return (
    <main className="relative">
      <Image
        src={"/onboarding-fig-1.png"}
        alt="onboarding figure 1"
        width={290}
        height={343}
        className="w-2/3 -translate-y-1/2 absolute -z-50"
        priority
      />

      <Image src={"/Logo.png"} alt={"brds"} width={273} height={78} />

      <Switch loginState={loginState} setLoginState={setLoginState} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Email*</FormLabel>
                  <FormControl>
                    <Input placeholder="fizz@buzz.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <div>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter a secure password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <Button variant={"link"} className="p-0 text-blu">
              Forgot Password?
            </Button>
          </div>
        </form>
      </Form>
    </main>
  );
};

export default Auth;

type SwitchProps = {
  loginState: LoginState;
  setLoginState: Dispatch<SetStateAction<LoginState>>;
};
const Switch = (props: SwitchProps) => {
  const toggle = () => {
    props.setLoginState((prev) => {
      if (prev === "login") {
        return "sign up";
      } else {
        return "login";
      }
    });
  };
  return (
    <button
      onClick={toggle}
      className="h-8 bg-slate-100 flex max-w-max items-center text-center relative isolate rounded-full text-primary  text-sm gap-2"
    >
      <p className={cn("w-16 transition-all translate-x-1")}>Login</p>
      <p className={cn("w-16 transition-all -translate-x-1")}>Sign Up</p>
      <div
        className="bg-white h-6 w-16 absolute -z-10 rounded-full transition-all"
        style={{
          left: props.loginState === "login" ? "4px" : `calc(100% - 68px)`,
        }}
      ></div>
    </button>
  );
};
