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
        className="space-y-4 container max-w-lg flex flex-col flex-1 "
      >
        <FormField
          control={signInForm.control}
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
            control={signInForm.control}
            name="password"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Password</FormLabel>
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
          <Button
            variant={"link"}
            className="p-0 text-blu"
            onClick={(e) => {
              e.preventDefault();
              router.push("/auth/forgot-password");
            }}
          >
            Forgot Password?
          </Button>
        </div>

        {signInForm.formState.errors.root &&
          signInForm.formState.errors.root.serverCatch && (
            <p className="text-red-400">
              {signInForm.formState.errors.root.serverCatch.message}
            </p>
          )}

        <div className="flex-1"></div>

        <div className="space-y-2">
          <Button className="bg-blu rounded-full w-full hover:bg-blu hover:brightness-110 transition-all text-base">
            Sign In
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
