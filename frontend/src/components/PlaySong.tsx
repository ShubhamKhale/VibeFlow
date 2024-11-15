import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonRange,
  IonRouterLink,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import LeftArrowIcon from "../icons/LeftArrowIcon";
import RecentlyPlayedImg from "../images/recentlyPlayedImg.png";
import PlaySongBgImg from "../images/playSongBgImg.png";
import LanguageIcon from "../icons/LanguageIcon";
import VersionIcon from "../icons/VersionIcon";
import MenuIcon from "../icons/MenuIcon";
import SoundIcon from "../icons/SoundIcon";
import HeartIcon from "../icons/HeartIcon";
import CommentIcon from "../icons/CommentIcon";
import ShareIcon from "../icons/ShareIcon";
import "./PlaySong.css";
import ShuffleIcon from "../icons/ShuffleIcon";
import PreviousIcon from "../icons/PreviousIcon";
import PauseIcon from "../icons/PauseIcon";
import NextIcon from "../icons/NextIcon";
import RepeatOnceMoreIcon from "../icons/RepeatOnceMoreIcon";
import { useEffect, useRef, useState } from "react";
import PlayIcon from "../icons/PlayIcon";
import SoundMutedIcon from "../icons/SoundMutedIcon";
import { useLocation } from "react-router";
import { getSongMp3 } from "../services/apiService";

interface SongDetails {
  SongTitle: string,
  SongUrl: string,
  ImageURL: string,
  Artists: string
}

interface PlaySongProps {
  songs: SongDetails[];
  songIndex: number;
  onClose: () => void; // Add this to props
}

const PlaySong: React.FC<PlaySongProps> = ({ songs, songIndex, onClose }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [songmp3url, setSongMp3Url] = useState("");
  
  const currentSong = songs[songIndex];
  const hasFetched = useRef(false);


  useEffect(() => {


    if (hasFetched.current) {
    getSongMp3(currentSong.SongUrl)
    .then((data) => {
      console.log("mp3 url", data)
      setSongMp3Url(data)
      hasFetched.current = true;
    })
    .catch((error) => {
      console.error("Error fetching song's mp3 url:", error);
    })
  }

    console.log("song mp3 url", songmp3url)

  
  }, [songmp3url]);

  useEffect(() => {
    if (songmp3url) {
      const audio = new Audio(songmp3url);
      audioRef.current = audio;
  
      const updateTime = () => {
        setCurrentTime(audio.currentTime);
  
        if (audio.currentTime === audio.duration) {
          setIsPlaying(false);
        }
      };
  
      const setAudioDuration = () => {
        setDuration(audio.duration);
      };
  
      audio.addEventListener("timeupdate", updateTime);
      audio.addEventListener("loadedmetadata", setAudioDuration);
  
      return () => {
        audio.pause();
        audio.removeEventListener("timeupdate", updateTime);
        audio.removeEventListener("loadedmetadata", setAudioDuration);
      };
    }
  }, [songmp3url]);
  
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleRangeChange = (event: CustomEvent) => {
    const newTime = event.detail.value as number;
  
    if (audioRef.current) {
      // Update the audio's current time
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${formattedSeconds}`;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <div className="flex items-center justify-between">
              <IonRouterLink  onClick={onClose} className="">
                <LeftArrowIcon width="24px" height="24px" />
              </IonRouterLink>

              <div className="space-y-1">
                <p className="mb-0 font-urbanist text-xs font-medium text-center">
                  Playing From Search
                </p>
                <p className="mb-0 font-urbanist text-sm font-semibold text-center">
                  Trending New
                </p>
              </div>

              <MenuIcon width="24px" height="24px" />
            </div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="overflow-y-scroll bg-gray-500">
        <div>    
          <img
            className="w-full h-[350px] object-cover"
            src={currentSong.ImageURL != "" ? currentSong.ImageURL : PlaySongBgImg}
            alt="-"
          />
          <div className="px-5 mt-2 ">
            <div className="flex items-center justify-between">
              <div onClick={toggleMute}>
                {isMuted ? (
                  <SoundMutedIcon width="24px" height="24px" />
                ) : (
                  <SoundIcon width="24px" height="24px" />
                )}
              </div>
              <HeartIcon width="24px" height="24px" />
              <ShareIcon width="24px" height="24px" />
              <div className="rounded-lg   py-1.5 px-4 bg-[#EDEDED]">
                <p className="mb-0 font-urbanist font-semibold text-sm leading-5 text-center text-[#060307]">
                  Lyrics
                </p>
              </div>
            </div>
          </div>

          <div className="px-5 mt-4">
            <div className="">
              <p className="mb-0 font-urbanist font-semibold text-lg leading-[18px] text-center text-[#060307]">
                {currentSong.SongTitle}
              </p>
              <p className="mb-0 font-urbanist font-medium text-xs leading-[14px] text-center text-[#989CA0]">
                {currentSong.Artists}
              </p>
            </div>
          </div>
          <div className="px-5 mt-4 flex items-center ">
            <p className="mb-0  font-urbanist font-semibold text-sm text-[#060307]">
              {formatTime(currentTime)}
            </p>
            <audio
              ref={audioRef}
              src="https://raag.fm/files/mp3/128/Hindi-Singles/23303/Kesariya%20(Brahmastra)%20-%20(Raag.Fm).mp3"
              muted={isMuted}
            ></audio>
            <IonRange
              className="w-[240px] mx-6"
              min={0}
              max={duration}
              step={1}
              value={currentTime}
              onIonChange={handleRangeChange}
            ></IonRange>
            <p className="mb-0 text-right  font-urbanist font-semibold text-sm text-[#060307]">
              {formatTime(duration)}
            </p>
          </div>

          <div className="px-5 mt-3 flex items-center justify-between">
            <ShuffleIcon width="24px" height="24px" />
            <PreviousIcon width="28px" height="28px" />
            <div
              className="p-4 flex items-center justify-center  rounded-full bg-gradient-to-b from-[#FD4E6B] to-[#D4314C] cursor-pointer"
              onClick={togglePlay}
            >
              {isPlaying ? (
                <PauseIcon width="32px" height="32px" />
              ) : (
                <PlayIcon width="32px" height="32px" />
              )}
            </div>
            <NextIcon width="28px" height="28px" />
            <RepeatOnceMoreIcon width="24px" height="24px" />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PlaySong;
