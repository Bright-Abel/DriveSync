import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";

interface Props {
  onClick: () => void;
}

const COUNTDOWN_DURATION = 60;
const ResendOtp = ({ onClick }: Props) => {
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

  const handleClick = () => {
    onClick();
    startTimer();
  };
  return (
    <>
      {time > 0 ? (
        <span
          className="text-brand pl-1 font-semibold"
          aria-live="polite"
          aria-atomic="true"
        >
          {`0${minutes} : ${seconds < 10 ? `0${seconds}` : seconds}`}
        </span>
      ) : (
        <Button
          type="button"
          variant="link"
          onClick={handleClick}
          // disabled={!userEmail?.length}
          className="pl-1 text-brand"
        >
          Click to resend
        </Button>
      )}
    </>
  );
};

export default ResendOtp;
