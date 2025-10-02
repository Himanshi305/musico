"use client";
import { useState } from 'react';
import Navbar from './components/navbar';
import CircularSystem from './components/CircularSystem';
import GradientBackground from './components/GradientBackground';
import PlaylistSidebar from './components/PlaylistSidebar';

export default function Home() {
  const [selectedColor, setSelectedColor] = useState('red'); // Default to red

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  return (
    <GradientBackground dynamicColor={selectedColor}>
      <div className="min-h-screen relative">
        <Navbar />
        
        {/* Main content area with sidebar */}
        <div className="relative flex h-[93vh] pt-16 left-10 top-5"> {/* pt-16 to account for navbar height */}
          
          {/* Playlist Section - Left 1/4 */}
          <PlaylistSidebar />
          
          {/* Main content area - Right 3/4 */}
          <div className="flex-1 flex items-center justify-center">
            <CircularSystem onColorChange={handleColorChange} />
          </div>
          
        </div>
      </div>
    </GradientBackground>
  );
}
