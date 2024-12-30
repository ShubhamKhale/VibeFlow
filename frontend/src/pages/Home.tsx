import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRouterLink,
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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PlaySong from "../components/PlaySong";

// Define the structure of a song
interface Song {
  songname: string;
  songurl: string;
  songartist: string;
}

// Define the structure of a playlist
interface Playlist {
  _id: string;
  playlistname: string;
  playlisturl: string;
  playlistimage: string;
  playlistartist: string;
  playlistsongs: Song[];
}

interface NewReleaseSong {
  _id: string;
  songname: string;
  songurl: string;
  songimage: string;
  songartist: string;
}

interface SongDetails {
  SongTitle: string,
  SongUrl: string,
  ImageURL: string,
  Artists: string
}

const Home: React.FC = () => {
  const [isPlaySongCompOpen, setIsPlaySongCompOpen] = useState(false);
  const [clickSongIndex, setClickSongIndex] = useState(0);
  const [trendingPlaylists, setTrendingPlaylists] = useState<Playlist[]>([]);
  const [newReleaseSongs, setNewReleaseSongs] = useState<NewReleaseSong[]>([]);
  const navigate = useNavigate();

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

  const openSongModal = (index: number) => {
    setClickSongIndex(index);
    setIsPlaySongCompOpen(true);
  };

  const mappedSongs: SongDetails[] = newReleaseSongs.map((song) => ({
    SongTitle: song.songname,
    SongUrl: song.songurl,
    ImageURL: song.songimage,
    Artists: song.songartist,
  }));

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <div className="flex items-center justify-between">
              <p className="text-[#060307] font-urbanist text-lg font-semibold leading-normal">
                Good evening
              </p>
              <div className="flex items-center gap-x-7">
                {/* <MessageIcon /> */}
                <IonRouterLink routerLink="/profile">
                  <ProfileIcon />
                </IonRouterLink>
              </div>
            </div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="px-5 pb-24 mt-7">
          {/* <div className="flex items-center justify-between">
            <p className="text-[#060307] font-urbanist text-base font-semibold leading-5">
              Playlists
            </p>
            <p className="text-[#99989A] font-urbanist text-sm font-semibold leading-normal">
              Show all
            </p>
          </div>
          <div className="mt-4 grid grid-flow-col items-center gap-x-3 w-full overflow-x-scroll scrollbar-hide scroll-smooth">
            {[0, 1, 2, 3, 4].map((i) => (
              <PlaylistComp key={i} imgSrc={PlaylistImg} playNum={i + 1} />
            ))}
          </div> */}
          <div className="mt-7 flex items-center justify-between">
            <p className="text-[#060307] font-urbanist text-base font-semibold leading-5">
              Trending Playlist
            </p>
            <p className="text-[#99989A] font-urbanist text-sm font-semibold leading-normal">
              Show all
            </p>
          </div>
          <div className="mt-4 grid grid-flow-col items-center gap-x-3 w-full overflow-y-hidden overflow-x-auto scrollbar-hide scroll-smooth">
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
          <div className="mt-7 flex items-center justify-between">
            <p className="text-[#060307] font-urbanist text-base font-semibold leading-5 capitalize">
              new releases for you
            </p>
            <p className="text-[#99989A] font-urbanist text-sm font-semibold leading-normal">
              Show all
            </p>
          </div>
          <div className="mt-4 grid grid-flow-col items-center gap-x-3 w-full overflow-y-hidden overflow-x-auto scrollbar-hide scroll-smooth">
            {newReleaseSongs?.map((song, i) => (
              <div key={i} onClick={() => openSongModal(i)}>
                <DisplayCard
                  imgSrc={song?.songimage}
                  albumName={song?.songname}
                  albumArtist={song?.songartist}
                />
              </div>
            ))}
          </div>
        </div>

         {/* PlaySong Modal */}
      <IonModal isOpen={isPlaySongCompOpen} onDidDismiss={() => setIsPlaySongCompOpen(false)}>
        <PlaySong
          songIndex={clickSongIndex}
          songs={mappedSongs}
          onClose={() => setIsPlaySongCompOpen(false)}
        />
      </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Home;
