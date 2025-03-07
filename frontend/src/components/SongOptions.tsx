import React from "react";
import { Song } from "../App";
import { useSongContext } from "../context/SongContext";
import { useNavigate } from "react-router-dom";

interface SongOptionsProps {
  song: Song;
  isVisible: boolean;
  onClose: () => void;
  onOptionClick: (option: string, song: Song) => void;
}

const SongOptions: React.FC<SongOptionsProps> = ({
  song,
  isVisible,
  onClose,
  onOptionClick,
}) => {

  const navigate = useNavigate();

  const {
      currentSong,
      setCurrentSong,
      songs,
      closeModal,
      playNextSong,
      playPreviousSong,
      isPlaying,
      isMuted,
      togglePlayPause,
      toggleMute,
      toggleShuffle,
      toggleRepeat,
      currentTime,
      duration,
      handleSeek,
      toggleFavouriteSong,
      isFavourite,
      isSaved,
      toggleSavedSong,
    } = useSongContext();  

  if (!isVisible) return null;

 

  return (
    <div className="absolute right-0 top-8 bg-white shadow-lg rounded-lg w-40 z-50 p-2">
      <p
        className="p-2 hover:bg-gray-200 cursor-pointer"
        onClick={() => {
          onOptionClick("Add to Favourites", song);
          toggleFavouriteSong(song);
          onClose();
        }}
      >
        ❤️ Add to Favourites
      </p>
      <p
        className="p-2 hover:bg-gray-200 cursor-pointer"
        onClick={() => {
          onOptionClick("Add to Saved Songs", song);
          toggleSavedSong(song);
          onClose();
        }}
      >
        💾 Add to Saved Songs
      </p>
      <p
        className="p-2 hover:bg-gray-200 cursor-pointer"
        onClick={() => {
          onOptionClick("Add to Playlist", song);
          navigate("/playlist")
          onClose();
        }}
      >
        🎵 Add to Playlist
      </p>
    </div>
  );
};

export default SongOptions;
