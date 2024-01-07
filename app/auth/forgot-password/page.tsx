"use client";

import { NavWrapper } from "@/components/nav-parent";
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
import auth from "@/lib/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  email: z.string().email(),
});

export default function ForgetPasswordPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const [emailSent, setEmailSent] = useState(false);

  const router = useRouter();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const email = values.email.valueOf() as string;
    try {
      const res = await auth.forgotPassword(email);
      if (res == true) {
        setEmailSent(true);
      } else {
        form.setError("root.serverCatch", {
          type: "server",
          message: "Invalid Email",
        });
      }
    } catch (e) {
      form.setError("root.serverCatch", {
        type: "server",
        message: "Something went wrong. Please try again.",
      });
    }
  }

  return (
    <>
      <Image
        src={"/onboarding-fig-2.png"}
        alt="onboarding figure 2"
        width={245.5}
        height={180.7}
        className={`${
          !emailSent ? "bottom-28" : "top-8"
        } md:bottom-10 right-0  fixed -z-50 max-w-md opacity-40`}
        priority
      />
      <Image
        src={"/onboarding-fig-1.png"}
        alt="onboarding figure 1"
        width={290}
        height={343}
        className={`w-3/4 bottom-0 left-0 translate-y-1/4  fixed -z-50 max-w-md opacity-40`}
        priority
      />
      <div className="fixed inset-x-0 top-0 -translate-y-8">
        <NavWrapper>
          <div className="flex items-center text-primary gap-2">
            <Link href={"/auth"}>
              <button className="translate-y-[2px]">
                <ArrowLeft size={20} className="text-neutral-700" />
              </button>
            </Link>

            <h1 className="text-neutral-700">Forgot Password</h1>
          </div>
        </NavWrapper>
      </div>

      <div className="pt-14"></div>

      {emailSent ? (
        <CheckCircle2 size={44} className="text-blu mx-auto" />
      ) : (
        <Image
          src={"/Logo.png"}
          alt={"brds"}
          width={273}
          height={78}
          className=" mx-auto w-56"
        />
      )}

      <p className="text-lg text-neutral-700 max-w-[30ch] mx-auto text-center pt-5 leading-snug">
        {!emailSent ? (
          "We’ll send a password reset link on your registed email"
        ) : (
          <>
            A password reset email has been sent to{" "}
            <span className="text-blu">{form.getValues().email}</span>
          </>
        )}
      </p>

      {!emailSent && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 container max-w-lg flex flex-col flex-1 px-8"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-[#525252]">
                      Email<span className="text-[#EF4E4E]">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="fizz@buzz.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            {form.formState.errors.root &&
              form.formState.errors.root.serverCatch && (
                <p className="text-red-400">
                  {form.formState.errors.root.serverCatch.message}
                </p>
              )}
            <Button className="bg-blu rounded-full w-full hover:bg-blu hover:brightness-110 transition-all text-sm font-medium ">
              Proceed
            </Button>
          </form>
        </Form>
      )}

      {emailSent && (
        <>
          <div className="pt-8 text-center px-8 space-y-8 max-w-lg mx-auto">
            <Button className="bg-blu rounded-full w-full hover:bg-blu hover:brightness-110 transition-all text-base ">
              Open Email
            </Button>
            <div className="">
              <Link href={"/auth"} className="text-blu underline mx-auto ">
                Back to Login
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}
