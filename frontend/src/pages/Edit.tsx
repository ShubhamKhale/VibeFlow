import { IonContent, IonHeader, IonPage, IonRouterLink, IonTitle, IonToolbar } from "@ionic/react";
import LeftArrowIcon from "../icons/LeftArrowIcon";
import RecentlyPlayedImg from '../images/recentlyPlayedImg.png'
import LanguageIcon from "../icons/LanguageIcon";
import VersionIcon from "../icons/VersionIcon";

const Edit: React.FC = () => {

    return (
        <IonPage>
            <IonHeader>
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
            </IonHeader>
            <IonContent fullscreen>
                <div className='px-5 mt-7 mb-7 '>

                    
                    <div className="mt-[50%] flex flex-col items-center justify-center">
                        <div className="rounded-2xl p-4 bg-[#EDEDED]">
                            <img className="rounded-2xl w-[100px] h-[100px] object-cover" src={RecentlyPlayedImg} alt="-" />

                        </div>
                        <p className="mb-0 mt-2 font-urbanist font-medium text-sm text-center text-[#060307]">Change photo</p>
                        <p className="mb-0 mt-10 font-urbanist font-semibold text-2xl text-center">Suchir</p>
                        <hr className="mt-2 text-[#000] w-full" />
                        <p className="mb-0 mt-2 mx-12 font-urbanist font-medium text-[10px] text-center text-[#988D91]">This could be your first name or a nickname. It’s how you’ll appear on music app</p>
                    </div>     

                </div>
            </IonContent>
        </IonPage>
    )
}

export default Edit;