import Image from "next/image";
import * as z from "zod";
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
import { UseFormReturn } from "react-hook-form";

export const signUpFormSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(5).max(24),
    confirmPassword: z.string().min(5).max(24),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignUpFormProps = {
  signUpForm: UseFormReturn<
    {
      email: string;
      password: string;
      confirmPassword: string;
    },
    any,
    undefined
  >;
  onSubmit: (values: z.infer<typeof signUpFormSchema>) => void;
};

export const SignUpForm = ({ signUpForm, onSubmit }: SignUpFormProps) => {
  return (
    <Form {...signUpForm}>
      <form
        onSubmit={signUpForm.handleSubmit(onSubmit)}
        className="space-y-4 container max-w-lg flex flex-col flex-1 "
      >
        <FormField
          control={signUpForm.control}
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
        <FormField
          control={signUpForm.control}
          name="password"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter a secure password"
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={signUpForm.control}
          name="confirmPassword"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Re-enter password"
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <div className="flex-1"></div>

        <div className="space-y-2">
          <Button className="bg-blu rounded-full w-full hover:bg-blu hover:brightness-110 transition-all text-base">
            Sign Up
          </Button>
          <Button variant={"outline"} className="gap-2 w-full rounded-full">
            <Image
              src={"/google-logo.png"}
              alt={"google logo"}
              width={100}
              height={100}
              className="w-5 aspect-square"
            />
            <span className="text-base">Continue With Google</span>
          </Button>
        </div>
      </form>
    </Form>
  );
};
