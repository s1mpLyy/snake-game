import React from 'react';
import { Position } from '../types/game';

interface GameBoardProps {
  snake: Position[];
  food: Position;
  gridSize: number;
}

const GameBoard: React.FC<GameBoardProps> = ({ snake, food, gridSize }) => {
  return (
    <div 
      className="grid gap-1 bg-gray-800 p-2 rounded-lg"
      style={{
        gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
      }}
    >
      {Array.from({ length: gridSize * gridSize }).map((_, index) => {
        const x = index % gridSize;
        const y = Math.floor(index / gridSize);
        const isSnake = snake.some(segment => segment.x === x && segment.y === y);
        const isFood = food.x === x && food.y === y;

        return (
          <div
            key={index}
            className={`w-5 h-5 rounded-sm ${
              isSnake
                ? 'bg-green-500'
                : isFood
                ? 'bg-red-500'
                : 'bg-gray-700'
            }`}
          />
        );
      })}
    </div>
  );
};

export default GameBoard;