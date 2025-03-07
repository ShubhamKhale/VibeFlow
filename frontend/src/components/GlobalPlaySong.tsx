import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonModal,
  IonPage,
  IonRange,
  IonTitle,
  IonToggle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useRef } from "react";
import LeftArrowIcon from "../icons/LeftArrowIcon";
import SoundMutedIcon from "../icons/SoundMutedIcon";
import SoundIcon from "../icons/SoundIcon";
import HeartIcon from "../icons/HeartIcon";
import ShareIcon from "../icons/ShareIcon";
import PreviousIcon from "../icons/PreviousIcon";
import PauseIcon from "../icons/PauseIcon";
import PlayIcon from "../icons/PlayIcon";
import NextIcon from "../icons/NextIcon";
import DefaultMusicIcon from "../images/default-music-icon.jpg";
import { useState } from "react";
import { useSongContext } from "../context/SongContext";
import { useNavigate } from "react-router-dom";
import ShuffleIcon from "../icons/ShuffleIcon";
import RepeatOnceMoreIcon from "../icons/RepeatOnceMoreIcon";
import EqualizerIcon from "../icons/Equalizer";
import PlaylistIcon from "../icons/PlaylistIcon";
import FavouriteIcon from "../icons/FavouriteIcon";
import SavedIcon from "../icons/SavedIcon";
import "./Equalizer.css";
import MusicNoteIcon from "../icons/MusicNote";
import CrossIcon from "../icons/CrossIcon";
import RedHeartIcon from "../icons/RedHeartIcon";
import DefaultSavedSongIcon from "../icons/DefaultSavedSong";
import SavedSongIcon from "../icons/SavedSongIcon";

const GlobalPlaySong: React.FC = () => {
  const {
    currentSong,
    setCurrentSong,
    songs,
    closeModal,
    playNextSong,
    playPreviousSong,
    isPlaying,
    isMuted,
    togglePlayPause,
    toggleMute,
    toggleShuffle,
    toggleRepeat,
    currentTime,
    duration,
    handleSeek,
    toggleFavouriteSong,
    isFavourite,
    isSaved,
    toggleSavedSong,
  } = useSongContext();
  const [showLyrics, setShowLyrics] = useState(false);
  const [showSongMenu, setShowSongMenu] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const [gainValues, setGainValues] = useState([
    { bandIndex: 0, value: 0, frequency: 60 }, // Bass
    { bandIndex: 1, value: 0, frequency: 400 }, // Low-Mid
    { bandIndex: 2, value: 0, frequency: 1000 }, // Mid
    { bandIndex: 3, value: 0, frequency: 3000 }, // High-Mid
    { bandIndex: 4, value: 0, frequency: 12000 }, // Treble
  ]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            <div className="flex items-center justify-between">
              <button aria-label="Close player" onClick={closeModal}>
                <LeftArrowIcon width="24px" height="24px" />
              </button>
            </div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="bg-gray-500">
        {currentSong && (
          <div>
            {showLyrics === true ? (
              <div className="w-full h-[22rem] p-6 overflow-auto text-white bg-gradient-to-b from-black via-gray-800 to-black">
                {currentSong?.lyrics
                  ?.replaceAll(",", "\n")
                  ?.replaceAll(/<br>/g, "\n") || "No lyrics available."}
              </div>
            ) : (
              <img
                className="w-full h-[20rem] object-cover"
                src={
                  currentSong?.song_image_url?.replace("150x150", "500x500") ||
                  DefaultMusicIcon
                }
                alt={currentSong?.song_name}
                onClick={() => {
                  setIsModalOpen(false);
                }}
              />
            )}

            {showSongMenu === true ? (
              <>
                <div className="mt-2 px-5 flex items-center justify-between">
                  <p className="font-urbanist font-semibold text-[#060307] text-lg">
                    Song Menu
                  </p>
                  <button
                    onClick={() => {
                      setShowSongMenu(false);
                    }}
                  >
                    <CrossIcon width="30px" height="30px" />
                  </button>
                </div>

                <div className="mt-2 px-5 grid grid-cols-2 gap-4">
                  <button
                    className="p-2 w-full inline-flex flex-col items-center justify-center text-center gap-x-5 bg-[#EDEDED] rounded-2xl"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <EqualizerIcon width="30px" height="30px" />
                    <p className="font-urbanist font-semibold text-[#060307] text-lg">
                      Equalizer
                    </p>
                  </button>
                  <button className="p-2 w-full inline-flex flex-col items-center justify-center text-center gap-x-5 bg-[#EDEDED] rounded-2xl">
                    <PlaylistIcon width="30px" height="30px" />
                    <p className="font-urbanist font-semibold text-[#060307] text-lg">
                      Add to Playlist
                    </p>
                  </button>
                  <button className="p-2 w-full inline-flex flex-col items-center justify-center text-center gap-x-5 bg-[#EDEDED] rounded-2xl">
                    <FavouriteIcon width="30px" height="30px" />
                    <p className="font-urbanist font-semibold text-[#060307] text-lg">
                      Add to Favorites
                    </p>
                  </button>
                  <button className="p-2 w-full inline-flex flex-col items-center justify-center text-center gap-x-5 bg-[#EDEDED] rounded-2xl">
                    <SavedIcon width="30px" height="30px" />
                    <p className="font-urbanist font-semibold text-[#060307] text-lg">
                      Add to Saved Songs
                    </p>
                  </button>
                </div>
              </>
            ) : (
              <div className="p-5">
                <div className="flex items-center justify-center gap-6">
                  {/* <button onClick={toggleMute} aria-label="Toggle mute"> */}
                  <button onClick={toggleMute} aria-label="Toggle mute">
                    {isMuted ? (
                      <SoundMutedIcon width="24px" height="24px" />
                    ) : (
                      <SoundIcon width="24px" height="24px" />
                    )}
                  </button>
                  <button
                    onClick={() => {
                      toggleFavouriteSong(currentSong);
                    }}
                    aria-label="Add favourites"
                  >
                    {!isFavourite ? (
                      <HeartIcon width="24px" height="24px" fill="none" />
                    ) : (
                      <RedHeartIcon width="24px" height="24px" fill="none" />
                    )}
                  </button>
                  <button
                    onClick={() => {
                      toggleSavedSong(currentSong);
                    }}
                    aria-label="add song for offline access"
                  >
                    {!isSaved ? (
                      <DefaultSavedSongIcon width="24px" height="24px" />
                    ) : (
                      <SavedSongIcon width="24px" height="24px" />
                    )}
                  </button>
                  {/* <button
                    onClick={() => {
                      setShowSongMenu(!showSongMenu);
                    }}
                  >
                    <MusicNoteIcon width="24px" height="24px" />
                  </button> */}
                  {currentSong?.has_lyrics === "true" && (
                    <button
                      onClick={() => setShowLyrics(!showLyrics)}
                      aria-label="Toggle lyrics"
                      className="bg-gray-200 px-4 py-2 rounded"
                    >
                      {showLyrics ? "Song" : "Lyrics"}
                    </button>
                  )}
                </div>
                <div className="text-center mt-4">
                  <p className="text-lg font-bold">{currentSong?.song_name}</p>
                  <p className="text-sm text-gray-500">
                    {currentSong?.primary_artists}
                  </p>
                </div>
                <div className="flex items-center mt-2">
                  <p>{formatTime(currentTime)}</p>
                  <IonRange
                    min={0}
                    max={duration}
                    value={currentTime}
                    onIonChange={(e) => handleSeek(Number(e.detail.value))}
                    className="mx-4 flex-1"
                  />
                  <p>{formatTime(duration)}</p>
                </div>
                <div className="flex items-center justify-center gap-8">
                  <button
                    onClick={toggleShuffle}
                    aria-label="shuffle song list"
                  >
                    <ShuffleIcon width="28px" height="28px" />
                  </button>
                  <button
                    onClick={playPreviousSong}
                    aria-label="play previous song"
                  >
                    <PreviousIcon width="28px" height="28px" />
                  </button>
                  <button
                    onClick={togglePlayPause}
                    className="p-4 bg-red-600 rounded-full"
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? (
                      <PauseIcon width="32px" height="32px" />
                    ) : (
                      <PlayIcon width="32px" height="32px" />
                    )}
                  </button>
                  <button onClick={playNextSong} aria-label="play next song">
                    <NextIcon width="28px" height="28px" />
                  </button>
                  <button onClick={toggleRepeat} aria-label="repeat song list">
                    <RepeatOnceMoreIcon width="28px" height="28px" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        <IonModal
          isOpen={isModalOpen}
          className={`mt-28 rounded-t-3xl border-t-2 border-t-[#FFFFFF]`}
          backdropDismiss={true} // Enable dismissing when clicking outside the modal
          onDidDismiss={() => setIsModalOpen(false)} // Ensure modal state is reset
        >
          <div className="h-[80vh] p-6 bg-white rounded-t-2xl">
            <div className="flex items-center justify-between">
              <p className="mb-0 font-urbanist font-semibold text-[#060307] text-base">
                Equalizer
              </p>
              <IonToggle color="dark" />
            </div>

            <div className="mt-2">
              {gainValues.map((band, i) => (
                <div key={i} className="flex items-center gap-x-3">
                  <p className="mt-2 text-[#989CA0] font-urbanist text-xs font-medium">
                    {band.frequency}Hz
                  </p>
                  <IonRange
                    min={-10}
                    max={10}
                    step={0.1}
                    value={band.value}
                    className="ml-2.5 relative top-1"
                  />
                </div>
              ))}

              {/* <div className="flex items-center gap-x-3">
                <p className="mt-2 text-[#989CA0] font-urbanist text-xs font-medium">
                  150Hz
                </p>
                <IonRange className="ml-1.5 relative top-1" />
              </div>
              <div className="flex items-center gap-x-3">
                <p className="mt-2 text-[#989CA0] font-urbanist text-xs font-medium">
                  400Hz
                </p>
                <IonRange className="ml-1 relative top-1" />
              </div>
              <div className="flex items-center gap-x-3">
                <p className="mt-2 text-[#989CA0] font-urbanist text-xs font-medium">
                  1KHz
                </p>
                <IonRange className="ml-3 relative top-1" />
              </div>
              <div className="flex items-center gap-x-3">
                <p className="mt-2 text-[#989CA0] font-urbanist text-xs font-medium">
                  2.4KHz
                </p>
                <IonRange className="relative top-1" />
              </div>
              <div className="flex items-center gap-x-3">
                <p className="mt-2 text-[#989CA0] font-urbanist text-xs font-medium">
                  15KHz
                </p>
                <IonRange className="ml-1 relative top-1" />
              </div> */}
            </div>

            <p className="mt-2 text-[#989CA0] font-urbanist font-medium text-base">
              Presets
            </p>
            <hr className="bg-[#D9D9D9] mt-2" />
            <div className="mt-2 grid grid-cols-2 gap-2">
              <button className="p-1 rounded-lg text-center text-[#060307] bg-[#EDEDED] text-base font-urbanist font-semibold">
                Acoustic
              </button>
              <button className="p-1 rounded-lg text-center text-[#060307] bg-[#EDEDED] text-base font-urbanist font-semibold">
                Bass Booster
              </button>
              <button className="p-1 rounded-lg text-center text-[#060307] bg-[#EDEDED] text-base font-urbanist font-semibold">
                Bass Reducer
              </button>
              <button className="p-1 rounded-lg text-center text-[#060307] bg-[#EDEDED] text-base font-urbanist font-semibold">
                Classical
              </button>
              <button className="p-1 rounded-lg text-center text-[#060307] bg-[#EDEDED] text-base font-urbanist font-semibold">
                Dance
              </button>
              <button className="p-1 rounded-lg text-center text-[#060307] bg-[#EDEDED] text-base font-urbanist font-semibold">
                Deep
              </button>
              <button className="p-1 rounded-lg text-center text-[#060307] bg-[#EDEDED] text-base font-urbanist font-semibold">
                Electronic
              </button>
              <button className="p-1 rounded-lg text-center text-[#060307] bg-[#EDEDED] text-base font-urbanist font-semibold">
                Flat
              </button>
              <button className="p-1 rounded-lg text-center text-[#060307] bg-[#EDEDED] text-base font-urbanist font-semibold">
                Hiphop
              </button>
            </div>
          </div>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default GlobalPlaySong;
