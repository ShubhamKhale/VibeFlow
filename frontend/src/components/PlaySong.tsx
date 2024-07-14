import { IonButton, IonContent, IonHeader, IonPage, IonRange, IonRouterLink, IonTitle, IonToolbar } from '@ionic/react';
import LeftArrowIcon from '../icons/LeftArrowIcon';
import RecentlyPlayedImg from '../images/recentlyPlayedImg.png';
import PlaySongBgImg from '../images/playSongBgImg.png';
import LanguageIcon from '../icons/LanguageIcon';
import VersionIcon from '../icons/VersionIcon';
import MenuIcon from '../icons/MenuIcon';
import SoundIcon from '../icons/SoundIcon';
import HeartIcon from '../icons/HeartIcon';
import CommentIcon from '../icons/CommentIcon';
import ShareIcon from '../icons/ShareIcon'
import './PlaySong.css'
import ShuffleIcon from '../icons/ShuffleIcon';
import PreviousIcon from '../icons/PreviousIcon';
import PauseIcon from '../icons/PauseIcon';
import NextIcon from '../icons/NextIcon';
import RepeatOnceMoreIcon from '../icons/RepeatOnceMoreIcon';

const PlaySong: React.FC = () => {

    return (
        <IonPage >
            <IonHeader >   
                <IonToolbar >
                    <IonTitle  >
                        <div className='flex items-center justify-between'>
                            <IonRouterLink routerLink='/profile' className=''>  
                                    <LeftArrowIcon width='24px' height='24px' />
                            </IonRouterLink>    

                            <div className='space-y-1'>
                                <p className='mb-0 font-urbanist text-xs font-medium text-center'>Playing From Search</p>
                                <p className='mb-0 font-urbanist text-sm font-semibold text-center'>Trending New</p>
                            </div>

                            <MenuIcon width='24px' height='24px' />
                        </div>
                    </IonTitle>  
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className='overflow-y-scroll bg-gray-500'>
                <div className=' mt-7 mb-7 '>    

                    <img className='w-full h-[374px] object-contain'  src={PlaySongBgImg} alt='-' />
                    <div className='px-5 mt-2 ' >
                        <div className='mt-8 flex items-center justify-between' >
                            <SoundIcon width='24px' height='24px' />
                            <HeartIcon width='24px' height='24px' />
                            <CommentIcon width='24px' height='24px' />
                            <ShareIcon width='24px' height='24px' />
                            <div className='rounded-lg   py-1.5 px-4 bg-[#EDEDED]'>
                                <p className='mb-0 font-urbanist font-semibold text-sm leading-5 text-center text-[#060307]'>Lyrics</p>
                            </div>  
                        </div>  
                        
                        
                    </div>

                    <div className='px-5 mt-8'>
                        <div className=''>
                            <p className='mb-0 font-urbanist font-semibold text-lg leading-[18px] text-center text-[#060307]'>Miss You</p>
                            <p className='mb-0 font-urbanist font-medium text-xs leading-[14px] text-center text-[#989CA0]'>oliver tree, robin schulz</p>
                        </div>  
                    </div>
                    <div className='px-5 mt-5 flex items-center ' >   
                        <p className='mb-0  font-urbanist font-semibold text-sm text-[#060307]'>01:46</p>
                        <IonRange className='w-[240px] mx-6'  ></IonRange>
                        <p className='mb-0 text-right  font-urbanist font-semibold text-sm text-[#060307]'>04:04</p>
                    </div>

                    <div className='px-5 mt-3 flex items-center justify-between'>
                        <ShuffleIcon width='24px' height='24px' />
                        <PreviousIcon width='28px' height='28px' />
                        <div className='p-4 flex items-center justify-center  rounded-full bg-gradient-to-b from-[#FD4E6B] to-[#D4314C] cursor-pointer'>
                            <PauseIcon width="32px" height="32px" />
                        </div>    
                        <NextIcon width='28px' height='28px' />    
                        <RepeatOnceMoreIcon width='24px' height='24px'  />
                    </div>
                    <div className='mx-5 px-5 py-3 mt-8 bg-[#FFFFFF] border-2 rounded-2xl'>
                        <div className='flex items-center justify-between'>
                            <div className='inline-flex items-center justify-between gap-x-3' >
                                <img className='w-[38px] h-[38px] rounded-full object-cover' src={RecentlyPlayedImg} alt="-" />
                                <div>
                                    <p className='mb-0 capitalize font-urbanist font-semibold text-base text-[#060307]' >miss you</p>
                                    <p className='mb-0 font-urbanist font-medium text-xs leading-[14px] text-[#989CA0]'>Post by</p>
                                </div>   
                            </div>
                            <div  className='rounded-lg px-4 py-1.5 gap-2 bg-[#EDEDED] hover:opacity-70 cursor-pointer'>
                                <p className='mb-0 text-[#060307] leading-5 text-xs font-urbanist font-semibold'>Follow</p>
                            </div>     
                        </div>   
                    </div>
                    <div className='mx-5 mb-28 p-5 mt-8 rounded-t-2xl border-2'>
                        <p className='mb-0 font-urbanist font-semibold text-base leading-5 text-[#060307]'>About The Artist</p>
                        <img className='mt-5 rounded-2xl w-full h-[220px] object-cover' src={RecentlyPlayedImg} alt="-" />
                        <div className=' mt-5 flex items-center justify-between'>
                        <div>
                            <p className='mb-0 font-urbanist font-semibold text-base leading-5 text-[#060307]'>Oliver Tree</p>
                            <p className='mb-0 font-urbanist font-medium text-xs leading-[14px] text-[#989CA0]'>24,419,528 monthly listeners</p>
                        </div>
                        <div  className='rounded-lg px-4 py-1.5 gap-2 bg-[#EDEDED] hover:opacity-70 cursor-pointer'>
                            <p className='mb-0 text-[#060307] leading-5 text-xs font-urbanist font-semibold'>Follow</p>
                        </div>        
                    </div>
                        <p className='mt-5 mb-0 font-urbanist font-medium text-sm leading-4 text-[#989CA0]'>An internet based vocalist, producer, writer, director and performance artist... <span className='text-[#060307]'>see more</span></p>
                    </div> 
                    
                </div>
            </IonContent>
        </IonPage>
    )
}

export default PlaySong;