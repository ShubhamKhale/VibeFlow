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
import { searchSongs } from "../services/apiService"
import { useNavigate } from "react-router-dom";


const Search: React.FC = () => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [showSearchHistoryContainer, setShowSearchHistoryContainer] =
    useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [songs, setSongs] = useState<any[]>([]); 
  const [clickSongIndex, setClickSongIndex] = useState<number>(0)
  const [isPlaySongCompOpen, setIsPlaySongCompOpen] = useState<boolean>(false)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);   

    return () => {
      clearTimeout(handler);    
    };
  }, [searchQuery]);

  // Fetch songs whenever debouncedSearchQuery changes 
  useEffect(() => {
    if (debouncedSearchQuery) {
      setLoading(true);
      const encodedQuery = encodeURIComponent(debouncedSearchQuery);
      searchSongs(encodedQuery)
      .then((data) => {
        console.log("data", data)
        setSongs(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching song:", error);
        setLoading(false); 
      })
    }
  }, [debouncedSearchQuery])

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
        <div className="px-5 mt-7 mb-7">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <IonSpinner name="crescent" />
            </div>
          ) 
          : (   
            <div>
              {/* showSearchHistoryContainer ? (
                <SearchHistoryContainer />
              )    
              : ( */}
                <>
                  <p className="text-[#060307] font-urbanist text-base font-semibold leading-normal">
                    Browse All
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    {/* {uniqueGenresArray?.map((genre, i) => (
                      <div
                        key={i}
                        className="max-w-fit p-2.5 flex items-center gap-x-3 flex-shrink-0 rounded-[10px] bg-[#EDEDED]"
                      >
                        <img
                          className="w-11 h-11 rounded-xl"
                          src={genre?.picture || DefaultMusicIcon}
                        />
                        <p className="text-[#060307] font-urbanist text-xs font-semibold leading-normal capitalize">
                          {genre?.name}
                        </p>
                      </div>
                    ))} */}
                  </div>
                  <div className="mt-4">
                    <div className="mt-4 grid grid-cols-1 gap-4">
                      {songs.map((song, i) => (
                        <div key={i} className="flex items-center gap-x-3" onClick={() => {
                          setClickSongIndex(i)
                          setIsPlaySongCompOpen(true)
                        }}  >
                          <img
                            className="w-11 h-11 rounded-xl"
                            src={song.ImageURL != "" ? song.ImageURL : DefaultMusicIcon}
                          />
                          <div>
                            <p className="text-[#060307] font-urbanist text-xs font-semibold leading-normal capitalize">
                              {song.SongTitle}
                            </p>
                            <p className="text-[#060307] font-urbanist text-xs leading-normal capitalize">
                              {song.Artists}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
                
                 
            </div>
          )}
        </div>
        {/* Drawer Modal for PlaySong */}
        <IonModal isOpen={isPlaySongCompOpen} onDidDismiss={() => setIsPlaySongCompOpen(false)} >
          { <PlaySong songIndex={clickSongIndex} songs={songs} onClose={() => setIsPlaySongCompOpen(false)}  />}
        </IonModal>  
      </IonContent>   
    </IonPage>
  );
};

export default Search;
