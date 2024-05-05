import { useEffect, useRef, useState } from "react";

export const useKeyboard = () => {
  const tempWordRef = useRef("");
  const [word, setWord] = useState("");

  const resetTyping = () => {
    tempWordRef.current = "";
    setWord("");
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.match(/[a-zA-Z]/) || event.key === "Backspace") {
        if (event.key === "Backspace" && tempWordRef?.current.length > 0) {
          tempWordRef.current = tempWordRef?.current.slice(0, -1);
          return;
        }
        tempWordRef.current =
          (tempWordRef.current ? tempWordRef.current : "") + event.key;
        setWord(tempWordRef.current);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [tempWordRef]);
  return { word, resetTyping };
};
