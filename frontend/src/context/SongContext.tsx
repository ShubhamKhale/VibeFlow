import React, {
  createContext,
  MutableRefObject,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Song } from "../App";
import {
  addFavouriteSongId,
  getItem,
  isSongFavourite,
  isSongOffline,
  removeFavouriteSongId,
  removeOfflineSong,
  saveSongOffline,
  setItem,
} from "../services/storageService";
import { IonModal } from "@ionic/react";
import {
  addSongToFavourites,
  removeSongFromFavourites,
} from "../services/apiService";

type SongContextType = {
  currentSong: Song | null;
  isPlaying: boolean;
  playSong: (song: Song, index: number) => void;
  stopSong: () => void;
  playNextSong: () => void;
  playPreviousSong: () => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  togglePlayPause: () => void;
  toggleMute: () => void;
  toggleFavouriteSong: (song: Song) => void;
  toggleSavedSong: (song: Song) => void;
  isSaved: boolean;
  isFavourite: boolean;
  isMuted: boolean;
  currentTime: number;
  duration: number;
  handleSeek: (value: number) => void;
  songs: Song[];
  setSongs: React.Dispatch<React.SetStateAction<Song[]>>;
  setCurrentSong: React.Dispatch<React.SetStateAction<Song | null>>;
  isShuffle: boolean;
  isRepeat: boolean;
  audioRef: MutableRefObject<HTMLAudioElement | null>;
  isModalOpen: boolean;
  modalContent: React.ReactNode;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
};

const SongContext = createContext<SongContextType | undefined>(undefined);

export const SongProvider: React.FC<{
  children: React.ReactNode;
  audioRef: MutableRefObject<HTMLAudioElement | null>;
}> = ({ children, audioRef }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  // Playback logic
  const playSong = async (song: Song, index: number) => {
    await setItem("currentsong", song);

    const isCurrentSongFavourite = await isSongFavourite(song?.song_id);
    const isCurrentSongSaved = await isSongOffline(song?.song_id);

    const localsong = await getItem("currentsong");
    setCurrentSong(localsong);
    setCurrentIndex(index);

    if (isCurrentSongFavourite) {
      setIsFavourite(true);
    } else {
      setIsFavourite(false);
    }

    if (isCurrentSongSaved) {
      setIsSaved(true);
    } else {
      setIsSaved(false);
    }

    if (audioRef.current) {
      audioRef.current.src = song.song_audio_url;

      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((error) => {
          console.error("Error playing audio:", error);
          setIsPlaying(false);
        });
    }
  };

  const stopSong = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setCurrentSong(null);
    setCurrentIndex(null);
    setIsPlaying(false);
  };

  const playNextSong = () => {
    if (!songs.length) return;

    if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * songs.length);
      playSong(songs[randomIndex], randomIndex);
    } else if (currentIndex !== null) {
      const nextIndex = (currentIndex + 1) % songs.length;
      playSong(songs[nextIndex], nextIndex);
    }
  };

  const playPreviousSong = () => {
    if (!songs.length || currentIndex === null) return;

    const prevIndex =
      currentIndex - 1 >= 0 ? currentIndex - 1 : songs.length - 1;
    playSong(songs[prevIndex], prevIndex);
  };

  const toggleShuffle = () => setIsShuffle((prev) => !prev);
  const toggleRepeat = () => setIsRepeat((prev) => !prev);

  // Auto-play next song when the current song ends
  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      const handleEnded = () => {
        if (isRepeat) {
          audioElement.play();
        } else {
          playNextSong();
        }
      };

      audioElement.addEventListener("ended", handleEnded);
      return () => {
        audioElement.removeEventListener("ended", handleEnded);
      };
    }
  }, [isRepeat, playNextSong, audioRef]);

  // Update current time and duration
  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      const updateTime = () => setCurrentTime(audioElement.currentTime || 0);
      const updateDuration = () => setDuration(audioElement.duration || 0);

      audioElement.addEventListener("timeupdate", updateTime);
      audioElement.addEventListener("loadedmetadata", updateDuration);

      return () => {
        audioElement.removeEventListener("timeupdate", updateTime);
        audioElement.removeEventListener("loadedmetadata", updateDuration);
      };
    }
  }, [audioRef]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };

  const removeSongFromFavouritesFunc = async (
    userId: string,
    currentSong: Song
  ) => {
    try {
      if (!userId || !currentSong) {
        console.warn(
          "user id or current song is missing. cannot add to favourites."
        );
        return;
      }
      const response = await removeSongFromFavourites(userId, currentSong);
      console.log(
        "removeSongFromFavouritesFunc success message:- ",
        response.message
      );
    } catch (error) {
      console.error("removeSongFromFavouritesFunc error message:", error);
    }
  };

  const addSongToFavouritesFunc = async (userId: string, currentSong: Song) => {
    try {
      if (!userId || !currentSong) {
        console.warn(
          "user id or current song is missing. cannot add to favourites."
        );
        return;
      }
      const response = await addSongToFavourites(userId, currentSong);
      console.log(
        "addSongToFavouritesFunc success message:- ",
        response
      );
    } catch (error) {
      console.error("addSongToFavouritesFunc error message:", error);
    }
  };

  // Toggle favourite songs
  const toggleFavouriteSong = async (song: Song) => {
    const userId = await getItem("userId");
    const isCurrentSongFavourite = await isSongFavourite(song?.song_id);

    if (isCurrentSongFavourite === false) {
      setIsFavourite(true);
      addFavouriteSongId(song?.song_id);
      addSongToFavouritesFunc(userId, song);
    } else {
      setIsFavourite(false);
      removeFavouriteSongId(song?.song_id);
      removeSongFromFavouritesFunc(userId, song);
    }
  };

  const toggleSavedSong = async (song: Song) => {
    const isCurrentSongSaved = await isSongOffline(song?.song_id);

    if (isCurrentSongSaved === false) {
      setIsSaved(true);
      saveSongOffline(song);
    } else {
      setIsSaved(false);
      removeOfflineSong(song?.song_id)
    }
  }

  const handleSeek = (value: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value;
      setCurrentTime(value);
    }
  };

  const openModal = (content: React.ReactNode) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  return (
    <SongContext.Provider
      value={{
        currentSong,
        isPlaying,
        playSong,
        stopSong,
        playNextSong,
        playPreviousSong,
        toggleShuffle,
        toggleRepeat,
        togglePlayPause,
        songs,
        setSongs,
        setCurrentSong,
        toggleMute,
        toggleFavouriteSong,
        toggleSavedSong,
        isSaved,
        isFavourite,
        isShuffle,
        isRepeat,
        isMuted,
        currentTime,
        duration,
        handleSeek,
        audioRef,
        isModalOpen,
        modalContent,
        openModal,
        closeModal,
      }}
    >
      {children}
      <IonModal isOpen={isModalOpen} onDidDismiss={closeModal}>
        {modalContent}
      </IonModal>
    </SongContext.Provider>
  );
};

export const useSongContext = () => {
  const context = useContext(SongContext);
  if (!context) {
    throw new Error("useSongContext must be used within a SongProvider");
  }
  return context;
};
