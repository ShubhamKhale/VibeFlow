import { IonContent, IonHeader, IonPage, IonRouterLink, IonTitle, IonToolbar } from "@ionic/react";
import LeftArrowIcon from "../icons/LeftArrowIcon";
import LanguageIcon from "../icons/LanguageIcon";
import VersionIcon from "../icons/VersionIcon";

const Settings: React.FC = () => {

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar >
                    <IonTitle  >
                        <div className='flex items-center justify-between'>
                            <div className='inline-flex items-center gap-x-3'>
                                <IonRouterLink
                                    routerLink='/profile'
                                >
  
                                    <LeftArrowIcon width='24px' height='24px' />
                                </IonRouterLink>
                                <p className='mb-0 text-[#060307] font-urbanist text-base font-semibold leading-5'>Settings</p>
                            </div>

                            <p className='mb-0 text-[#060307] font-urbanist text-sm font-semibold leading-5'>Log out</p>

                        </div>
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <div className='px-5 mt-7 mb-7 '>

                    <IonRouterLink routerLink='/languages' className='pb-3 border-b-2 border-b-[#EDEDED]'>
                        <p className='font-urbanist font-medium text-sm leading-5 text-[#7F8489]'>Languages</p>
                        <div className='mt-2 flex items-center gap-x-5'>
                            <LanguageIcon width='24px' height='24px' />
                            <div className=''>
                                <p className='mb-0 font-urbanist font-semibold text-sm leading-5 text-[#060307]'>Languages for music</p>
                                <p className='mb-0 font-urbanist font-medium text-[11px] text-[#7F8489]'>choose your preferred languages for music.</p>
                            </div>
                        </div>
                    </IonRouterLink>

                    <div className='py-3 border-b-2 border-b-[#EDEDED]'>  
                        <p className='font-urbanist font-medium text-sm leading-5 text-[#7F8489]'>About</p>
                        <div className='mt-2 flex items-center gap-x-3'>
                            <VersionIcon width='32px' height='32px' />
                            <div className=''>
                                <p className='mb-0 font-urbanist font-semibold text-sm leading-5 text-[#060307]'>Version</p>
                                <p className='mb-0 font-urbanist font-medium text-[11px] text-[#7F8489]'>8.8.54.481</p>
                            </div>  
                        </div>
                    </div>



                </div>
            </IonContent>
        </IonPage>
    )
}

export default Settings;