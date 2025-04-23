import { useEffect, useRef } from "react";

const DEFAULT_TIME = 30 * 60 * 1000; // 30 minutes
const WARNING_TIME = 5 * 60 * 1000;  // 5 minutes before logout

export function useIdleLogoutTimer(
  isLoggedIn,
  onLogout,
  timeout = DEFAULT_TIME,
  onWarning,
  setIdleSignal
) {
  const timerRef = useRef(null);
  const warningTimerRef = useRef(null);

  useEffect(() => {
    if (!isLoggedIn) {
      clearTimeout(timerRef.current);
      clearTimeout(warningTimerRef.current);
      return;
    }

    const resetTimer = () => {
      clearTimeout(timerRef.current);
      clearTimeout(warningTimerRef.current);

      if (onWarning) {
        warningTimerRef.current = setTimeout(() => {
          onWarning();
        }, timeout - WARNING_TIME);
      }

      timerRef.current = setTimeout(() => {
        onLogout();
      }, timeout);
    };

    const activityHandler = () => {
      resetTimer();
      setIdleSignal(prev => prev + 1);
    };

    window.addEventListener("mousemove", activityHandler);
    window.addEventListener("keydown", activityHandler);
    window.addEventListener("click", activityHandler);
    window.addEventListener("scroll", activityHandler);

    resetTimer();

    return () => {
      clearTimeout(timerRef.current);
      clearTimeout(warningTimerRef.current);
      window.removeEventListener("mousemove", activityHandler);
      window.removeEventListener("keydown", activityHandler);
      window.removeEventListener("click", activityHandler);
      window.removeEventListener("scroll", activityHandler);
    };
  }, [isLoggedIn, onLogout, timeout, onWarning, setIdleSignal]);
}
