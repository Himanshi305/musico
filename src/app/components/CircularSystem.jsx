"use client";
import { useState } from 'react';

export default function CircularSystem({ onColorChange }) {
  const [selectedSquare, setSelectedSquare] = useState(0); // 0 = top square
  const [rotation, setRotation] = useState(0);

  // Define colors for each square/dot
  const squareColors = [
    { name: 'red', dot: 'bg-red-500', square: 'bg-red-400 border-red-500', hover: 'hover:bg-red-50', shadow: 'shadow-red-400/50', gradient: 'red' },
    { name: 'pink', dot: 'bg-pink-500', square: 'bg-pink-400 border-pink-500', hover: 'hover:bg-pink-50', shadow: 'shadow-pink-400/50', gradient: 'pink' },
    { name: 'purple', dot: 'bg-purple-500', square: 'bg-purple-400 border-purple-500', hover: 'hover:bg-purple-50', shadow: 'shadow-purple-400/50', gradient: 'purple' },
    { name: 'blue', dot: 'bg-blue-500', square: 'bg-blue-400 border-blue-500', hover: 'hover:bg-blue-50', shadow: 'shadow-blue-400/50', gradient: 'blue' },
    { name: 'green', dot: 'bg-green-500', square: 'bg-green-400 border-green-500', hover: 'hover:bg-green-50', shadow: 'shadow-green-400/50', gradient: 'green' },
    { name: 'yellow', dot: 'bg-yellow-500', square: 'bg-yellow-400 border-yellow-500', hover: 'hover:bg-yellow-50', shadow: 'shadow-yellow-400/50', gradient: 'yellow' },
    { name: 'orange', dot: 'bg-orange-500', square: 'bg-orange-400 border-orange-500', hover: 'hover:bg-orange-50', shadow: 'shadow-orange-400/50', gradient: 'orange' },
    { name: 'cyan', dot: 'bg-cyan-500', square: 'bg-cyan-400 border-cyan-500', hover: 'hover:bg-cyan-50', shadow: 'shadow-cyan-400/50', gradient: 'cyan' }
  ];

  // Handle square click - rotate to bring clicked square to top
  const handleSquareClick = (squareIndex) => {
    console.log('Square clicked:', squareIndex + 1); // Debug log
    setSelectedSquare(squareIndex);
    // Calculate rotation needed to bring clicked square to top position
    const targetRotation = -(squareIndex * 45);
    setRotation(targetRotation);
    
    // Notify parent component about color change
    if (onColorChange) {
      onColorChange(squareColors[squareIndex].gradient);
    }
  };

  // Square and dot positions
  const positions = [
    { square: { marginTop: '-120px', marginLeft: '0px' }, dot: { top: '0%', left: '50%' }, name: 'top' },
    { square: { marginTop: '-85px', marginLeft: '85px' }, dot: { top: '14.6%', left: '85.4%' }, name: 'top-right' },
    { square: { marginTop: '0px', marginLeft: '120px' }, dot: { top: '50%', left: '100%' }, name: 'right' },
    { square: { marginTop: '85px', marginLeft: '85px' }, dot: { top: '85.4%', left: '85.4%' }, name: 'bottom-right' },
    { square: { marginTop: '120px', marginLeft: '0px' }, dot: { top: '100%', left: '50%' }, name: 'bottom' },
    { square: { marginTop: '85px', marginLeft: '-85px' }, dot: { top: '85.4%', left: '14.6%' }, name: 'bottom-left' },
    { square: { marginTop: '0px', marginLeft: '-120px' }, dot: { top: '50%', left: '0%' }, name: 'left' },
    { square: { marginTop: '-85px', marginLeft: '-85px' }, dot: { top: '14.6%', left: '14.6%' }, name: 'top-left' }
  ];

  return (
    <div className="absolute z-10">
      <div className="relative w-[700px] h-[700px]">
        {/* Circular border with dots - this rotates */}
        <div 
          className="absolute top-[125px] left-[125px] w-[450px] h-[450px] border border-white/30 rounded-full transition-transform duration-500 ease-in-out"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {/* Render dots */}
          {positions.map((pos, index) => (
            <div
              key={`dot-${index}`}
              className={`absolute w-2 h-2 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-colors duration-300 ${
                selectedSquare === index ? 'bg-white scale-125' : squareColors[index].dot
              }`}
              style={pos.dot}
            ></div>
          ))}
        </div>
        
        {/* Squares - positioned absolutely, rotate to bring selected to top */}
        {positions.map((pos, index) => {
          // Calculate the position with rotation applied
          const baseAngle = index * 45;
          const rotatedAngle = (baseAngle - (selectedSquare * 45)) * (Math.PI / 180);
          const radius = 120;
          const x = Math.cos(rotatedAngle - Math.PI/2) * radius;
          const y = Math.sin(rotatedAngle - Math.PI/2) * radius;
          
          return (
            <div
              key={`square-${index}`}
              className={`absolute w-8 h-8 border-2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-500 hover:scale-125 hover:shadow-lg z-50 ${
                selectedSquare === index 
                  ? `${squareColors[index].square} scale-125 ${squareColors[index].shadow}` 
                  : `bg-white ${squareColors[index].hover} border-gray-400`
              }`}
              style={{
                top: `calc(50% + ${y}px)`,
                left: `calc(50% + ${x}px)`
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Square clicked:', index + 1);
                handleSquareClick(index);
              }}
              title={`Square ${index + 1}`}
            >
              <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-black">
                {index + 1}
              </span>
            </div>
          );
        })}
        
        {/* Original circle centered inside */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-5">
          <div className="circle h-100 w-100 border border-lg rounded-full"></div>
        </div>
      </div>
    </div>
  );
}