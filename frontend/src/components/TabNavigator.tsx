import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HomeIcon from "../icons/HomeIcon";
import SearchIcon from "../icons/SearchIcon";
import FavouriteIcon from "../icons/FavouriteIcon";
import SavedIcon from "../icons/SavedIcon";
import PlaylistIcon from "../icons/PlaylistIcon";
import SoundIcon from "../icons/SoundIcon";
import SoundMutedIcon from "../icons/SoundMutedIcon";
import HeartIcon from "../icons/HeartIcon";
import RedHeartIcon from "../icons/RedHeartIcon";
import PauseIcon from "../icons/PauseIcon";
import PlayIcon from "../icons/PlayIcon";
import GlobalPlaySong from "./GlobalPlaySong";
import { useSongContext } from "../context/SongContext";

const TabNavigator: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    currentSong,
    openModal,
    isMuted,
    toggleMute,
    togglePlayPause,
    toggleFavouriteSong,
    isPlaying,
    isFavourite,
  } = useSongContext();

  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // If scrolling down, hide the navbar
        setIsHidden(true);
        if (timeoutId) clearTimeout(timeoutId);
      } else {
        // If scrolling up, delay before showing again
        if (timeoutId) clearTimeout(timeoutId);
        const id = setTimeout(() => {
          setIsHidden(false);
        }, 3000); // 3 seconds delay
        setTimeoutId(id);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [lastScrollY]);

  return (
    <>
      {!["/login", "/signup", "/signin", "/playSong", "/song-player"].includes(location.pathname) && (
        <div
          className={`fixed bottom-0 left-0 w-screen py-5 px-5 rounded-t-2xl border-2 bg-white shadow-lg transition-transform duration-1000 ${
            isHidden ? "translate-y-full" : "translate-y-0"
          }`}
        >
          {currentSong && (
            <div className="mb-2 flex items-center justify-between">
              <img
                className="w-[60px] h-[60px] object-cover rounded-full"
                src={currentSong?.song_image_url}
                alt="-"
                onClick={() => openModal(<GlobalPlaySong />)}
              />
              <div onClick={() => openModal(<GlobalPlaySong />)}>
                <p className="text-[#060307] text-lg font-semibold truncate">
                  {currentSong?.song_name}
                </p>
                <p className="text-[#9B9A9C] text-sm truncate">
                  {currentSong?.primary_artists?.slice(0, 17)}
                  {currentSong?.primary_artists?.length > 17 && "..."}
                </p>
              </div>
              <button onClick={toggleMute} aria-label="Toggle mute">
                {isMuted ? <SoundMutedIcon width="24px" height="24px" /> : <SoundIcon width="24px" height="24px" />}
              </button>
              <button onClick={() => toggleFavouriteSong(currentSong)} aria-label="Add to favourites">
                {!isFavourite ? <HeartIcon width="24px" height="24px" /> : <RedHeartIcon width="24px" height="24px" />}
              </button>
              <button onClick={togglePlayPause} className="p-1 bg-red-600 rounded-full" aria-label="Play/Pause">
                {isPlaying ? <PauseIcon width="24px" height="24px" /> : <PlayIcon width="24px" height="24px" />}
              </button>
            </div>
          )}
          <div className="grid grid-cols-5 justify-items-center items-center gap-x-10">
            <div className="cursor-pointer" onClick={() => navigate("/home")}>
              <HomeIcon width="24px" height="24px" />
              <p className="text-[#9B9A9C] text-center text-[10px]">Home</p>
            </div>
            <div className="cursor-pointer" onClick={() => navigate("/search")}>
              <SearchIcon width="24px" height="24px" />
              <p className="text-[#9B9A9C] text-center text-[10px]">Search</p>
            </div>
            <div className="cursor-pointer flex flex-col items-center text-center" onClick={() => navigate("/playlist")}>
              <PlaylistIcon width="24px" height="24px" />
              <p className="text-[#9B9A9C] text-center text-[10px]">Playlists</p>
            </div>
            <div className="flex flex-col items-center justify-center cursor-pointer" onClick={() => navigate("/favourite")}>
              <FavouriteIcon width="24px" height="24px" />
              <p className="text-[#9B9A9C] text-center text-[10px]">Favourite</p>
            </div>
            <div className="cursor-pointer" onClick={() => navigate("/saved")}>
              <SavedIcon width="24px" height="24px" />
              <p className="text-[#9B9A9C] text-center text-[10px]">Saved</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TabNavigator;
