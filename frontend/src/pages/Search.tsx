import {
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
  IonPopover,
} from "@ionic/react";
import SearchIcon from "../icons/SearchIcon";
import DefaultMusicIcon from "../images/default-music-icon.jpg";
import { useEffect, useRef, useState } from "react";
import { getTopAlbumns, searchJioSaavnSongs } from "../services/apiService";
import { useNavigate } from "react-router-dom";
import MusicLoading from "../icons/music-loading.gif";
import { useSongContext } from "../context/SongContext";
import { getItem, setItem } from "../services/storageService";
import { Song } from "../App";
import GlobalPlaySong from "../components/GlobalPlaySong";
import ThreeDotsIcon from "../icons/ThreeDots";
import SongOptions from "../components/SongOptions";

const Search: React.FC = () => {
  const { songs, setSongs, playSong, openModal } = useSongContext(); // Correct hook usage
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [showSearchHistoryContainer, setShowSearchHistoryContainer] =
    useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [searchSongs, setSearchSongs] = useState<any[]>([]);
  const [topAlbumns, setTopAlbumns] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getTopAlbumns()
      .then((data) => {
        const albums = Array.isArray(data.mongodocs)
          ? data.mongodocs
          : [data.mongodocs];
        setTopAlbumns(albums);
      })
      .catch((error) => {
        console.log("error fetching top albumns", error);
      });
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 600);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedSearchQuery) {
      setLoading(true);
      const encodedQuery = encodeURIComponent(debouncedSearchQuery);

      searchJioSaavnSongs(encodedQuery)
        .then(async (data) => {
          if (data != null) {
            await setItem("songs", data);
            setSongs(data);
            setSearchSongs(data);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log("search jiosaavn songs error log", error);
          setLoading(false);
        });
    }
  }, [debouncedSearchQuery]);

  // const handlePlaySong = (song: any, idx: any) => {
  //   setSongs(searchSongs);
  //   playSong(song, idx);
  //   navigate("/song-player")
  // };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      setDebouncedSearchQuery(searchQuery);
    }
  };

  const setLocalSongs = async (song: Song, idx: any) => {
    await setItem("songs", searchSongs);
    const localsongs = await getItem("songs");
    setSongs(localsongs);
    playSong(song, idx);
    // navigate("/song-player")
    openModal(<GlobalPlaySong />);
  };

  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleMenuClick = async (
    index: number,
    event: React.MouseEvent,
    song: Song
  ) => {
    event.stopPropagation(); // Prevents closing when clicking on the icon
    setActiveMenu(activeMenu === index ? null : index);
    await setItem("playlist_song", song);
  };

  const handleOptionClick = (option: string, song: Song) => {
    console.log(`${option} selected for`, song.song_name);
    setActiveMenu(null);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <div className="flex items-center gap-x-3">
              <SearchIcon className="" width="24px" height="24px" />
              <IonInput
                className={`font-urbanist text-base font-medium leading-[18px] ${
                  isInputFocused ? "text-[#060307]" : "text-[#99989A]"
                }`}
                placeholder="What do you want to listen to?"
                onFocus={() => {
                  setIsInputFocused(true);
                  setShowSearchHistoryContainer(true);
                }}
                onBlur={() => {
                  setIsInputFocused(false);
                  setShowSearchHistoryContainer(false);
                }}
                onIonInput={(e: any) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="px-4 mt-7 mb-7">
          {loading ? (
            <div className="mt-[50%] flex justify-center items-center">
              <img className="w-44 h-44" src={MusicLoading} alt="-" />
            </div>
          ) : (
            <div className="mt-4">
              <div className="mt-4 grid grid-cols-1 gap-6">
                {songs.map((song, i) => (
                  <div key={i} className="flex items-center gap-x-3 relative">
                    <img
                      className="w-[100px] h-[100px] object-cover rounded-xl"
                      src={
                        song.song_image_url !== ""
                          ? song.song_image_url
                          : DefaultMusicIcon
                      }
                      alt={song.song_name}
                      onClick={() => {
                        setLocalSongs(song, i);
                      }}
                    />
                    <div className="w-full flex items-center justify-between">
                      <div
                        onClick={() => {
                          setLocalSongs(song, i);
                        }}
                      >
                        <p className="text-[#060307] font-urbanist text-[16px] font-semibold leading-normal capitalize">
                          {song.song_name}
                        </p>
                        <p className="text-[#060307] font-urbanist text-xs leading-normal capitalize">
                          {song.primary_artists}
                        </p>
                      </div>
                      <div className="relative" ref={menuRef}>
                        <ThreeDotsIcon
                          width="24px"
                          height="24px"
                          onClick={(e) => handleMenuClick(i, e, song)}
                        />
                        <SongOptions
                          song={song}
                          isVisible={activeMenu === i}
                          onClose={() => setActiveMenu(null)}
                          onOptionClick={handleOptionClick}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Search;
