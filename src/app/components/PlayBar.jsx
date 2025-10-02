"use client";
import { useState, useRef, useEffect } from 'react';

export default function PlayBar() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(240); // 4 minutes in seconds
  const [currentSong, setCurrentSong] = useState({
    title: "Midnight Dreams",
    artist: "Luna Eclipse", 
    album: "Nocturnal Vibes",
    cover: "/api/placeholder/60/60"
  });

  const audioRef = useRef(null);

  // Format time in MM:SS
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Handle play/pause
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Handle progress bar click
  const handleProgressClick = (e) => {
    const progressBar = e.currentTarget;
    const clickX = e.clientX - progressBar.getBoundingClientRect().left;
    const width = progressBar.offsetWidth;
    const newTime = (clickX / width) * duration;
    setCurrentTime(newTime);
  };

  // Simulate time progress when playing
  useEffect(() => {
    let interval;
    if (isPlaying && currentTime < duration) {
      interval = setInterval(() => {
        setCurrentTime(prev => Math.min(prev + 1, duration));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTime, duration]);

  const progressPercentage = (currentTime / duration) * 100;

  return (
    <div className="h-20 bg-black/80 backdrop-blur-md border-t border-white/10">
      <div className="flex items-center justify-between h-full px-4">
        
        {/* Left: Current song info */}
        <div className="flex items-center space-x-3 w-1/4">
          <div className="w-12 h-12 bg-gray-600 rounded-md flex items-center justify-center">
            <span className="text-white text-xs">♪</span>
          </div>
          <div className="text-white">
            <h4 className="text-sm font-medium truncate">{currentSong.title}</h4>
            <p className="text-xs text-gray-400 truncate">{currentSong.artist}</p>
          </div>
          <button className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
            </svg>
          </button>
        </div>

        {/* Center: Player controls */}
        <div className="flex flex-col items-center space-y-2 w-1/2">
          {/* Control buttons */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-400 hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
              </svg>
            </button>
            
            <button 
              onClick={togglePlay}
              className="bg-white text-black rounded-full p-2 hover:scale-105 transition-transform"
            >
              {isPlaying ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              )}
            </button>
            
            <button className="text-gray-400 hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z" />
              </svg>
            </button>
          </div>

          {/* Progress bar */}
          <div className="flex items-center space-x-3 w-full">
            <span className="text-xs text-gray-400 w-10">{formatTime(currentTime)}</span>
            <div 
              className="flex-1 h-1 bg-gray-600 rounded-full cursor-pointer relative group"
              onClick={handleProgressClick}
            >
              <div 
                className="h-full bg-white rounded-full transition-all duration-100"
                style={{ width: `${progressPercentage}%` }}
              />
              <div 
                className="absolute top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ left: `${progressPercentage}%`, marginLeft: '-6px' }}
              />
            </div>
            <span className="text-xs text-gray-400 w-10">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Right: Additional controls */}
        <div className="flex items-center space-x-3 w-1/4 justify-end">
          <button className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" clipRule="evenodd" />
            </svg>
          </button>

          <button className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}