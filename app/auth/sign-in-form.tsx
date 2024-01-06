import { UseFormReturn } from "react-hook-form";
import * as z from "zod";
import Image from "next/image";

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
import { useRouter } from "next/navigation";
import Link from "next/link";

export const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5).max(24),
});

type SignInFormProps = {
  signInForm: UseFormReturn<
    {
      email: string;
      password: string;
    },
    any,
    undefined
  >;
  onSubmit: (values: z.infer<typeof signInFormSchema>) => void;
};

export const SignInForm = ({ signInForm, onSubmit }: SignInFormProps) => {
  const router = useRouter();
  return (
    <Form {...signInForm}>
      <form
        onSubmit={signInForm.handleSubmit(onSubmit)}
        className="space-y-4  flex flex-col flex-1 w-full sm:max-w-lg px-4"
      >
        <FormField
          control={signInForm.control}
          name="email"
          render={({ field }) => {
            return (
              <FormItem className="space-y-1">
                <FormLabel className="text-[#525252]">
                  Email<span className="text-[#EF4E4E]">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="fizz@buzz.com" className="font-normal" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <div>
          <FormField
            control={signInForm.control}
            name="password"
            render={({ field }) => {
              return (
                <FormItem className="space-y-1">
                  <FormLabel className="text-[#525252]">
                    Password<span className="text-[#EF4E4E]">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter password"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Link href="/auth/forgot-password" className="text-blu text-sm font-medium underline mt-3 block w-fit">
            Forgot Password?
          </Link>
        </div>

        {signInForm.formState.errors.root &&
          signInForm.formState.errors.root.serverCatch && (
            <p className="text-red-500">
              {signInForm.formState.errors.root.serverCatch.message}
            </p>
          )}

        <div className="flex-1 max-h-16"></div>

        <div className="space-y-3">
          <Button className="bg-blu rounded-full py-5  w-full hover:bg-blu hover:brightness-110 transition-all font-medium">
            Login
          </Button>
          <Button variant={"outline"} className="gap-2 w-full rounded-full">
            <Image
              src={"/google-logo.png"}
              alt={"google logo"}
              width={100}
              height={100}
              className="w-5 aspect-square"
            />
            <span className="text-sm font-medium text-blu">Continue With Google</span>
          </Button>
        </div>
      </form>
    </Form>
  );
};
