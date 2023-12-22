"use client";

import Image from "next/image";
import { NavWrapper } from "@/components/nav-parent";
import { ArrowLeft, RotateCw } from "lucide-react";
import Link from "next/link";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

const verifyPasswordSchema = z.object({
  code: z.number().gte(1000).lte(9999),
});

const Verify = () => {
  const form = useForm<z.infer<typeof verifyPasswordSchema>>({
    resolver: zodResolver(verifyPasswordSchema),
  });

  function onSubmit(values: z.infer<typeof verifyPasswordSchema>) {}

  return (
    <>
      <NavWrapper>
        <div className="flex items-center text-primary gap-2">
          <Link href={"/auth"}>
            <button className="translate-y-[2px]">
              <ArrowLeft size={20} className="text-neutral-700" />
            </button>
          </Link>

          <h1 className="text-neutral-700">Verify Email</h1>
        </div>
      </NavWrapper>
      <div className="pt-20"></div>
      <Image
        src={"/Logo.png"}
        alt={"brds"}
        width={273}
        height={78}
        className=" mx-auto "
      />
      <p className="text-lg text-neutral-700 max-w-[30ch] mx-auto text-center pt-5">
        A password reset email has been sent to{" "}
        <span className="text-blu">naman@techbrig.co</span>
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 container max-w-lg flex flex-col flex-1 px-8"
        >
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Code*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="xxxx"
                      {...field}
                      className="font-mono tracking-widest"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button className="bg-blu rounded-full w-full hover:bg-blu hover:brightness-110 transition-all text-base">
            Proceed
          </Button>

          <Button
            className="text-blu items-center gap-1"
            variant={"ghost"}
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <RotateCw size={18} className="translate-y-[1px]" />
            <span className="underline">Resend Code</span>
          </Button>
        </form>
      </Form>
    </>
  );
};

export default Verify;
