import Cell from "../Cell/Cell";

const board = [
  ["#FFD6E7", "#FFD6E7", "#BDE7FF", "#BDE7FF"],
  ["#FFD6E7", "#CFFFD2", "#CFFFD2", "#BDE7FF"],
  ["#FFEAA7", "#FFEAA7", "#CFFFD2", "#F6C6FF"],
  ["#FFEAA7", "#F6C6FF", "#F6C6FF", "#F6C6FF"],
];

function Board() {
  return (
    <div className="grid grid-cols-4 gap-2">
      {board.flat().map((color, index) => (
        <Cell
          key={index}
          color={color}
        />
      ))}
    </div>
  );
}

export default Board;