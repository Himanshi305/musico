"use client";
import { useState } from 'react';
import Navbar from './components/navbar';
import CircularSystem from './components/CircularSystem';
import GradientBackground from './components/GradientBackground';
import PlaylistSidebar from './components/PlaylistSidebar';
import PlayBar from './components/PlayBar';

export default function Home() {
  const [selectedColor, setSelectedColor] = useState('red'); // Default to red

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  return (
    <GradientBackground dynamicColor={selectedColor}>
      <div className="min-h-screen relative pb-20"> {/* Added pb-20 for PlayBar space */}
        <Navbar />
        
        {/* Main content area with sidebar */}
        <div className="relative flex h-[calc(100vh-150px)] pt-16 left-4 top-5"> {/* Adjusted height for PlayBar */}
          
          {/* Playlist Section - Left 1/4 */}
          <PlaylistSidebar />
          
          {/* Main content area - Right 3/4 */}
          <div className="flex-1 flex items-center justify-center">
            <CircularSystem onColorChange={handleColorChange} />
          </div>
          
        </div>
        
        {/* Play Bar at bottom */}
        <PlayBar />
      </div>
    </GradientBackground>
  );
}
