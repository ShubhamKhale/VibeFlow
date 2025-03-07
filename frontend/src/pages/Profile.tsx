import {
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import RecentlyPlayedImg from "../images/recentlyPlayedImg.png";
import SettingsIcon from "../icons/SettingsIcon";
import EditIcon from "../icons/EditIcon";
import ShareIcon from "../icons/ShareIcon";
import PlaylistComp from "../components/PlaylistComp";
import PlaylistImg from "../images/playlistImg.png";
import LeftArrowIcon from "../icons/LeftArrowIcon";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {

  const navigate = useNavigate();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-x-3">
                <div onClick={() => {navigate("/home")}} >
                  <LeftArrowIcon width="24px" height="24px" />
                </div>
                <p className="mb-0 text-[#060307] font-urbanist text-base font-semibold leading-5">
                  Profile
                </p>
              </div>
              <div onClick={() => {navigate("/settings")}} >
                <SettingsIcon width="24px" height="24px" />
              </div>
            </div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="px-5 mt-7 mb-7 ">
          <div className="inline-flex items-center gap-x-4">
            <div className="flex justify-center items-center gap-2.5 rounded-2xl">
              <div className="w-30 h-30 p-3 bg-[#EDEDED] rounded-2xl ">
                <img
                  className="w-26 h-26 rounded-2xl"
                  src={RecentlyPlayedImg}
                  alt="-"
                />
              </div>
              <div>
                <p className="font-urbanist text-lg text-[#060307]">Suchir</p>
                <div className="mt-1 flex items-center justify-between gap-x-4">
                  <div onClick={() => {navigate("/edit")}}>
                    <div className="flex items-center rounded-md space-x-2.5 px-5 py-1.5 bg-[#EDEDED]">
                      <EditIcon width="18px" height="24px" />
                      <p className="font-urbanist font-semibold text-sm leading-5 text-[#060307]">
                        Edit
                      </p>
                    </div>
                  </div>
                  <div className="inline-flex items-center rounded-md space-x-2.5 px-5 py-1.5 bg-[#EDEDED]">
                    <ShareIcon width="18px" height="24px" />
                    <p className="font-urbanist font-semibold text-sm leading-5 text-[#060307]">
                      Share
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

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
  );
};

export default Profile;
