"use client";

import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { type Dispatch, useState, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
import { SignInForm, signInFormSchema } from "./sign-in-form";
import * as z from "zod";
import { SignUpForm, signUpFormSchema } from "./sign-up-form";
import auth from "@/lib/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useStore } from "@/store/store";

type LoginState = "login" | "sign up";

const Auth = () => {
  const [loginState, setLoginState] = useState<LoginState>("login");
  const params = useSearchParams();
  let verified = params.get("verified");

  const { isLoggedIn, setUser } = useStore();
  const router = useRouter();

  useEffect(() => {
    console.log({ verified });
    let id: string | number;
    if (verified && verified === "true") {
      setLoginState("login");
      setTimeout(() => {
        id = toast.success("Account verified, Log in");
      });
    }

    return () => {
      setTimeout(() => {
        console.log(id);
        if (id) toast.dismiss(id);
      }, 10);
    };
  }, [verified]);

  const signInForm = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const signUpForm = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isLoggedIn()) router.replace("/");
  }, [isLoggedIn, router]);

  async function onSignInSubmit(values: z.infer<typeof signInFormSchema>) {
    const user = {
      email: values.email.valueOf() as string,
      password: values.password.valueOf() as string,
    };

    try {
      const loginResponse = await auth.login(user);
      setUser(loginResponse);
      toast.success("Logged in successfully");
      router.replace("/");
    } catch (e: any) {
      signInForm.setError("root.serverCatch", {
        type: "server",
        message: e.message,
      });
    }
  }

  async function onSignUpSubmit(values: z.infer<typeof signUpFormSchema>) {
    const user = {
      email: values.email.valueOf() as string,
      password: values.password.valueOf() as string,
      fullName: values.name.valueOf() as string,
    };

    try {
      await auth.signup(user);
      setLoginState("login");
      toast.success("Please verify email");
      router.push(
        "/auth/verify?" +
          new URLSearchParams({
            email: user.email,
          }),
      );
    } catch (e: any) {
      signUpForm.setError("root.serverCatch", {
        type: "server",
        message: e.message,
      });
    }
    return false;
  }

  //Account created successfully, please sign in.

  return (
    <main className="relative flex flex-col justify-center items-center space-y-8 h-screen py-20">
      <Image
        src={"/onboarding-fig-1.png"}
        alt="onboarding figure 1"
        width={290}
        height={343}
        className="w-2/3 top-0 left-0 -translate-y-1/2  fixed -z-50 max-w-md"
        priority
      />

      <Image
        src={"/onboarding-fig-2.png"}
        alt="onboarding figure 2"
        width={245.5}
        height={180.7}
        className=" bottom-20 md:bottom-10 right-0   fixed -z-50 max-w-md"
        priority
      />

      <Image
        src={"/Logo.png"}
        alt={"brds"}
        width={(273 / 78)*60}
        height={60}
        className="pt-20 w-48"
      />
      <Switch loginState={loginState} setLoginState={setLoginState} />

      {loginState === "login" ? (
        <SignInForm signInForm={signInForm} onSubmit={onSignInSubmit} />
      ) : (
        <SignUpForm signUpForm={signUpForm} onSubmit={onSignUpSubmit} />
      )}
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
      className="h-10 bg-slate-100 flex max-w-max items-center text-center relative isolate rounded-full text-primary  text-sm gap-2 flex-shrink-0"
    >
      <p className={cn("w-20 transition-all translate-x-1")}>Sign In</p>
      <p className={cn("w-20 transition-all -translate-x-1")}>Sign Up</p>
      <div
        className="bg-white h-8 w-20 absolute -z-10 rounded-full transition-all"
        style={{
          left: props.loginState === "login" ? "4px" : `calc(100% - 84px)`,
        }}
      ></div>
    </button>
  );
};
