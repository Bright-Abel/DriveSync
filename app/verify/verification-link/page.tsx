"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { verifyEmail } from "@/lib/actions/texting";
import Verification from "./_components/Verification";
import { TbError404Off } from "react-icons/tb";

const VerifyPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const userId = searchParams.get("userId");
    const secret = searchParams.get("secret");

    if (userId && secret) {
      verifyEmail(userId, secret)
        .then(() => {
          setMessage("Email verified successfully! Redirecting...");
          setTimeout(() => router.replace("/auth/sign-in"), 3000);
        })
        .catch(() => {
          setMessage("Verification failed. Please try again.");
          setLoading(false);
        });
    } else {
      setMessage("Invalid verification link.");
      setLoading(false);
    }
  }, [searchParams, router]);

  return (
    <div className="flex flex-col items-center justify-center bg-light-400 h-screen">
      {loading ? (
        <Verification />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4 ">
          <TbError404Off className="text-brand text-5xl animate-bounce" />
          <h1 className="h1 font-bold">{message}</h1>
        </div>
      )}
    </div>
  );
};

export default VerifyPage;
