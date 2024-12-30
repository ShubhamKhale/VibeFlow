import { createContext, useContext, useState } from "react";

type Song = {
    album_id: string;
    album_url: string;
    encrypted_media_url: string;
    has_lyrics: string;
    lyrics: string;
    primary_artists: string;
    primary_artists_id: string;
    song_audio_preview: string;
    song_audio_url: string;
    song_id: string;
    song_image_url: string;
    song_name: string;
    vcode: string;
};

type SongContextType = {
    currentSong: Song | null;
    songs: Song[];
    playSong: (song: Song) => void;
    stopSong: () => void;
    setPlaylist: (playlist: Song[]) => void;
    playNextSong: () => void;
    playPreviousSong: () => void;
};

const SongContext = createContext<SongContextType | undefined>(undefined);

export const SongProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentSong, setCurrentSong] = useState<Song | null>(null);
    const [songs, setSongs] = useState<Song[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);

    const playSong = (song: Song) => {
        const index = songs.findIndex((s) => s.song_id === song.song_id);
        if (index !== -1) {
            setCurrentSong(song);
            setCurrentIndex(index);
        }
    };

    const stopSong = () => {
        setCurrentSong(null);
        setCurrentIndex(null);
    };

    const setPlaylist = (playlist: Song[]) => {
        setSongs(playlist);
        if (playlist.length > 0) {
            setCurrentSong(playlist[0]);
            setCurrentIndex(0);
        }
    };

    const playNextSong = () => {
        if (currentIndex !== null && currentIndex < songs.length - 1) {
            const nextIndex = currentIndex + 1;
            setCurrentSong(songs[nextIndex]);
            setCurrentIndex(nextIndex);
        } else {
            console.log("No next song available");
        }
    };

    const playPreviousSong = () => {
        if (currentIndex !== null && currentIndex > 0) {
            const prevIndex = currentIndex - 1;
            setCurrentSong(songs[prevIndex]);
            setCurrentIndex(prevIndex);
        } else {
            console.log("No previous song available");
        }
    };

    return (
        <SongContext.Provider
            value={{
                currentSong,
                songs,
                playSong,
                stopSong,
                setPlaylist,
                playNextSong,
                playPreviousSong,
            }}
        >
            {children}
        </SongContext.Provider>
    );
};


export const useSong = (): SongContextType => {
    const context = useContext(SongContext);
    if (!context) {
        throw new Error("useSong must be used within a SongProvider");
    }
    return context;
};
