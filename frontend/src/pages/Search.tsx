import {
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import SearchIcon from "../icons/SearchIcon";
import RecentlyPlayedImg from "../images/recentlyPlayedImg.png";
import DefaultMusicIcon from "../images/default-music-icon.jpg"
import { useCallback, useEffect, useState } from "react";
import SearchHistoryContainer from "../components/SearchHistoryContainer";
import { searchSongs, getGenres } from "../services/apiService";

interface Genre {
  id: string;
  name: string;
  picture: string;
}

const Search: React.FC = () => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [showSearchHistoryContainer, setShowSearchHistoryContainer] =
    useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>("");
  const [uniqueGenresArray, setUniqueGenresArray] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);

  // genre id's array 
  const genres = [
    "132",   
    "116",
    "152",
    "129",
    "98",
    "106",
    "113",
    "144",
    "88",
    "197",
    "167",
    "95",
    "464",
    "173",
    "196",
    "85",
    "16",
    "356",
  ];

  // Fetch genres using genre id's
  const getGenresFunc = async () => {
    const uniqueGenresSet: Set<string> = new Set();
    const tempUniqueGenresArray: Genre[] = [];
    try {
      for (const genre of genres) {
        const response: Genre = await getGenres({ genre: genre });
        console.log("", response.picture);
        if (!uniqueGenresSet.has(response.id)) {
          uniqueGenresSet.add(response.id);
          tempUniqueGenresArray.push(response);
        }   
      }
      setUniqueGenresArray(tempUniqueGenresArray);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch songs based on the debounced search query'
  const searchSongsFunc = useCallback(async () => {
    if (debouncedSearchQuery) {
      try {
        const response = await searchSongs({ query: debouncedSearchQuery });
        console.log("response of search songs api :- ", response);
      } catch (error) {
        console.error(error);
      }
    }
  }, [debouncedSearchQuery]);

  useEffect(() => {
    // Call the search function when debouncedSearchQuery changes
    searchSongsFunc();
  }, [searchSongsFunc]);

  // Debounce the search query input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500); // Adjust the delay (500ms) as needed

    return () => {
      clearTimeout(handler); // Cleanup the timeout on component unmount or when searchQuery changes
    };
  }, [searchQuery]);

  useEffect(() => {
    getGenresFunc();
  }, []);

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
          ) : showSearchHistoryContainer ? (
            <SearchHistoryContainer />
          ) : (
            <div>
              <p className="text-[#060307] font-urbanist text-base font-semibold leading-normal">
                Browse All
              </p>
              <div className="mt-4 grid grid-cols-2 gap-4">
                {uniqueGenresArray?.map((genre, i) => (
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
