import { useRef, useState } from "react";
import { gridGame, pickAWord, status } from "./lib/utils";
import WordGrid from "./components/WordGrid";
import { useKeyboard } from "./useKeyboard";

function App() {
  const [gameStatus, setGameStatus] = useState(status.TYPING);
  const wordToFindRef = useRef(pickAWord());
  const [tryNumber, setTryNumber] = useState(0);
  const remainingTries = 6 - tryNumber;

  const { word: currentWord, resetTyping } = useKeyboard();

  // const handleCurrentWord = useCallback(
  //   (key: string) => {
  //     if (currentWord?.length === 5) {
  //       setGameStatus(status.CHECKING);
  //       setTryNumber((tn) => tn + 1);
  //       return;
  //     }
  //     if (key === "Backspace" && currentWord?.length > 0) {
  //       setCurrentWord((cw) => cw.slice(0, -1));
  //       return;
  //     }
  //     setCurrentWord((cw) => cw + key);
  //   },
  //   [currentWord]
  // );

  // useEffect(() => {
  //   function handleKeyDown(e: KeyboardEvent) {
  //     if (gameStatus !== status.TYPING) {
  //       return;
  //     }
  //     if (e.key.match(/[a-zA-Z]/) || e.key === "Backspace") {
  //       handleCurrentWord(e.key);
  //     }
  //   }

  //   document.addEventListener("keydown", handleKeyDown);

  //   return function cleanup() {
  //     document.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, [gameStatus, handleCurrentWord]);

  if (gameStatus === status.TYPING && currentWord.length === 5) {
    setGameStatus(status.CHECKING);
  }

  if (gameStatus === status.CHECKING) {
    const isWordFound = wordToFindRef.current === currentWord;
    if (isWordFound) {
      setGameStatus(status.SUCCESS);
    } else {
      resetTyping();
      if (remainingTries > 0) {
        setTryNumber((tn) => tn + 1);
        setGameStatus(status.TYPING);
        return;
      }
      setGameStatus(status.FAIL);
    }
  }

  return (
    <>
      <h1 className="text-3xl text-blue-500 font-bold text-center mb-2">
        Wordle
      </h1>
      <div className="flex flex-col gap-2 items-center">
        <div>{`Word to find: ${wordToFindRef.current}`}</div>
        <div>{`Game status: ${gameStatus}`}</div>
        <div>{`tryNumber: ${tryNumber}`}</div>
        <div>{`Remaining tries: ${remainingTries}`}</div>
        <div>{`Your word: ${currentWord}`}</div>
        <WordGrid
          gridGame={gridGame}
          tryNumber={tryNumber}
          letter={wordToFindRef.current[0]}
        />
      </div>
    </>
  );
}

export default App;
