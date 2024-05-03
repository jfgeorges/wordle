import { useEffect, useRef, useState } from "react";

function App() {
  const [currentWord, setCurrentWord] = useState("");
  const currentWordRef = useRef("");

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (currentWordRef.current?.length < 6) {
        // Take only alphabets
        currentWordRef.current = currentWordRef.current + e.key;
        if (e.key === "Backspace") {
          currentWordRef.current = currentWordRef.current.slice(0, -1);
        }
        return;
      }
      if (currentWordRef.current?.length === 5) {
        setCurrentWord(currentWordRef.current);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <h1 className="text-3xl text-red-500 font-bold text-center">
      {`Your word: ${currentWord}`}
    </h1>
  );
}

export default App;
