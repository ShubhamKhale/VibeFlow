import React, { useRef, useState, useEffect } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { 
  IonApp, IonContent, IonPage, setupIonicReact, IonRouterOutlet 
} from "@ionic/react";
import { motion, AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Search from "./pages/Search";
import Favourite from "./pages/Favourite";
import SavedSongs from "./pages/SavedSongs";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Languages from "./pages/Languages";
import Edit from "./pages/Edit";
import CreatePlaylist from "./pages/CreatePlaylist";
import Playlist from "./pages/Playlist";
import TabNavigator from "./components/TabNavigator";
import TrendingSongs from "./pages/TrendingSongs";
import GlobalPlaySong from "./components/GlobalPlaySong";
import { SongProvider } from "./context/SongContext";

import "@ionic/react/css/core.css";
import "./theme/variables.css";

setupIonicReact();

export type Song = {
  album_id: string,
  album_url: string,
  encrypted_media_url: string,
  has_lyrics: string,
  lyrics: string,
  primary_artists: string,
  primary_artists_id: string,
  song_audio_preview: string,
  song_audio_url: string,
  song_id: string,
  song_image_url: string,
  song_name: string,
  vcode: string 
};

const App: React.FC = () => {
  const location = useLocation();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [hideTab, setHideTab] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleScroll = (event: CustomEvent) => {
    const scrollTop = event.detail.scrollTop;

    if (scrollTop > lastScrollY) {
      setHideTab(true); // Scrolling Down → Hide Tab Bar
    } else {
      setHideTab(false); // Scrolling Up → Show Tab Bar
    }

    setLastScrollY(scrollTop);

    // Restore tab after 2 sec if no scroll
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => setHideTab(false), 2000);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const slideVariants = {
    initial: { y: "100%", opacity: 0 },
    animate: { y: "0%", opacity: 1, transition: { duration: 0.3, ease: "easeInOut" } },
    exit: { y: "100%", opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } },
  };
  
  return (
    <IonApp>
      <audio crossOrigin="anonymous" ref={audioRef} />
      <SongProvider audioRef={audioRef}>
        <IonPage>
          <IonContent fullscreen onIonScroll={handleScroll} scrollEvents={true}>
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Routes location={location} key={location.pathname}>
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/favourite" element={<Favourite />} />
                  <Route path="/saved" element={<SavedSongs />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/languages" element={<Languages />} />
                  <Route path="/edit" element={<Edit />} />
                  <Route path="/song-player" element={<GlobalPlaySong />} />
                  <Route path="/trending-playlist/:id" element={<TrendingSongs />} />
                  <Route path="/create-playlist" element={<CreatePlaylist />} />
                  <Route path="/playlist" element={<Playlist />} />
                  <Route path="/" element={<Navigate to="/home" />} />
                  <Route path="*" element={<PageNotFound />} />
                </Routes>
              </motion.div>
            </AnimatePresence>
          </IonContent>

          {/* Bottom Tab Navigator */}
          <div
            className={`fixed bottom-0 w-full transition-transform duration-500 ${
              hideTab ? "translate-y-full" : "translate-y-0"
            }`}
          >
            <TabNavigator />
          </div>
        </IonPage>
      </SongProvider>
    </IonApp>
  );
};

export default App;
