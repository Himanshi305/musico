"use client";
import { useState, useEffect } from 'react';

export default function PlaylistSidebar() {
  // Initial playlists
  const [playlists, setPlaylists] = useState([
    { id: 1, name: "Liked Songs", count: 42, isDefault: true },
    { id: 2, name: "Chill Vibes", count: 28, isDefault: false },
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');

  // Load playlists from localStorage on component mount
  useEffect(() => {
    const savedPlaylists = localStorage.getItem('musicon-playlists');
    if (savedPlaylists) {
      try {
        const parsedPlaylists = JSON.parse(savedPlaylists);
        setPlaylists(parsedPlaylists);
      } catch (error) {
        console.error('Error loading playlists from localStorage:', error);
      }
    }
  }, []);

  // Save playlists to localStorage whenever playlists change
  useEffect(() => {
    localStorage.setItem('musicon-playlists', JSON.stringify(playlists));
  }, [playlists]);

  const handlePlaylistClick = (playlistName) => {
    console.log(`Selected playlist: ${playlistName}`);
    // Add playlist selection logic here
  };

  const handleCreatePlaylist = () => {
    setIsCreating(true);
  };

  const handleSavePlaylist = () => {
    if (newPlaylistName.trim()) {
      const newPlaylist = {
        id: Date.now(), // Simple ID generation
        name: newPlaylistName.trim(),
        count: 0,
        isDefault: false
      };
      setPlaylists([...playlists, newPlaylist]);
      setNewPlaylistName('');
      setIsCreating(false);
      console.log(`Created new playlist: ${newPlaylist.name}`);
    }
  };

  const handleCancelCreate = () => {
    setIsCreating(false);
    setNewPlaylistName('');
  };

  const handleDeletePlaylist = (playlistId) => {
    const playlistToDelete = playlists.find(p => p.id === playlistId);
    if (playlistToDelete && !playlistToDelete.isDefault) {
      setPlaylists(playlists.filter(p => p.id !== playlistId));
      console.log(`Deleted playlist: ${playlistToDelete.name}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSavePlaylist();
    } else if (e.key === 'Escape') {
      handleCancelCreate();
    }
  };

  return (
    <div className="w-1/4 bg-black/20 backdrop-blur-sm border-r border-white/10 p-6 overflow-y-auto custom-scrollbar">
      <div className="text-white">
        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Playlists
        </h2>
        
        {/* Playlist items */}
        <div className="space-y-3">
          {playlists.map((playlist) => (
            <div 
              key={playlist.id}
              className="relative p-3 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer transition-all duration-200 group"
              onClick={() => handlePlaylistClick(playlist.name)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-medium group-hover:text-white/90">{playlist.name}</h3>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300">
                    {playlist.count} songs
                  </p>
                </div>
                {!playlist.isDefault && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeletePlaylist(playlist.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 text-sm transition-all duration-200 ml-2"
                    title="Delete playlist"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          ))}
          
          {/* Create new playlist input */}
          {isCreating && (
            <div className="p-3 rounded-lg bg-white/10 border border-white/20">
              <input
                type="text"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter playlist name..."
                className="w-full bg-transparent text-white placeholder-gray-400 outline-none text-sm"
                autoFocus
              />
              <div className="flex gap-2 mt-2">
                <button
                  onClick={handleSavePlaylist}
                  className="px-3 py-1 border border-gray-400 hover:scale-105 text-white text-xs rounded transition-colors duration-200"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelCreate}
                  className="px-3 py-1 border border-gray-400 hover:scale-105 text-white text-xs rounded transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Add new playlist button */}
        {!isCreating && (
          <button 
            onClick={handleCreatePlaylist}
            className="mt-6 w-full p-3 border border-white/20 rounded-lg text-white/70 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-200"
          >
            + Create Playlist
          </button>
        )}
        
        {/* Quick stats */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="text-sm text-gray-400">
            <p>{playlists.length} playlists</p>
            <p>{playlists.reduce((total, playlist) => total + playlist.count, 0)} total songs</p>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styles - Hidden */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 0px;
          background: transparent;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: transparent;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: transparent;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:active {
          background: transparent;
        }
        
        /* For Firefox */
        .custom-scrollbar {
          scrollbar-width: none;
          scrollbar-color: transparent transparent;
        }
        
        /* For IE and Edge */
        .custom-scrollbar {
          -ms-overflow-style: none;
        }
      `}</style>
    </div>
  );
}