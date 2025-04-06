import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonModal,
} from "@ionic/react";
import "./Home.css";
import MessageIcon from "../icons/MessageIcon";
import ProfileIcon from "../icons/ProfileIcon";
import PlaylistImg from "../images/playlistImg.png";
import RecentlyPlayedImg from "../images/recentlyPlayedImg.png";
import PlaylistComp from "../components/PlaylistComp";
import DisplayCard from "../components/DisplayCard";
import {
  getNewReleaseSongs,
  getTrendingPlaylists,
} from "../services/apiService";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PlaySong from "../components/PlaySong";
import { useSongContext } from "../context/SongContext";
import { Song } from "../App";
import TabNavigator from "../components/TabNavigator";

// Define the structure of a song
// interface Song {
//   songname: string;
//   songurl: string;
//   songartist: string;
// }

// Define the structure of a playlist
interface Playlist {
  _id: string;
  playlistname: string;
  playlisturl: string;
  playlistimage: string;
  playlistartist: string;
  playlistsongs: Song[];
}

// interface NewReleaseSong {
//   _id: string;
//   songname: string;
//   songurl: string;
//   songimage: string;
//   songartist: string;
// }

interface SongDetails {
  SongTitle: string;
  SongUrl: string;
  ImageURL: string;
  Artists: string;
}

const Home: React.FC = () => {
  const [trendingPlaylists, setTrendingPlaylists] = useState<Playlist[]>([]);
  const [newReleaseSongs, setNewReleaseSongs] = useState<Song[]>([]);
  const navigate = useNavigate();
  const [hideTab, setHideTab] = useState(false);
  const ionContentRef = useRef<HTMLIonContentElement | null>(null);
  const lastScrollTop = useRef(0);

  useEffect(() => {
    getTrendingPlaylists()
      .then((data) => {
        setTrendingPlaylists(data.mongodocs);
      })
      .catch((error) => {
        console.error("Error fetching trending songs:", error);
      });

    getNewReleaseSongs()
      .then((data) => {
        console.log("new release songs api response", data.mongodocs);
        setNewReleaseSongs(data.mongodocs);
      })
      .catch((error) => {
        console.error("Error fetching new release songs:", error);
      });
  }, []);

  const handlePlaylistClick = (playlist: Playlist) => {
    console.log("Playlist Clicked:", playlist?._id);
    navigate(`/trending-playlist/${playlist._id}`, { state: { playlist } });
  };

  const handleScroll = (event: CustomEvent) => {
    const scrollTop = event.detail.scrollTop;

    if (scrollTop > 0) {
      setHideTab(true);
    } else {
      setHideTab(false);
    }
    lastScrollTop.current = scrollTop;
  };

  const mappedSongs: SongDetails[] = newReleaseSongs.map((song) => ({
    SongTitle: song.song_name,
    SongUrl: song.song_audio_url,
    ImageURL: song.song_image_url,
    Artists: song.primary_artists,
  }));

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <div className="flex items-center justify-between">
              <p className="text-[#060307] font-urbanist text-lg font-semibold leading-normal">
                VibeFlow
              </p>
              {/* <div onClick={() => {navigate('/profile')}} className="flex items-center gap-x-7">
               
                  <ProfileIcon />
              </div> */}
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
        <div className="px-5 pb-24 mt-7">
          <div className="mt-7 flex items-center justify-between">
            <p className="text-[#060307] font-urbanist text-base font-semibold leading-5">
              Trending Playlist
            </p>
          </div>  
          <div className="mt-4 grid grid-cols-2 items-center gap-3 w-full overflow-y-hidden overflow-x-auto scrollbar-hide scroll-smooth">
            {trendingPlaylists?.map((playlist, i) => (
              <div key={i} onClick={() => handlePlaylistClick(playlist)}>
                <DisplayCard
                  imgSrc={playlist?.playlistimage}
                  albumName={playlist?.playlistname}
                  albumArtist={playlist?.playlistartist}
                />
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

export default Home;
