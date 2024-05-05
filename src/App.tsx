import { useRef, useState } from "react";
import { initialGridGame, pickAWord, letterStatus } from "./lib/utils";
import WordGrid from "./components/WordGrid";
import { useKeyboard } from "./useKeyboard";

function App() {
  const [tryNumber, setTryNumber] = useState(0);
  const [gridGame, setGridGame] = useState(initialGridGame);
  const wordToFindRef = useRef(pickAWord().toUpperCase());

  const remainingTries = 6 - tryNumber;

  const checkLetterStatus = (word: string) => {
    const wordToFind = wordToFindRef.current;
    const newGrid = gridGame.map((row, rowIndex) => {
      if (rowIndex === tryNumber) {
        return row.map((letter, columnIndex) => {
          if (columnIndex < word.length) {
            if (wordToFind.includes(word[columnIndex])) {
              if (wordToFind[columnIndex] === word[columnIndex]) {
                return {
                  name: word[columnIndex],
                  status: letterStatus.goodPlace,
                };
              } else {
                return {
                  name: word[columnIndex],
                  status: letterStatus.wrongPlace,
                };
              }
            }
          }
          return letter;
        });
      }
      return row;
    });
    setGridGame(newGrid);
  };

  const handleGridContent = (word: string) => {
    if (remainingTries > 0) {
      setGridGame((grid) => {
        const newGrid = grid.map((row, rowIndex) => {
          if (rowIndex === tryNumber) {
            return row.map((letter, columnIndex) => {
              if (columnIndex < word.length) {
                return {
                  name: word[columnIndex],
                  status: letterStatus.none,
                };
              }
              return letter;
            });
          }
          return row;
        });
        return newGrid;
      });
    }
  };

  const handleEnter = (word: string) => {
    if (remainingTries > 0) {
      checkLetterStatus(word);
      if (word === wordToFindRef.current) {
        console.log("You won");
      }

      setTryNumber((tn) => tn + 1);
    }
  };

  useKeyboard(handleGridContent, handleEnter);

  return (
    <>
      <h1 className="text-3xl text-blue-500 font-bold text-center mb-2">
        Wordle
      </h1>
      <div className="flex flex-col gap-2 items-center">
        <div>{`Word to find: ${wordToFindRef.current}`}</div>
        <div>{`tryNumber: ${tryNumber + 1}`}</div>
        <div>{`Remaining tries: ${remainingTries}`}</div>
        <WordGrid gridGame={gridGame} tryNumber={tryNumber} />
      </div>
    </>
  );
}

export default App;
