import { IonContent, IonHeader, IonInput, IonItem, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import SearchIcon from '../icons/SearchIcon';
import RecentlyPlayedImg from '../images/recentlyPlayedImg.png'
import { useState } from 'react';
import SearchHistoryContainer from '../components/SearchHistoryContainer';
import CrossIcon from '../icons/CrossIcon';


const Favourite: React.FC = () => {

    const [isInputFocused, setIsInputFocused] = useState(false);

    return (  
        <IonPage>
            <IonHeader>
                <IonToolbar >
                    <IonTitle  >
                        <div className='flex items-center gap-x-3'>
                            <SearchIcon className='' width="24px" height="24px" />
                            <IonInput
                                className={`font-urbanist text-base font-medium leading-[18px] ${isInputFocused ? 'text-[#060307]' : 'text-[#99989A]'}`}
                                placeholder="What do you want to listen to?"
                                onFocus={() => {
                                    setIsInputFocused(true);
                                }}
                                onBlur={() => {
                                    setIsInputFocused(false);
                                }}
                            />
                        </div>
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <div className='px-5 mt-7 mb-7'>

          <div className='flex items-center justify-between'>
  
            <p className='text-[#060307] pt-2 font-urbanist text-base font-semibold leading-5 capitalize'>favorite songs</p>
            <p className='mt-2.5 text-[#7F8489] mb-0 font-urbanist text-xs font-medium leading-normal capitalize'>26 songs</p>
          </div>  
          <div className='mt-4 space-y-2'>  
            {
                [0, 1, 2, 3]?.map((i) => (
                    <div key={i} className='flex items-center justify-between py-[5px] pr-3 pl-[5px] gap-x-3 flex-shrink-0 rounded-[10px] bg-[#EDEDED]'>
                        <div className='inline-flex items-center'>
                            <img className='w-10 h-10 rounded-xl' src={RecentlyPlayedImg} alt="-" />
                            <div className='ml-4'>
                                <p className='text-[#060307] font-urbanist text-sm font-semibold leading-normal capitalize'>hip-hop mix</p>
                                <p className='mt-1 text-[#7F8489] font-urbanist text-[11px] font-medium leading-normal capitalize'>travis skott, asap rocky.</p>
                            </div>
                        </div>  
                          
                        <div>
                            <CrossIcon width='24px' height='24px' className='flex items-center justify-center' />
                        </div>

                    </div>
                ))

            }
            
          </div>





                </div>
            </IonContent>
        </IonPage>
    );
};

export default Favourite;
