import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { IonApp, IonModal, setupIonicReact } from "@ionic/react";
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
import { SongProvider } from "./context/SongContext";
import { ModalProvider, useModal } from "./context/ModalContext";
import GlobalPlaySong from "./components/GlobalPlaySong";

/* Ionic CSS */
import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "./theme/variables.css";

setupIonicReact();

const AppContent: React.FC = () => {
  const { isModalOpen, setIsModalOpen } = useModal(); // Use the hook after the provider is established

  return (
    <>
      <Router>
        <Routes>
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
          <Route path="/trending-playlist/:id" element={<TrendingSongs />} />
          <Route path="/create-playlist" element={<CreatePlaylist />} />
          <Route path="/playlist" element={<Playlist />} />
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <div className="absolute bottom-0">
          <TabNavigator />
        </div>
        <IonModal isOpen={isModalOpen} onDidDismiss={() => setIsModalOpen(false)}>
          <GlobalPlaySong />
        </IonModal>
      </Router>
    </>
  );
};

const App: React.FC = () => {
  return (
    <IonApp>
      <ModalProvider>
        <SongProvider>
          <AppContent /> {/* Render AppContent after providers are set up */}
        </SongProvider>
      </ModalProvider>
    </IonApp>
  );
};

export default App;
