import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPlaylist } from "../services/apiService";
import { useEffect, useState } from "react";
import ThreeDotsIcon from "../icons/ThreeDots";
import LeftArrowIcon from "../icons/LeftArrowIcon";
import { Song } from "../App";
import { useSongContext } from "../context/SongContext";
import { getItem, setItem } from "../services/storageService";
import GlobalPlaySong from "../components/GlobalPlaySong";


const DetailedPlaylist: React.FC = () => {
  const { songs, setSongs, playSong, openModal } = useSongContext();
  const navigate = useNavigate();
  const { userId, playlistName, playlistImage } = useParams<{
    userId: string;
    playlistName: string;
    playlistImage: string;
  }>();
  const [playlistSongs, setPlaylistSongs] = useState<Song[]>([]);

  const getPlaylist = async () => {
    try {
      const response = await fetchPlaylist(userId, playlistName);
      // console.log("fetchplaylist response :- ", response);
      console.log("playlist songs :- ", response.playlistsongs)
      setPlaylistSongs(response.playlistsongs);
      console.log("playlistSongs", playlistSongs);  
    } catch (error) {    
      console.log("fetchplaylist api error :- ", error);
    }  
  };   
         
  useEffect(() => {    
    getPlaylist();
  }, [userId, playlistName]);   

  const truncateText = (text: string, maxLength: number): string => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  const setLocalSongs = async (song: Song, idx: any) => {
    console.log("playlistSongs :- ", playlistSongs)
    await setItem("songs", playlistSongs);
    const localsongs = await getItem("songs");
    setSongs(localsongs);
    playSong(song, idx);
    // navigate("/song-player")
    openModal(<GlobalPlaySong />);
  };

  return (
    <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>
          <div onClick={() => {navigate("/playlist")}}>
            <LeftArrowIcon width="24px" height="24px" />
          </div>
        </IonTitle>
      </IonToolbar>   
    </IonHeader>
    <IonContent fullscreen>
      <div className="px-4">
        <div className="mt-8 flex items-center gap-x-4">
          <img   
            className="w-[130px] h-[130px] rounded-tl-[20px] rounded-br-[20px] object-cover border-black border-2"
            src={playlistImage}
            alt="playlist image"      
          />
          <div>
            <p className="text-lg font-semibold font-urbanist">
              {playlistName}
            </p>
            <p className="text-sm text-[#7F8489] font-medium font-urbanist">
              {playlistSongs.length} Songs
            </p>
            <button className="mt-2 px-5 py-1.5 bg-[#655FDF] text-white rounded-lg text-center" onClick={() => {
              setLocalSongs(playlistSongs[0], 0)
            }}>   
              Play      
            </button>
          </div>   
        </div>
        <div className="mt-8 h-[260px] overflow-y-scroll">
            {playlistSongs?.map((song, i) => (
              <div key={i} className="w-full pl-2 pr-3 mt-2 flex items-center justify-between bg-[#D9D9D9] rounded-lg">
                <div className="py-2" onClick={() => {setLocalSongs(song, i)}}>
                  <p className="font-urbanist text-xs font-semibold">
                    {song.song_name}
                  </p>     
                  <p className="font-urbanist text-xs font-semibold">
                    { truncateText(song.primary_artists, 35)}
                  </p>      
                </div>   
                {/* <div>
                  <ThreeDotsIcon width="24px" height="24px" />
                </div> */}
              </div>
            ))}
          </div>
      </div>
    </IonContent>
  </IonPage>
  );
};

export default DetailedPlaylist;
