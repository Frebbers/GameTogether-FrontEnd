import { useEffect, useRef } from "react";

const DEFAULT_TIME = 30 * 60 * 1000; // 30 minutes

export function useIdleLogoutTimer(isLoggedIn, onLogout, timeout = DEFAULT_TIME) {
  const timerRef = useRef(null);

  useEffect(() => {
    console.log("useIdleLogoutTimer activated. isLoggedIn =", isLoggedIn);
    if (!isLoggedIn) {
      clearTimeout(timerRef.current);
      return;
    }
  
    const resetTimer = () => {
      console.log("Activity detected. Resetting timer.");
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        console.log("Logging out due to inactivity");
        onLogout();
      }, timeout);
    };
  
    const activityHandler = () => resetTimer();
  
    window.addEventListener("mousemove", activityHandler);
    window.addEventListener("keydown", activityHandler);
    window.addEventListener("click", activityHandler);
    window.addEventListener("scroll", activityHandler);
  
    resetTimer();
  
    return () => {
      console.log("Cleaning up event listeners and timer");
      clearTimeout(timerRef.current);
      window.removeEventListener("mousemove", activityHandler);
      window.removeEventListener("keydown", activityHandler);
      window.removeEventListener("click", activityHandler);
      window.removeEventListener("scroll", activityHandler);
    };
  }, [isLoggedIn, onLogout, timeout]);
}
