import {
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import PlusIcon from "../icons/PlustIcon";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { addSongToPlaylist, fetchPlaylists } from "../services/apiService";
import { getItem, removeItem, setItem } from "../services/storageService";
import { Song } from "../App";

type Playlist = {
  PlaylistName: string;
  PlaylistImg: string;
  PlaylistSongs: {
    songname: string;
    artist: string;
    url: string;
  }[];
};

const Playlist: React.FC = () => {
  const navigate = useNavigate();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);

  const selectPlaylist = async (playlistData: Playlist) => {

    const playlistSong = await getItem("playlist_song");
    // console.log("playlist song", playlistSong)

    // console.log("playlist data :- ", playlistData)
    const userId = await getItem("userId");
    console.log(playlistData?.PlaylistName);    


    // console.log("type of playlist song", typeof(playlistSong))

    if (playlistSong && typeof playlistSong === "object") {
      try {
        const response = await addSongToPlaylist(userId, playlistData?.PlaylistName, playlistSong);
        // console.log("Song added successfully:", response);
        await removeItem("playlist_song");
      } catch (error) {
        console.error("Error adding song:", error);
      } finally {
        navigate("/search");   
      }
    } else {    
      // navigate(`/detailed-playlist/${userId}/${encodeURIComponent(playlistData?.PlaylistName)}`);
      navigate(
        `/detailed-playlist/${userId}/${encodeURIComponent(playlistData?.PlaylistName)}/${encodeURIComponent(playlistData?.PlaylistImg)}`
      );
      
      
    }
   
  }

  const getPlaylists = async () => {
    try {
      const userId = await getItem("userId");
      const response = await fetchPlaylists(userId);
      // console.log("response of get user playlist api", response);
      setPlaylists(response.playlists);
    } catch (error) {
      console.log("error response of get user playlist api", error);
    } 
  };

  useEffect(() => {
    getPlaylists();
  }, []);

  
  

  return (
    <IonPage>
      {/* <IonHeader>
        <IonToolbar>
          <IonTitle>
            <div className="flex items-center gap-x-3">
              <SearchIcon className="" width="24px" height="24px" />
              <IonInput
                className={`font-urbanist text-base font-medium leading-[18px]  text-[#060307]`}
                placeholder="What do you want to listen to?"
              />
            </div>
          </IonTitle>
        </IonToolbar>
      </IonHeader> */}
      <IonContent fullscreen>
        <div className="px-5 mt-7 mb-7 ">
          <div className="mt-5 flex items-center justify-between">
            <div>
              <p className="text-[#060307] pt-2 font-urbanist text-base font-semibold leading-5 capitalize">
                Playlists
                <span className="text-[#7F8489] ml-4 mb-0 font-urbanist text-xs font-medium leading-normal capitalize">
                  {playlists.length} lists
                </span>
              </p>
            </div>
            <button
              onClick={() => {
                navigate("/create-playlist");
              }}
            >
              <PlusIcon
                width="32px"
                height="32px"
                className="bg-gradient-to-b from-[#FD4E6B] to-[#D4314C] rounded-full"
              />
            </button>
          </div>

          <div
            style={{ maxHeight: "calc(100vh - 135px)", scrollbarWidth: "none" }}
            className="mt-10 grid grid-cols-2 gap-4 overflow-y-auto scroll-smooth"
          >
            {playlists?.map((playlist, index) => (
              <div key={index} onClick={() => {selectPlaylist(playlist)}} >
                <div className="bg-[#EDEDED] rounded-2xl border-4">
                  <img
                    src={playlist?.PlaylistImg}
                    className="w-full h-full rounded-2xl"
                  />   
                </div>
                <p className="mt-2 text-[#060307] text-center text-base font-semibold font-urbanist">
                  {playlist?.PlaylistName}
                </p>
              </div>
            ))}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Playlist;
