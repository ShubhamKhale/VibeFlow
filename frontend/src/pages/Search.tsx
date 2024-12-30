import {
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonModal,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import SearchIcon from "../icons/SearchIcon";
import RecentlyPlayedImg from "../images/recentlyPlayedImg.png";
import DefaultMusicIcon from "../images/default-music-icon.jpg";
import { useCallback, useEffect, useState } from "react";
import SearchHistoryContainer from "../components/SearchHistoryContainer";
import PlaySong from "../components/PlaySong";
import {
  getTopAlbumns,
  getTopGenres,
  searchJioSaavnSongs,
  searchSongs,
} from "../services/apiService";
import { useNavigate } from "react-router-dom";
import MusicLoading from "../icons/music-loading.gif";
import MusicPlaying from "../icons/music-playing.gif";
import { useModal } from "../context/ModalContext";
import { useSong } from "../context/SongContext"; // Import the SongContext hook

const Search: React.FC = () => {
  const { setIsModalOpen } = useModal();
  const { setPlaylist, playSong } = useSong(); // Destructure methods from the context
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [showSearchHistoryContainer, setShowSearchHistoryContainer] =
    useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [searchSongs, setSearchSongs] = useState<any[]>([]);
  const [clickSongIndex, setClickSongIndex] = useState<number>(0);
  const [isPlaySongCompOpen, setIsPlaySongCompOpen] = useState<boolean>(false);
  const [topAlbumns, setTopAlbumns] = useState<any[]>([]);

  useEffect(() => {
    getTopAlbumns()
      .then((data) => {
        console.log("top albumns response", data.mongodocs);
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

  // Fetch songs whenever debouncedSearchQuery changes
  useEffect(() => {
    if (debouncedSearchQuery) {
      setLoading(true);
      const encodedQuery = encodeURIComponent(debouncedSearchQuery);

      searchJioSaavnSongs(encodedQuery)
        .then((data) => {
          console.log("search jiosaavn songs", data);
          if (data != null) {
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

  const handlePlaySong = (song: any) => {
    console.log("song clicked !!!", song)
    playSong(song); // Set the selected song as the current song in the global context
    setPlaylist(searchSongs); 
    setIsModalOpen(true)
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      setDebouncedSearchQuery(searchQuery);
    }
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
            <div className=" mt-[50%] flex justify-center items-center">
              <img className="w-44 h-44" src={MusicLoading} alt="-" />
            </div>
          ) : (
            <div>
              <>
                {searchSongs?.length === 0 ? (
                  <div className=" mt-2 mb-[7rem] grid grid-cols-2 gap-x-2 gap-y-4 items-center">
                    {topAlbumns?.map((albumn, i) => (
                      <div
                        key={i}
                        className="py-3 flex flex-col items-center rounded-[10px] bg-[#EDEDED]"
                      >
                        <img
                          className="w-[130px] h-[130px] object-cover rounded-xl"
                          src={albumn?.albumnimg || DefaultMusicIcon}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-4">
                    <div className="mt-4 grid grid-cols-1 gap-6">
                      {searchSongs.map((song, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-x-3"
                          onClick={() => handlePlaySong(song)} // Play the selected song on click
                        >
                          <img
                            className="w-[100px] h-[100px] object-cover rounded-xl"
                            src={
                              song?.song_image_url !== ""
                                ? song?.song_image_url
                                : DefaultMusicIcon
                            }
                          />
                          <div>
                            <p className="text-[#060307] font-urbanist text-[16px] font-semibold leading-normal capitalize">
                              {song?.song_name}
                            </p>
                            <p className="text-[#060307] font-urbanist text-xs leading-normal capitalize">
                              {song?.primary_artists}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Search;
