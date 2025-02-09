"use client";
import React, { Suspense, useEffect, useState } from "react";
import Verification from "./Verification";
import { TbError404Off } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { verifyEmail } from "@/lib/actions/texting";

interface Props {
  userId: string;
  secret: string;
}

const ParamsPage = ({ userId, secret }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setLoading(true);
    setMessage("");

    if (userId && secret) {
      verifyEmail(userId, secret)
        .then(() => {
          //   setMessage("Email verified successfully! Redirecting...");
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
  }, [userId, secret, router]);
  return (
    <Suspense fallback={<Verification />}>
      <div className="flex flex-col items-center justify-center bg-light-400 h-screen">
        {loading && !message ? (
          <Verification />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-4 ">
            <TbError404Off className="text-brand text-5xl animate-bounce" />
            <h1 className="h1 font-bold">{message}</h1>
          </div>
        )}
      </div>
    </Suspense>
  );
};

export default ParamsPage;
