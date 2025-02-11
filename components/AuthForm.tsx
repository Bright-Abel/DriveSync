"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SignUpProp, SignInProp, AvatarUrl } from "@/lib/constant";
// import { createAccount, signinUser } from "@/lib/actions/user.actions";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { AuthValidation } from "@/lib/form-validation";
// import OTPModal from "./OTPModal";
import { showToast } from "./showToast";
import { parseStrignify, TOAST_STYLES } from "@/lib/utils";
import { loginUser, signupUser } from "@/lib/actions/texting";
import { useRouter } from "next/navigation";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

type FormTypes = "sign-in" | "sign-up";

const AuthForm = ({ type }: { type: FormTypes }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { userAvatar } = useSelector((state: RootState) => state.dataSlice);
  // const [accountId, setAccountId] = useState<string | null>(null);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();

  // Toggle password visibility function
  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const formSchema = AuthValidation(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:
      type === "sign-up"
        ? {
            email: "",
            fullname: "",
            password: "",
            confirm_password: "",
          }
        : {
            email: "",
            password: "",
          },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const avatar_new = userAvatar ? userAvatar : AvatarUrl;
    // if (type === "sign-up" && !userAvatar) {
    //   showToast("error", <p>Please select an avatar.</p>, {
    //     icon: false,
    //     autoClose: 4000,
    //     style: TOAST_STYLES.error,
    //   });
    //   setIsLoading(false);
    //   return;
    // }

    try {
      let data: {
        email: string;
        fullname?: string;
        password: string;
        avatar_url?: string;
      };

      if (type === "sign-up") {
        data = {
          email: values.email,
          fullname: values.fullname!,
          password: values.password!,
          avatar_url: avatar_new,
        };
      } else {
        data = {
          email: values.email,
          password: values.password!,
        };
      }
      const isSignup = type === "sign-up";

      const user = isSignup ? await signupUser(data) : await loginUser(data);

      if (user && isSignup) {
        router.push("/verify/email-verification");
      } else {
        router.push("/dashboard");
      }

      // showToast("success", <p>Please check your email for OTP.</p>, {
      //   icon: false,
      //   autoClose: 4000,
      //   style: TOAST_STYLES.success,
      // });
      // setAccountId(user.accountId);
      setIsLoading(false);
    } catch (error) {
      showToast("error", <p>{parseStrignify((error as Error)?.message)}</p>, {
        icon: false,
        autoClose: 4000,
        style: TOAST_STYLES.error,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
          <h1 className="form-title">
            {type === "sign-in" ? "Sign In" : "Sign Up"}
          </h1>
          {type === "sign-up"
            ? SignUpProp.map((prop) => (
                <FormField
                  key={prop.input_name}
                  control={form.control}
                  name={prop.input_name}
                  render={({ field }) => (
                    <FormItem>
                      <div className="shad-form-item">
                        <FormLabel className="shad-form-label">
                          {prop.label}
                        </FormLabel>

                        <div className="flex items-center gap-2">
                          <Input
                            placeholder={prop.placeholder}
                            type={
                              prop.type === "password"
                                ? passwordVisible
                                  ? "text"
                                  : "password"
                                : prop.type
                            }
                            className="shad-input"
                            {...field}
                          />
                          {/* Eye button for password visibility */}
                          {prop.type === "password" && (
                            <button
                              type="button"
                              className="text-brand outline-none focus:outline-none"
                              onClick={togglePasswordVisibility}
                            >
                              {passwordVisible ? <HiEyeOff /> : <HiEye />}
                            </button>
                          )}
                        </div>
                      </div>
                      <FormMessage className="shad-form-message" />
                    </FormItem>
                  )}
                />
              ))
            : SignInProp.map((prop) => (
                <FormField
                  key={prop.input_name}
                  control={form.control}
                  name={prop.input_name}
                  render={({ field }) => (
                    <FormItem>
                      <div className="shad-form-item">
                        <FormLabel className="shad-form-label">
                          {prop.label}
                        </FormLabel>

                        <FormControl>
                          <div className="flex items-center gap-2">
                            <Input
                              placeholder={prop.placeholder}
                              type={
                                prop.type === "password"
                                  ? passwordVisible
                                    ? "text"
                                    : "password"
                                  : prop.type
                              }
                              className="shad-input"
                              {...field}
                            />
                            {/* Eye button for password visibility */}
                            {prop.type === "password" && (
                              <button
                                type="button"
                                className="text-brand outline-none focus:outline-none"
                                onClick={togglePasswordVisibility}
                              >
                                {passwordVisible ? <HiEyeOff /> : <HiEye />}
                              </button>
                            )}
                          </div>
                        </FormControl>
                      </div>
                      <FormMessage className="shad-form-message" />
                    </FormItem>
                  )}
                />
              ))}
          <Button
            type="submit"
            disabled={isLoading}
            className="form-submit-button !text-lg !font-bold disabled:!bg-opacity-70 disabled:!cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex gap-2 items-center">
                <p className="">Loading</p>
                <Image
                  src={"/assets/icons/loader.svg"}
                  alt={"loader"}
                  width={24}
                  height={24}
                  className="object-contain animate-spin"
                />
              </div>
            ) : type === "sign-in" ? (
              "Sign In"
            ) : (
              "Sign Up"
            )}
          </Button>

          <div className="body-2 flex justify-center">
            <p className="text-light-100">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              href={type === "sign-in" ? "/auth/sign-up" : "/auth/sign-in"}
              className="ml-1 font-medium text-brand hover:underline hover:text-opacity-85 duration-300"
            >
              {type === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </div>
        </form>
      </Form>
      {/* {accountId && (
        <OTPModal
          email={form.getValues("email")}
          accountId={accountId}
          setAccountId={setAccountId}
        />
      )} */}
    </>
  );
};

export default AuthForm;
