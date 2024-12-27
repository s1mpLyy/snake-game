import React from 'react';
import { Gamepad2 } from 'lucide-react';
import GameBoard from './components/GameBoard';
import TouchControls from './components/TouchControls';
import { useSnakeGame } from './hooks/useSnakeGame';

function App() {
  const { snake, food, score, isGameOver, resetGame, GRID_SIZE, isStarted, changeDirection } = useSnakeGame();

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Gamepad2 className="w-8 h-8 text-green-500" />
          <h1 className="text-3xl font-bold text-white">Snake Game</h1>
        </div>
        
        <div className="mb-4 flex justify-between items-center">
          <span className="text-xl text-white">Score: {score}</span>
          <button
            onClick={resetGame}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            {isGameOver ? 'Play Again' : 'Reset'}
          </button>
        </div>

        {isGameOver && (
          <div className="text-red-500 text-center mb-4 text-xl font-semibold">
            Game Over!
          </div>
        )}

        {!isStarted && !isGameOver && (
          <div className="text-green-500 text-center mb-4 text-xl font-semibold animate-pulse">
            Press any arrow key or use touch controls to start!
          </div>
        )}

        <GameBoard
          snake={snake}
          food={food}
          gridSize={GRID_SIZE}
        />

        <TouchControls onDirectionChange={changeDirection} />

        <div className="mt-4 text-gray-400 text-center">
          Use arrow keys or touch controls to play
        </div>
      </div>
    </div>
  );
}

export default App;