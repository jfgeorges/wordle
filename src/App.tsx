import { useRef, useState } from "react";
import { initialGridGame, pickAWord, letterStatus } from "./lib/utils";
import WordGrid from "./components/WordGrid";
import { useKeyboard } from "./useKeyboard";

function App() {
  const [tryNumber, setTryNumber] = useState(0);
  const [gridGame, setGridGame] = useState(initialGridGame);
  const wordToFindRef = useRef(pickAWord().toUpperCase());

  const remainingTries = 6 - tryNumber;
  const WORD_LENGTH = 5;

  const checkLetterStatus = (word: string) => {
    const wordToFind = wordToFindRef.current;
    const newGrid = gridGame.map((row, rowIndex) => {
      if (rowIndex === tryNumber) {
        const wordWithColors = Array(WORD_LENGTH).fill(null);
        const indexOfIncorrectLettersInGuess = [];
        // Tracks the letters (and counts of those letters)
        // in `wordToFind` that were not used up by `word`
        const targetLetters: { [key: string]: number } = {};

        for (let i = 0; i < WORD_LENGTH; ++i) {
          const targetLetter = wordToFind[i];

          if (targetLetter in targetLetters) {
            targetLetters[targetLetter]++;
          } else {
            targetLetters[targetLetter] = 1;
          }

          if (word[i] === targetLetter) {
            wordWithColors[i] = {
              name: word[i],
              status: letterStatus.goodPlace
            }
            targetLetters[targetLetter]--;
          } else {
            indexOfIncorrectLettersInGuess.push(i);
          }
        }

        for (const i of indexOfIncorrectLettersInGuess) {
          const guessLetter = word[i];

          if (guessLetter in targetLetters && targetLetters[guessLetter] > 0) {
            wordWithColors[i] = {
              name: word[i],
              status: letterStatus.wrongPlace
            };
            targetLetters[guessLetter]--;
          } else {
            wordWithColors[i] = {
              name: word[i],
              status: letterStatus.notFound
            };
          }
        }
        return wordWithColors;
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
            return row.map((_, letterIndex) => {
              if (letterIndex < word.length) {
                return {
                  name: word[letterIndex],
                  status: letterStatus.none,
                };
              }
              return { name: "", status: letterStatus.none };
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
