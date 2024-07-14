import { Redirect, Route, Switch } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";

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
import TabNavigator from "./components/TabNavigator";
import Search from "./pages/Search";
import Favourite from "./pages/Favourite";
import SavedSongs from "./pages/SavedSongs";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Languages from "./pages/Languages";
import Edit from "./pages/Edit";
import PlaySong from "./components/PlaySong";
import CreatePlaylist from "./pages/CreatePlaylist";
import Playlist from "./pages/Playlist";
import Login from "./pages/Login";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";

setupIonicReact();

const App: React.FC = () => {  

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Switch>   
            <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />
            <Route path="/home" component={Home} />
            <Route path="/search" component={Search} />
            <Route path="/favourite" component={Favourite} />
            <Route path="/saved" component={SavedSongs} />
            <Route path="/profile" component={Profile} />
            <Route path="/settings" component={Settings} />
            <Route path="/languages" component={Languages} />
            <Route path="/edit" component={Edit} />
            <Route path="/playSong" component={PlaySong} />
            <Route path="/create-playlist" component={CreatePlaylist} />
            <Route path="/playlist" component={Playlist} />
            <Route exact path="/" render={() => <Redirect to="/home" />} />
            <Route path="*" component={PageNotFound} />
          </Switch>
        </IonRouterOutlet>
        <div className="absolute bottom-0">
          <TabNavigator />
        </div>
      </IonReactRouter>  
    </IonApp>
  );
};

export default App;
