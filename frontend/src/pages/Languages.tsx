import { IonContent, IonItem, IonHeader, IonPage, IonRouterLink, IonTitle, IonToggle, IonToolbar } from "@ionic/react";
import LeftArrowIcon from "../icons/LeftArrowIcon";
import LanguageIcon from "../icons/LanguageIcon";
import VersionIcon from "../icons/VersionIcon";
import { useState } from "react";

const Languages: React.FC = () => {

    const languages = ['Bengali', 'Gujarati', 'Hindi', 'International', 'Kannada', 'Malayalam', 'Marathi', 'Punjabi', 'Tamil', 'Telugu'];
    const [isChecked, setIsChecked] = useState<boolean>(false);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar >
                    <IonTitle  >
                        <div className='flex items-center justify-between'>
                            <div className='inline-flex items-center gap-x-3'>
                                <IonRouterLink
                                    routerLink='/settings'
                                >

                                    <LeftArrowIcon width='24px' height='24px' />
                                </IonRouterLink>
                                <p className='mb-0 text-[#060307] font-urbanist text-base font-semibold leading-5'>Languages</p>
                            </div>


                        </div>
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <div className='px-5 mt-7 mb-7 '>

                    <p className='font-urbanist font-medium text-sm leading-5 text-[#7F8489]'>what are your preferred languages for music?</p>

                    <div className='mt-3 p-4 space-y-5 '>
                        {
                            languages?.map((lang, i) => (      
                                <div key={i} className='inline-flex items-center justify-between w-full pb-3 border-b-black border-b-[1px]'>
                                    <p>{lang}</p>
  
   
                                    <IonToggle  
                                        key={i}      
                                        color={"success"}
                                        onIonChange={(e) => setIsChecked(e.detail.checked)}
                                        className='bg-[#000] w-fit rounded-full'
                                    ></IonToggle>
                                </div>
   
                            ))
                        }   
                    </div>



                </div>
            </IonContent>
        </IonPage>
    )
}

export default Languages;