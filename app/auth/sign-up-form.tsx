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
import auth from "@/lib/auth";

async function checkEmailInDB(email: string) {
  try {
    const res = await auth.checkEmailExists(email);
    return res;
  } catch (e: any) {
    return false;
  }
}

export const signUpFormSchema = z.object({
  name: z.string(),
  email: z
    .string()
    .email()
    .refine(async (e) => {
      let res = await checkEmailInDB(e);
      console.log("Email exists", res);
      return !res;
    }, "Email already exists"),
  password: z.string().min(5).max(24),
});

type SignUpFormProps = {
  signUpForm: UseFormReturn<
    {
      name: string;
      email: string;
      password: string;
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
        className="space-y-4  flex flex-col flex-1 w-full sm:max-w-lg px-4"
      >
        <FormField
          control={signUpForm.control}
          name="name"
          render={({ field }) => {
            return (
              <FormItem className="space-y-1">
                <FormLabel className="text-[#525252]">
                  Name<span className="text-[#EF4E4E]">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={signUpForm.control}
          name="email"
          render={({ field }) => {
            return (
              <FormItem className="space-y-1">
                <FormLabel className="text-[#525252]">
                  Email<span className="text-[#EF4E4E]">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="fizz@buzz.com" type="email" {...field} />
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
              <FormItem className="space-y-1">
                <FormLabel className="text-[#525252]">
                  Password<span className="text-[#EF4E4E]">*</span>
                </FormLabel>
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

        {signUpForm.formState.errors.root &&
          signUpForm.formState.errors.root.serverCatch && (
            <p className="text-red-400">
              {signUpForm.formState.errors.root.serverCatch.message}
            </p>
          )}
        <p></p>

        <div className="flex-1 max-h-16"></div>

        <div className="space-y-3">
          <Button className="bg-blu rounded-full w-full hover:bg-blu hover:brightness-110 transition-all text-sm font-medium">
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
            <span className="text-sm font-medium text-blu">Continue With Google</span>
          </Button>
        </div>
      </form>
    </Form>
  );
};
