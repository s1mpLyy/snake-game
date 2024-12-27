import React from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { Direction } from '../types/game';

interface TouchControlsProps {
  onDirectionChange: (direction: Direction) => void;
}

const TouchControls: React.FC<TouchControlsProps> = ({ onDirectionChange }) => {
  return (
    <div className="grid grid-cols-3 gap-2 w-48 mt-6 mx-auto md:hidden">
      {/* Up button */}
      <div className="col-start-2">
        <button
          className="w-full h-12 bg-gray-700 rounded-lg flex items-center justify-center active:bg-gray-600"
          onClick={() => onDirectionChange('UP')}
        >
          <ArrowUp className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Left, Down, Right buttons */}
      <div className="col-span-3 flex gap-2">
        <button
          className="flex-1 h-12 bg-gray-700 rounded-lg flex items-center justify-center active:bg-gray-600"
          onClick={() => onDirectionChange('LEFT')}
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <button
          className="flex-1 h-12 bg-gray-700 rounded-lg flex items-center justify-center active:bg-gray-600"
          onClick={() => onDirectionChange('DOWN')}
        >
          <ArrowDown className="w-6 h-6 text-white" />
        </button>
        <button
          className="flex-1 h-12 bg-gray-700 rounded-lg flex items-center justify-center active:bg-gray-600"
          onClick={() => onDirectionChange('RIGHT')}
        >
          <ArrowRight className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
};

export default TouchControls;