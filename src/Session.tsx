import axios from "axios";
import useDebounce from "hooks/useDebounce";
import { ReactNode, useEffect, useRef, useState } from "react";

const activityEvents = ["mousemove", "keydown", "mousedown", "touchstart"];
const sessionTime = 10000;

const Session = ({ children }: { children: ReactNode }) => {
  const [lastActivity, setLastActivity] = useState(Date.now());
  const timerRef = useRef(null);

  const handleActivity = () => {
    setLastActivity(Date.now());
  };

  const sendPing = async () => {
    try {
      const username = localStorage.getItem("username");
      const token = localStorage.getItem("token");

      if (!username || !token) return;

      const url = "http://18.138.168.43:10311/api/ping";
      const response = await axios.post(
        url,
        {
          Uid: username,
          Token: token,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Ping successful", response.data);
        const newToken = response.data?.Token;

        console.log("newToken", newToken);

        if (newToken) {
          localStorage.setItem("token", newToken);
        } else {
          console.warn("Token is empty");
        }
      } else {
        console.error("Ping failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during ping", error);
    }
  };

  useEffect(() => {
    activityEvents.forEach((event) => {
      window.addEventListener(event, useDebounce(500, handleActivity));
    });

    return () => {
      activityEvents.forEach((event) => {
        window.removeEventListener(event, useDebounce(500, handleActivity));
      });
    };
  }, []);

  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      const now = Date.now();
      const timeSinceLastActivity = now - lastActivity;

      if (timeSinceLastActivity < sessionTime) {
        sendPing();
      }
    }, sessionTime);

    return () => {
      clearInterval(timerRef.current);
    };
  }, [lastActivity]);

  return <>{children}</>;
};

export default Session;
