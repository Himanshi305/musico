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
      <div className="min-h-screen relative"> 
        <Navbar />
        
        {/* Main layout */}
        <div className="flex h-[calc(100vh-64px)] pt-16"> {/* Added pt-16 for navbar space */}
          
          {/* Left Sidebar - Full height on desktop, starts below navbar, touches bottom */}
          <div className="hidden lg:block w-80 h-[calc(100vh-64px)]">
            <PlaylistSidebar />
          </div>
          
          {/* Mobile Sidebar (existing hamburger functionality) */}
          <div className="lg:hidden">
            <PlaylistSidebar />
          </div>
          
          {/* Main content area - Right side */}
          <div className="flex-1 relative h-[calc(100vh-64px)]">
            {/* Center content */}
            <div className="h-full flex items-center justify-center pb-20">
              <CircularSystem onColorChange={handleColorChange} />
            </div>
            
            {/* PlayBar positioned at bottom-right, touches bottom */}
            <div className="absolute bottom-0 left-0 right-0">
              <PlayBar />
            </div>
          </div>
          
        </div>
      </div>
    </GradientBackground>
  );
}
