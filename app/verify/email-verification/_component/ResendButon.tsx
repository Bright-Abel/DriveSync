"use client";

import { Button } from "@/components/ui/button";
import { verificationEmail } from "@/lib/actions/texting";
import { useEffect, useRef, useState } from "react";

const COUNTDOWN_DURATION = 60 * 5;
const ResendButon = () => {
  const [time, setTime] = useState(COUNTDOWN_DURATION);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    clearInterval(timerRef.current as NodeJS.Timeout);
    setTime(COUNTDOWN_DURATION);

    timerRef.current = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(timerRef.current as NodeJS.Timeout);
          return 0;
        }
      });
    }, 1000);
  };
  useEffect(() => {
    startTimer();

    return () => clearInterval(timerRef.current as NodeJS.Timeout);
  }, []);
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const handleClick = async () => {
    await verificationEmail();
    // console.log(resendVerification);
    startTimer();
  };
  return (
    <div>
      <Button
        type="button"
        onClick={handleClick}
        disabled={time > 0}
        className="primary-btn h-[44px] px-10 !text-base  !font-semibold disabled:!bg-opacity-70 disabled:!cursor-not-allowed capitalize"
      >
        {time > 0 ? (
          <span
            className="orange-text font-semibold"
            aria-live="polite"
            aria-atomic="true"
          >
            {`0${minutes} : ${seconds < 10 ? `0${seconds}` : seconds}`}
          </span>
        ) : (
          "Resend verification email"
        )}
      </Button>
    </div>
  );
};

export default ResendButon;
