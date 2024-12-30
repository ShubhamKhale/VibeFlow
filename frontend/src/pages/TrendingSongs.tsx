import {
  IonContent,
  IonHeader,
  IonPage,
  IonRouterLink,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import LeftArrowIcon from "../icons/LeftArrowIcon";
import DisplayCard from "../components/DisplayCard";
import RecentlyPlayedImg from "../images/recentlyPlayedImg.png";
import ThreeDotsIcon from "../icons/ThreeDots";
import { useEffect, useState } from "react";
import { getTrendingPlaylist } from "../services/apiService";
import { useParams } from "react-router-dom";

interface Song {
  songname: string;
  songurl: string;
  songartist: string;
}

interface Playlist {
  _id: string;
  playlistname: string;
  playlisturl: string;
  playlistimage: string;
  playlistartist: string;
  playlistsongs: Song[];
}

const truncateText = (text: string, maxLength: number): string => {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

const TrendingSongs: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  console.log("id", id);

  const [playlistId, setPlaylistId] = useState<string | undefined>(id);
  const [playlist, setPlaylist] = useState<Playlist>();

  useEffect(() => {
    const fetchTrendingPlaylist = async () => {
      if (playlistId) {
        try {
          const trendingPlaylist = await getTrendingPlaylist(playlistId);
          console.log("Trending Playlist:", trendingPlaylist);
          setPlaylist(trendingPlaylist.mongodoc);
        } catch (error) {
          console.error("Error fetching trending playlist:", error);
        }
      }
    };

    fetchTrendingPlaylist();
  }, [playlistId]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <IonRouterLink routerLink="/home">
              <LeftArrowIcon width="24px" height="24px" />
            </IonRouterLink>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="px-4">
          <p className="mt-4 font-semibold text-xl font-urbanist">
            Trending Songs
          </p>
          <div className="mt-4 flex items-center gap-x-4">
            <img
              className="w-[130px] h-[130px] rounded-tl-[20px] rounded-br-[20px] object-cover"
              src={playlist?.playlistimage}
              alt="playlist image"
            />
            <div>
              <p className="text-lg font-semibold font-urbanist">
                {playlist?.playlistname}
              </p>
              <p className="text-sm text-[#7F8489] font-medium font-urbanist">
                {playlist?.playlistsongs?.length} Songs
              </p>
              <button className="mt-2 px-5 py-1.5 bg-[#655FDF] text-white rounded-lg text-center">
                Play
              </button>
            </div>
          </div>
          <div className="mt-8 h-[260px] overflow-y-scroll">
            {playlist?.playlistsongs?.map((song, i) => (
              <div key={i} className="w-full pl-2 pr-3 mt-2 flex items-center justify-between bg-[#D9D9D9] rounded-lg">
                <div className="py-2">
                  <p className="font-urbanist text-xs font-semibold">
                    {song?.songname}
                  </p>
                  <p className="font-urbanist text-xs font-semibold">
                    { truncateText(song?.songartist, 35)}
                  </p>
                </div>
                <div>
                  <ThreeDotsIcon width="24px" height="24px" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TrendingSongs;
