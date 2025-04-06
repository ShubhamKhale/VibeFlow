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
import { useSongContext } from "../context/SongContext";
import { useEffect, useRef, useState } from "react";
import { getOfflineSongs } from "../services/storageService";
import { Song } from "../App";
import GlobalPlaySong from "../components/GlobalPlaySong";
import TabNavigator from "../components/TabNavigator";

const SavedSongs: React.FC = () => {
  const { setSongs, playSong, openModal } = useSongContext();
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [savedSongs, setSavedSongs] = useState<Song[]>([]);
  const [filteredSongs, setFilteredSongs] = useState<Song[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [hideTab, setHideTab] = useState(false);
  const ionContentRef = useRef<HTMLIonContentElement | null>(null);
  const lastScrollTop = useRef(0);

  useEffect(() => {
    const fetchOfflineSongs = async () => {
      const offlineSongs = await getOfflineSongs();
      console.log("offline songs", offlineSongs);
      setSavedSongs(offlineSongs);
      setFilteredSongs(offlineSongs);
    };

    fetchOfflineSongs();
  }, []);

  const setLocalSongs = async (song: Song, idx: number) => {
    setSongs(savedSongs);
    playSong(song, idx);
    openModal(<GlobalPlaySong />);
  };

  // Sorting function
  const sortSongs = () => {
    const sorted = [...filteredSongs].sort((a, b) =>
      sortOrder === "asc"
        ? a.song_name.localeCompare(b.song_name)
        : b.song_name.localeCompare(a.song_name)
    );
    setFilteredSongs(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Search function
  useEffect(() => {
    if (searchQuery === "") {
      setFilteredSongs(savedSongs);
    } else {
      const filtered = savedSongs.filter((song) =>
        song.song_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredSongs(filtered);
    }
  }, [searchQuery, savedSongs]);

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
              <SearchIcon width="24px" height="24px" />
              <IonInput
                className={`font-urbanist text-base font-medium leading-[18px] ${
                  isInputFocused ? "text-[#060307]" : "text-[#99989A]"
                }`}
                placeholder="What do you want to listen to?"
                value={searchQuery}
                onIonInput={(e) => setSearchQuery(e.detail.value!)}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
              />
            </div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen scrollY={false}>
        <div className="px-5 mt-4">
          <div className="pt-2 flex items-center justify-between">
            <p className="text-[#060307] font-urbanist text-base font-semibold leading-5 capitalize">
              Saved Songs
            </p>
            <button
              onClick={sortSongs}
              className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-xs"
            >
              Sort {sortOrder === "asc" ? "A-Z" : "Z-A"}
            </button>
            <p className="text-[#7F8489] mb-0 font-urbanist text-xs font-medium leading-normal capitalize">
              {filteredSongs.length} songs
            </p>
          </div>
          <div
            style={{ maxHeight: "calc(100vh - 100px)", scrollbarWidth: "none" }}
            className="mt-4 mb-8 grid grid-cols-1 gap-6 overflow-y-auto scroll-smooth"
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
                    song.song_image_url !== "" ? song.song_image_url : DefaultMusicIcon
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

export default SavedSongs;
