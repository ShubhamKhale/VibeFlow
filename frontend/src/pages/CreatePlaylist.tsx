import {
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonPage,
  IonRouterLink,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import LeftArrowIcon from "../icons/LeftArrowIcon";
import RecentlyPlayedImg from "../images/recentlyPlayedImg.png";
import LanguageIcon from "../icons/LanguageIcon";
import VersionIcon from "../icons/VersionIcon";
import createPlaylistImg from "../images/create-playlist-img.png";

const CreatePlaylist: React.FC = () => {
  return (
    <IonPage>
      {/* <IonHeader>
                <IonToolbar >
                    <IonTitle  >
                        <div className='flex items-center justify-between'>
                            <IonRouterLink routerLink='/profile' className=''>  
                                    <div className="flex items-center gap-x-3">
                                        <LeftArrowIcon width='24px' height='24px' />
                                        <p className='mb-0 text-[#060307] font-urbanist text-base font-semibold leading-5'>Edit</p>
                                    </div>
                            </IonRouterLink>    

                            <p className='mb-0 text-[#060307] font-urbanist text-sm font-semibold leading-5'>Save</p>

                        </div>
                    </IonTitle>
                </IonToolbar>
            </IonHeader> */}
      <IonContent fullscreen>
        <div className="px-5 mt-7 mb-7 ">
          <img
            className="object-cover cursor-pointer"
            src={createPlaylistImg}
            alt=""
          />
          <div className="mt-5">
            <p className="mb-0 font-urbanist font-semibold text-center text-lg text-[#060307]">
              Create play list
            </p>
              <IonInput className='mt-5 font-urbanist font-semibold text-2xl text-center text-[#989A9C]' placeholder='Give your playlist a name'></IonInput>
          </div>
          <div className='mt-5 flex items-center justify-center gap-x-5'>
            <div className='rounded-lg px-5 py-2.5 bg-[#EDEDED] cursor-pointer hover:opacity-80'>
                <p className='mb-0 text-[#060307] font-urbanist text-sm leading-5 text-center'>Cancel</p>
            </div>     
            <IonRouterLink routerLink='/playlist' className='rounded-lg px-5 py-2.5 bg-[#FD4E6B] cursor-pointer hover:opacity-80'>
                <p className='mb-0 text-white font-urbanist text-sm leading-5 text-center'>Create</p>
            </IonRouterLink>   

          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CreatePlaylist;
