import {
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import SearchIcon from "../icons/SearchIcon";
import DefaultMusicIcon from "../images/default-music-icon.jpg";
import RecentlyPlayedImg from "../images/recentlyPlayedImg.png";
import { useEffect, useRef, useState } from "react";
import SearchHistoryContainer from "../components/SearchHistoryContainer";
import CrossIcon from "../icons/CrossIcon";
import { getFavouriteSongs } from "../services/apiService";
import { getFavouriteSongIds } from "../services/storageService";
import { Song } from "../App";
import GlobalPlaySong from "../components/GlobalPlaySong";
import { useSongContext } from "../context/SongContext";
import TabNavigator from "../components/TabNavigator";

const Favourite: React.FC = () => {
  const { setSongs, playSong, openModal } = useSongContext();
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [favouriteSongs, setFavouriteSongs] = useState<any[]>([]);
  const [filteredSongs, setFilteredSongs] = useState<Song[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [hideTab, setHideTab] = useState(false);
  const ionContentRef = useRef<HTMLIonContentElement | null>(null);
  const lastScrollTop = useRef(0);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const songIds = await getFavouriteSongIds();

        const favSongs = await getFavouriteSongs(songIds);
        console.log("Favourite Songs:", favSongs);
        setFavouriteSongs(favSongs);
      } catch (error) {
        console.error("Error fetching favourite songs:", error);
      }
    };

    fetchFavourites();
  }, []);

  const setLocalSongs = async (song: Song, idx: number) => {
    setSongs(favouriteSongs);
    playSong(song, idx);
    openModal(<GlobalPlaySong />);
  };

  const sortSongs = () => {
    const sorted = [...filteredSongs].sort((a, b) =>
      sortOrder === "asc"
        ? a.song_name.localeCompare(b.song_name)
        : b.song_name.localeCompare(a.song_name)
    );
    setFilteredSongs(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredSongs(favouriteSongs);
    } else {
      const filtered = favouriteSongs.filter((song) =>
        song.song_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredSongs(filtered);
    }
  }, [searchQuery, favouriteSongs]);

  const handleScroll = (event: CustomEvent) => {
    const scrollTop = event.detail.scrollTop;

    if (scrollTop > 0) {
      setHideTab(true);
    } else {
      setHideTab(false);
    }
    lastScrollTop.current = scrollTop;
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
                }}
                onBlur={() => {
                  setIsInputFocused(false);
                }}
              />
            </div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent
        ref={ionContentRef}
        fullscreen
        onIonScroll={handleScroll}
        scrollEvents={true}
      >
        <div className="px-5 mt-4 mb-7">
          <div className="flex items-center justify-between">
            <p className="text-[#060307] pt-2 font-urbanist text-base font-semibold leading-5 capitalize">
              favorite songs
            </p>
            <button
              onClick={sortSongs}
              className="mt-2 bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-xs"
            >
              Sort {sortOrder === "asc" ? "A-Z" : "Z-A"}
            </button>
            <p className="mt-2.5 text-[#7F8489] mb-0 font-urbanist text-xs font-medium leading-normal capitalize">
              {favouriteSongs?.length} songs
            </p>
          </div>

          <div
            style={{ maxHeight: "calc(100vh - 100px)", scrollbarWidth: "none" }}
            className="mt-4 grid grid-cols-1 gap-6 overflow-y-auto scroll-smooth"
          >
            {filteredSongs.map((song, i) => (
              <div
                key={i}
                className="flex items-center gap-x-3"
                onClick={() => setLocalSongs(song, i)}
              >
                <img
                  className="w-[100px] h-[100px] object-cover rounded-xl"
                  src={
                    song.song_image_url !== ""
                      ? song.song_image_url
                      : DefaultMusicIcon
                  }
                />
                <div>
                  <p className="text-[#060307] font-urbanist text-[16px] font-semibold leading-normal capitalize">
                    {song.song_name}
                  </p>
                  <p className="text-[#060307] font-urbanist text-xs leading-normal capitalize">
                    {song.primary_artists}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </IonContent>

      {/* <div
        className={`bottom-0 w-full transition-all duration-500 ${
          hideTab ? "opacity-0 pointer-events-none" : "opacity-100 fixed"
        }`}    
      >
        <TabNavigator />   
      </div> */}

      <div
        className={`bottom-0 w-full transition-all duration-800 transform ${
          hideTab
            ? "translate-y-full opacity-0 pointer-events-none"
            : "translate-y-0 opacity-100 fixed"
        }`}
      >
        <TabNavigator />   
      </div>
    </IonPage>
  );
};

export default Favourite;
