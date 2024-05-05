import { useEffect, useRef } from "react";
import { ALPHABET } from "./lib/utils";

export const useKeyboard = (
  handleGridContent: (word: string) => void,
  handleEnter: (word: string) => void
) => {
  const word = useRef("");

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();
      if (ALPHABET.includes(key) && word.current.length < 5) {
        word.current += key;
      }

      if (key === "BACKSPACE" && word.current.length > 0) {
        word.current = word.current.slice(0, -1);
      }

      if (key === "ENTER" && word.current.length === 5) {
        handleEnter(word.current);
        word.current = "";
        return;
      }
      handleGridContent(word.current);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleGridContent, handleEnter, word]);
  return;
};
