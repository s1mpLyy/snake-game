import { useState, useEffect, useCallback } from 'react';
import { Direction, Position, GameState } from '../types/game';

const GRID_SIZE = 20;
const INITIAL_SNAKE: Position[] = [{ x: 10, y: 10 }];
const INITIAL_FOOD: Position = { x: 5, y: 5 };
const GAME_SPEED = 150;

export const useSnakeGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    snake: INITIAL_SNAKE,
    food: INITIAL_FOOD,
    direction: 'RIGHT',
    isGameOver: false,
    score: 0,
    isStarted: false
  });

  const moveSnake = useCallback(() => {
    if (gameState.isGameOver || !gameState.isStarted) return;

    setGameState(prev => {
      const head = { ...prev.snake[0] };
      
      switch (prev.direction) {
        case 'UP':
          head.y -= 1;
          break;
        case 'DOWN':
          head.y += 1;
          break;
        case 'LEFT':
          head.x -= 1;
          break;
        case 'RIGHT':
          head.x += 1;
          break;
      }

      // Check collision with walls
      if (
        head.x < 0 ||
        head.x >= GRID_SIZE ||
        head.y < 0 ||
        head.y >= GRID_SIZE
      ) {
        return { ...prev, isGameOver: true };
      }

      // Check collision with self
      if (prev.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        return { ...prev, isGameOver: true };
      }

      const newSnake = [head, ...prev.snake];
      
      // Check if snake ate food
      const ateFood = head.x === prev.food.x && head.y === prev.food.y;
      if (!ateFood) {
        newSnake.pop();
      }

      // Generate new food position if needed
      let newFood = prev.food;
      if (ateFood) {
        newFood = {
          x: Math.floor(Math.random() * GRID_SIZE),
          y: Math.floor(Math.random() * GRID_SIZE),
        };
      }

      return {
        ...prev,
        snake: newSnake,
        food: newFood,
        score: ateFood ? prev.score + 1 : prev.score,
      };
    });
  }, [gameState.isGameOver, gameState.isStarted]);

  const changeDirection = useCallback((newDirection: Direction) => {
    setGameState(prev => {
      // Start the game on first direction change if not started
      if (!prev.isStarted) {
        return { ...prev, isStarted: true, direction: newDirection };
      }

      // Prevent 180-degree turns
      const invalidMove =
        (newDirection === 'UP' && prev.direction === 'DOWN') ||
        (newDirection === 'DOWN' && prev.direction === 'UP') ||
        (newDirection === 'LEFT' && prev.direction === 'RIGHT') ||
        (newDirection === 'RIGHT' && prev.direction === 'LEFT');

      if (invalidMove) return prev;

      return { ...prev, direction: newDirection };
    });
  }, []);

  const resetGame = useCallback(() => {
    setGameState({
      snake: INITIAL_SNAKE,
      food: INITIAL_FOOD,
      direction: 'RIGHT',
      isGameOver: false,
      score: 0,
      isStarted: false
    });
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          changeDirection('UP');
          break;
        case 'ArrowDown':
          changeDirection('DOWN');
          break;
        case 'ArrowLeft':
          changeDirection('LEFT');
          break;
        case 'ArrowRight':
          changeDirection('RIGHT');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [changeDirection]);

  useEffect(() => {
    const gameLoop = setInterval(moveSnake, GAME_SPEED);
    return () => clearInterval(gameLoop);
  }, [moveSnake]);

  return {
    ...gameState,
    resetGame,
    GRID_SIZE,
    changeDirection,
  };
};