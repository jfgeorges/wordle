import { GridGame, cn, letterStatus } from "../lib/utils";

export type WordGridProps = {
  gridGame: GridGame;
  tryNumber: number;
};

const getLetterColor = {
  [letterStatus.notFound]: "bg-gray-400",
  [letterStatus.goodPlace]: "bg-green-600",
  [letterStatus.wrongPlace]: "bg-orange-600",
  [letterStatus.none]: "bg-transparent",
}

const WordGrid = ({ gridGame, tryNumber }: WordGridProps) => {
  return (
    <div className="flex flex-col gap-2">
      {gridGame.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} className="flex gap-2">
          {row.map((letter, letterIndex) => (
            <div
              key={`cell-${rowIndex}${letterIndex}`}
              className={cn(
                "flex items-center justify-center border size-16 border-slate-600 text-slate-100 font-bold text-2xl rounded-sm",
                getLetterColor[letter.status]
              )}
            >
              {letter.name}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default WordGrid;
