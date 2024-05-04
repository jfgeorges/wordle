import { useCallback, useEffect, useRef, useState } from "react";
import { gridGame, pickAWord, status } from "./lib/utils";
import WordGrid from "./components/WordGrid";

function App() {
  const [gameStatus, setGameStatus] = useState(status.TYPING);
  const wordToFindRef = useRef(pickAWord());
  const [currentWord, setCurrentWord] = useState("");
  const [tryNumber, setTryNumber] = useState(0);
  const remainingTriesRef = useRef(10);

  const handleCurrentWord = useCallback((key: string) => {
    if (currentWord?.length === 5) {
      setGameStatus(status.CHECKING);
      setTryNumber(tn => tn + 1);
      return
    }
    if (key === "Backspace" && currentWord?.length > 0) {
      setCurrentWord(cw => cw.slice(0, -1));
      return
    }
    setCurrentWord(cw => cw + key);
  }, [currentWord])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (gameStatus !== status.TYPING) {
        return;
      }
      if (e.key.match(/[a-zA-Z]/) || e.key === "Backspace") {
        handleCurrentWord(e.key);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [gameStatus, handleCurrentWord]);

  useEffect(() => {
    if (gameStatus === status.CHECKING) {
      const isWordFound = wordToFindRef.current === currentWord;
      if (isWordFound) {
        setGameStatus(status.SUCCESS);
      } else {
        if (remainingTriesRef.current > 0) {
          remainingTriesRef.current = remainingTriesRef.current - 1;
          setCurrentWord('');
          setGameStatus(status.TYPING);
          return
        }
        setGameStatus(status.FAIL);
      }
    }
  }, [gameStatus]);

  return (
    <>
      <h1 className="text-3xl text-blue-500 font-bold text-center mb-2">
        Wordle
      </h1>
      <div className="flex flex-col gap-2 items-center">
        <div>{`Remaining tries: ${remainingTriesRef.current}`}</div>
        <div>{`Word to find: ${wordToFindRef.current}`}</div>
        <div>{`Current word ref: ${currentWord.current}`}</div>
        <div>{`Your word: ${currentWord}`}</div>
        <div>{`Game status: ${gameStatus}`}</div>
        <WordGrid gridGame={gridGame} tryNumber={tryNumber} letter={wordToFindRef.current[0]} />
      </div>
    </>
  );
}

export default App;
