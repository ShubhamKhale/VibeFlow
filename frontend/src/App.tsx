import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { IonApp, setupIonicReact } from '@ionic/react';
import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Search from './pages/Search';
import Favourite from './pages/Favourite';
import SavedSongs from './pages/SavedSongs';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Languages from './pages/Languages';
import Edit from './pages/Edit';
import PlaySong from './components/PlaySong';
import CreatePlaylist from './pages/CreatePlaylist';
import Playlist from './pages/Playlist';
import TabNavigator from './components/TabNavigator';

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

setupIonicReact();

const App: React.FC = () => {  
  return (
    <IonApp>
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
          {/* <Route path="/playSong" element={<PlaySong />} /> */}
          <Route path="/create-playlist" element={<CreatePlaylist />} />
          <Route path="/playlist" element={<Playlist />} />
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <div className="absolute bottom-0">    
          <TabNavigator />
        </div>
      </Router>
    </IonApp>
  );
};

export default App;
