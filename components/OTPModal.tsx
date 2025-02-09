"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Image from "next/image";
import React, { useState } from "react";
import ResendOtp from "./ResendOtp";
import { sendEmailOtp, verifySecret } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import { showToast } from "./showToast";
import { TOAST_STYLES } from "@/lib/utils";

interface Props {
  email: string;
  accountId: string;
  setAccountId: React.Dispatch<React.SetStateAction<string | null>>;
}

const OTPModal = ({ email, accountId, setAccountId }: Props) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const sessionId = await verifySecret({
        password,
        accountId,
      });

      if (sessionId) {
        showToast("success", <p>Login successful </p>, {
          icon: false,
          autoClose: 4000,
          style: TOAST_STYLES.success,
        });

        router.push("/dashboard");
      }
    } catch {
      showToast("error", <p>Error verifying OTP. </p>, {
        icon: false,
        autoClose: 4000,
        style: TOAST_STYLES.error,
      });
    }
    setIsLoading(false);
  };

  const handleResendOtp = async () => {
    try {
      const token = await sendEmailOtp(email);
      if (token) {
        showToast("success", <p>OTP has been sent to {email}</p>, {
          icon: false,
          autoClose: 4000,
          style: TOAST_STYLES.success,
        });
      }
    } catch {
      showToast("success", <p>Error sending OTP. Please try again</p>, {
        icon: false,
        autoClose: 4000,
        style: TOAST_STYLES.error,
      });
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setAccountId(null);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader className="relative flex justify-center">
          <AlertDialogTitle className="h2 text-center">
            Enter Your OTP
            <Image
              src={"/assets/icons/close-dark.svg"}
              alt="close"
              width={20}
              height={20}
              onClick={handleClose}
              className="otp-close-button"
            />
          </AlertDialogTitle>
          <AlertDialogDescription className="subtitle-2 text-center text-light-100">
            We&apos;ve sent an OTP to{" "}
            <span className="pl-1 text-brand">{email}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <InputOTP maxLength={6} value={password} onChange={setPassword}>
          <InputOTPGroup className="shad-otp">
            {Array.from({ length: 6 }).map((_, index) => (
              <InputOTPSlot
                key={index}
                index={index}
                className="shad-otp-slot"
              />
            ))}
          </InputOTPGroup>
        </InputOTP>

        <AlertDialogFooter>
          <div className="w-full flex gap-4 flex-col">
            <AlertDialogAction
              onClick={handleSubmit}
              disabled={isLoading}
              className="shad-submit-btn"
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
              ) : (
                "Submit"
              )}
            </AlertDialogAction>
            <div className="-mt-3 text-light-100 w-full text-center text-sm">
              Didn&apos;t receive OTP? <ResendOtp onClick={handleResendOtp} />
            </div>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OTPModal;
