import { useEffect, useRef, useState } from "react";

export const useCoundDown = (seconds: number) => {
  const [count, setCount] = useState(seconds);
  const [isCounting, setIsCounting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    if (isCounting) {
      timerRef.current = setInterval(() => {
        setCount((time) => {
          if (time > 0) {
            return time - 1;
          } else {
            stopCountDown();
            return 0;
          }
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isCounting]);

  const startCountDown = () => {
    setIsCounting(true);
  };

  const stopCountDown = () => {
    setIsCounting(false);
  };

  const resetCountDown = () => {
    setIsCounting(false);
    setCount(seconds);
  };

  return {
    count,
    startCountDown,
    stopCountDown,
    resetCountDown,
  };
};
