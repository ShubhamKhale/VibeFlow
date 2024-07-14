import { IonContent, IonHeader, IonInput, IonPage, IonRouterLink, IonTitle, IonToolbar } from "@ionic/react";
import LeftArrowIcon from "../icons/LeftArrowIcon";
import RecentlyPlayedImg from '../images/recentlyPlayedImg.png'
import LanguageIcon from "../icons/LanguageIcon";
import VersionIcon from "../icons/VersionIcon";
import PlaylistImg from "../images/playlistImg.png";
import SearchIcon from "../icons/SearchIcon";
import PlaylistComp from "../components/PlaylistComp";
import ShareIcon from "../icons/ShareIcon";
import EditIcon from "../icons/EditIcon";

const Playlist: React.FC = () => {

    return (
        <IonPage>
            <IonHeader>  
        <IonToolbar >
          <IonTitle  >
          <div className='flex items-center gap-x-3'>
              <SearchIcon className='' width="24px" height="24px" />
              <IonInput
        className={`font-urbanist text-base font-medium leading-[18px]  text-[#060307]`}
        placeholder="What do you want to listen to?"
        
      />     
            </div>  
          </IonTitle>      
        </IonToolbar>    
      </IonHeader>
      <IonContent fullscreen>
        <div className="px-5 mt-7 mb-7 ">
         

          <div className="mt-5 flex items-center justify-between">
            <p className="text-[#060307] pt-2 font-urbanist text-base font-semibold leading-5 capitalize">
              Playlists
            </p>
            <p className="mt-2.5 text-[#7F8489] mb-0 font-urbanist text-xs font-medium leading-normal capitalize">
              6 lists
            </p>
          </div>

          <div className="mt-4 mb-44 grid grid-flow-row space-y-2 items-center gap-x-3 w-full overflow-y-scroll  scroll-smooth">
            {[0, 1, 2, 3, 4]?.map((i) => (
              <div>
                <PlaylistComp key={i} imgSrc={PlaylistImg} playNum={i + 1} />
              </div>
            ))}
          </div>
        </div>  
      </IonContent>
        </IonPage>
    )
}  

export default Playlist;