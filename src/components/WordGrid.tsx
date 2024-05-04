
export type WordGridProps = {
  gridGame: string[][];
  tryNumber: number;
  letter: string;
}

const WordGrid = ({ gridGame, tryNumber, letter }: WordGridProps) => {
  return (
    <div>
      {gridGame.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((letter, letterIndex) => (
            <div key={letterIndex} className="flex items-center justify-center w-8 h-8 border border-gray-300">
              {letter}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
};

export default WordGrid
