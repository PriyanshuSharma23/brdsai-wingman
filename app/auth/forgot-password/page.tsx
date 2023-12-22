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
  });

  const [emailSent, setEmailSent] = useState(false);

  const router = useRouter();
  function onSubmit(values: z.infer<typeof formSchema>) {
    setEmailSent(true);
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
        } md:bottom-10 right-0  fixed -z-50 max-w-md`}
        priority
      />
      <Image
        src={"/onboarding-fig-1.png"}
        alt="onboarding figure 1"
        width={290}
        height={343}
        className={`w-3/4 bottom-0 left-0 translate-y-1/4  fixed -z-50 max-w-md `}
        priority
      />
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

      <div className="pt-32 md:pt-20"></div>
      {emailSent && <div className="pt-20"></div>}

      {emailSent ? (
        <CheckCircle2 size={44} className="text-blu mx-auto" />
      ) : (
        <Image
          src={"/Logo.png"}
          alt={"brds"}
          width={273}
          height={78}
          className=" mx-auto "
        />
      )}

      <p className="text-lg text-neutral-700 max-w-[30ch] mx-auto text-center pt-5">
        {!emailSent ? (
          "We’ll send a password reset link on your registed email"
        ) : (
          <>
            A password reset email has been sent to{" "}
            <span className="text-blu">naman@techbrig.co</span>
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
                    <FormLabel>Email*</FormLabel>
                    <FormControl>
                      <Input placeholder="fizz@buzz.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <Button className="bg-blu rounded-full w-full hover:bg-blu hover:brightness-110 transition-all text-base">
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
