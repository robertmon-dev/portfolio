import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { APP_NAVIGATE_EVENT } from "@/lib/utils/navigation";

export const NavigationListener = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleNavigate = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      if (customEvent.detail) {
        navigate(customEvent.detail);
      }
    };

    window.addEventListener(APP_NAVIGATE_EVENT, handleNavigate);

    return () => {
      window.removeEventListener(APP_NAVIGATE_EVENT, handleNavigate);
    };
  }, [navigate]);

  return null;
};
