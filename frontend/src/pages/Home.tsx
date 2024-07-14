import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import './Home.css';
import MessageIcon from '../icons/MessageIcon';
import ProfileIcon from '../icons/ProfileIcon';
import PlaylistImg from '../images/playlistImg.png'
import RecentlyPlayedImg from '../images/recentlyPlayedImg.png'
import PlaylistComp from '../components/PlaylistComp';
import DisplayCard from '../components/DisplayCard';
import { IonRouterLink } from '@ionic/react';

 const Home: React.FC = () => {

  return (
    <IonPage>
      <IonHeader>  
        <IonToolbar >
          <IonTitle  >
            <div className='flex items-center justify-between'>
              <p className='text-[#060307] font-urbanist text-lg font-semibold leading-normal'>Good evening</p>
              <div className='flex items-center gap-x-7'>    
                {/* <MessageIcon /> */}
                <IonRouterLink
                   routerLink='/profile'
                >
   
                  <ProfileIcon />
                </IonRouterLink>
              </div>
            </div>  
              
          </IonTitle>    
        </IonToolbar>  
      </IonHeader>
      <IonContent fullscreen>
        <div className='px-5 mt-7'>  
          <div className='flex items-center justify-between'>
            <p className='text-[#060307] font-urbanist text-base font-semibold leading-5'>Playlists</p>
            <p className='text-[#99989A] font-urbanist text-sm font-semibold leading-normal'>Show all</p>
          </div>  

          <div className='mt-4 grid grid-flow-col items-center gap-x-3 w-full overflow-x-scroll scrollbar-hide scroll-smooth'>

              {
                [0, 1, 2, 3, 4]?.map((i) => (

                  <PlaylistComp key={i} imgSrc={PlaylistImg} playNum={i+1} />    
                ))
              }
  
              
            
          </div>  
  
          <div className='mt-7 flex items-center justify-between'>
            <p className='text-[#060307] font-urbanist text-base font-semibold leading-5'>Recently Played</p>
            <p className='text-[#99989A] font-urbanist text-sm font-semibold leading-normal'>Show all</p>
          </div>  

          <div className='mt-4 grid grid-flow-col items-center gap-x-3 w-full overflow-x-auto scrollbar-hide scroll-smooth'>
            {  
              [0, 1, 2, 3, 4]?.map((i) => (
                
                <DisplayCard key={i} imgSrc={RecentlyPlayedImg} albumName="hip-hop mix" albumArtist="travis skott, asap rocky." />
              ))
            }
          </div>

          <div className='mt-7 flex items-center justify-between'>
            <p className='text-[#060307] font-urbanist text-base font-semibold leading-5 capitalize'>new releases for you</p>
            <p className='text-[#99989A] font-urbanist text-sm font-semibold leading-normal'>Show all</p>
          </div>  

          <div className='mt-4 grid grid-flow-col items-center gap-x-3 w-full overflow-x-auto scrollbar-hide scroll-smooth'>
            {  
              [0, 1, 2, 3, 4]?.map((i) => (
                
                <DisplayCard key={i} imgSrc={RecentlyPlayedImg} albumName="hip-hop mix" albumArtist="travis skott, asap rocky." />
              ))
            }
          </div>
          
          <div className='mt-7 flex items-center justify-between'>
            <p className='text-[#060307] font-urbanist text-base font-semibold leading-5 capitalize'>liked songsPlayed</p>
            <p className='text-[#99989A] font-urbanist text-sm font-semibold leading-normal'>Show all</p>
          </div>  

          <div className='mt-4 mb-32 grid grid-flow-col items-center gap-x-3 w-full overflow-x-auto scrollbar-hide scroll-smooth'>
            {  
              [0, 1, 2, 3, 4]?.map((i) => (
                
                <DisplayCard key={i} imgSrc={RecentlyPlayedImg} albumName="hip-hop mix" albumArtist="travis skott, asap rocky." />
              ))
            }
          </div>
  
             
            
        </div>  
      </IonContent>
    </IonPage>
  );
};

export default Home;
