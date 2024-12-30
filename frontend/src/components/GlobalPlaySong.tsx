import {
  IonButton,
  IonContent,
  IonHeader,
  IonModal,
  IonPage,
  IonRange,
  IonRouterLink,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useSong } from "../context/SongContext";
import LeftArrowIcon from "../icons/LeftArrowIcon";
import MenuIcon from "../icons/MenuIcon";
import SoundMutedIcon from "../icons/SoundMutedIcon";
import SoundIcon from "../icons/SoundIcon";
import HeartIcon from "../icons/HeartIcon";
import ShareIcon from "../icons/ShareIcon";
import ShuffleIcon from "../icons/ShuffleIcon";
import PreviousIcon from "../icons/PreviousIcon";
import PauseIcon from "../icons/PauseIcon";
import PlayIcon from "../icons/PlayIcon";
import NextIcon from "../icons/NextIcon";
import RepeatOnceMoreIcon from "../icons/RepeatOnceMoreIcon";
import DefaultMusicIcon from "../images/default-music-icon.jpg";
import { useRef, useState, useEffect } from "react";
import { useModal } from "../context/ModalContext";
import EqualizerIcon from "../icons/Equalizer";

const GlobalPlaySong: React.FC = () => {
  const {
    currentSong: songFromContext,
    playNextSong,
    playPreviousSong,
  } = useSong();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showLyrics, setShowLyrics] = useState(false);
  const [isEqualizerModalOpen, setIsEqualizerModalOpen] = useState(false);
  const { isModalOpen, setIsModalOpen } = useModal();

  useEffect(() => {
    const audioElement = audioRef.current;

    if (audioElement) {
      // Update currentTime during playback
      const handleTimeUpdate = () => {
        setCurrentTime(audioElement.currentTime);
      };

      // Set duration when metadata is loaded
      const handleLoadedMetadata = () => {
        setDuration(audioElement.duration);
      };

      audioElement.addEventListener("timeupdate", handleTimeUpdate);
      audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);

      // Cleanup event listeners
      return () => {
        audioElement.removeEventListener("timeupdate", handleTimeUpdate);
        audioElement.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
      };
    }
  }, []);

  useEffect(() => {
    if (audioRef.current && songFromContext) {
      audioRef.current.src = songFromContext.song_audio_url;
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [songFromContext]);

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
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  if (!isModalOpen) return null;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <div className={`flex items-center justify-between `}>
              <IonRouterLink>
                <LeftArrowIcon width="24px" height="24px" />
              </IonRouterLink>
              {/* <MenuIcon width="24px" height="24px" /> */}
            </div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="overflow-y-scroll bg-gray-500">
        {songFromContext && (
          <div>
            {showLyrics ? (
              <div className="p-6 w-full h-[400px] overflow-y-scroll scrollbar-hidden text-[16px] text-white bg-gradient-to-b from-[#060307]/90 via-[#060307]/96 to-[#060307]/85">
                {/* {songFromContext?.lyrics.replace(/<br>/g, '\n')} */}
                {songFromContext?.lyrics
                  .replaceAll(",", "\n")
                  .replaceAll(/<br>/g, "\n")}
              </div>
            ) : (
              <img
                className="w-[100vw] h-[400px] object-cover"
                src={
                  songFromContext?.song_image_url != ""
                    ? songFromContext?.song_image_url.replace(
                        "150x150",
                        "500x500"
                      )
                    : DefaultMusicIcon
                }
                alt={songFromContext?.song_name}
              />
            )}

            <div className="px-5 mt-2 ">
              <div className="mt-8 flex items-center justify-center gap-x-6">
                <div onClick={toggleMute}>
                  {isMuted ? (
                    <SoundMutedIcon width="24px" height="24px" />
                  ) : (
                    <SoundIcon width="24px" height="24px" />
                  )}
                </div>
                <HeartIcon width="24px" height="24px" />
                <ShareIcon width="24px" height="24px" />
                <div
                  onClick={() => {
                    setIsEqualizerModalOpen(true);
                  }}
                >
                  <EqualizerIcon width="24px" height="24px" />
                </div>
                {songFromContext?.has_lyrics == "true" && (
                  <div
                    className="rounded-lg   py-1.5 px-4 bg-[#EDEDED]"
                    onClick={() => {
                      setShowLyrics(!showLyrics);
                    }}
                  >
                    <p className="mb-0 font-urbanist font-semibold text-sm leading-5 text-center text-[#060307]">
                      {showLyrics ? "Song" : "Lyrics"}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="px-5 mt-4">
              <div className="">
                <p className="mb-0 font-urbanist font-semibold text-lg leading-[18px] text-center text-[#060307]">
                  {songFromContext?.song_name}
                </p>
                <p className="mt-2 mb-0 font-urbanist font-medium text-xs leading-[14px] text-center text-[#989CA0]">
                  {songFromContext?.primary_artists}
                </p>
              </div>
            </div>
            <div className="px-5 mt-4 flex items-center ">
              <p className="mb-0  font-urbanist font-semibold text-sm text-[#060307]">
                {formatTime(currentTime)}
              </p>
              <audio
                ref={audioRef}
                src={songFromContext?.song_audio_url}
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
              <div onClick={playPreviousSong}>
                <PreviousIcon width="28px" height="28px" />
              </div>
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
              <div onClick={playNextSong}>
                <NextIcon width="28px" height="28px" />
              </div>
              <RepeatOnceMoreIcon width="24px" height="24px" />
            </div>
          </div>
        )}
        <IonModal
          isOpen={isEqualizerModalOpen}
          onDidDismiss={() => setIsEqualizerModalOpen(false)}
          className="rounded-t-lg mt-[3rem] bg-white"
          style={{ border: "2px solid red" }}
        >
          <div>
            Equalizer modal
            <p
              onClick={() => {
                setIsEqualizerModalOpen(false);
              }}
            >
              close
            </p>
          </div>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default GlobalPlaySong;
