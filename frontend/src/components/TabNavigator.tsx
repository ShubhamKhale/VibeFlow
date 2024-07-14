import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import HomeIcon from '../icons/HomeIcon';  
import SearchIcon from '../icons/SearchIcon';
import FavouriteIcon from '../icons/FavouriteIcon';
import SavedIcon from '../icons/SavedIcon';
import PlusIcon from '../icons/PlustIcon';
import { IonRouterLink } from '@ionic/react';


const TabNavigator: React.FC = () => {
  
  const location = useLocation();

  const [homeIconClicked, setHomeIconClicked] = useState(false);  
  const [searchIconClicked, setSearchIconClicked] = useState(false);
  const [favouriteIconClicked, setFavouriteIconClicked] = useState(false);
  const [savedIconClicked, setSavedIconClicked] = useState(false);


  useEffect(() => {
    setHomeIconClicked(location.pathname === '/home');
    setSearchIconClicked(location.pathname === '/search');
    setFavouriteIconClicked(location.pathname === '/favourite');
    setSavedIconClicked(location.pathname === '/saved');
  }, [location.pathname]); 

  
  return (        
    <>  
    {location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/signin" ? (
      ""
    ) : (
      <div className='py-5 px-7 w-screen rounded-t-2xl border-2 bg-white shadow-[0px_-4px_20px_0px_rgba(155,154,156,0.20)]'>
            <div className='grid grid-cols-5 justify-items-center items-center gap-x-10'>
                <IonRouterLink 
                  routerLink='/home'
                  className='inline-flex flex-col items-center gap-1.5 cursor-pointer'
                  
                  onClick={() => {
                    setHomeIconClicked(!homeIconClicked);
                    setSearchIconClicked(false);
                    setFavouriteIconClicked(false);
                    setSavedIconClicked(false);  
                  }}
                >
                  <HomeIcon width="24px" height="24px" clicked={homeIconClicked}/>
                  {  
                    homeIconClicked ? (
                      <p className='text-[#9B9A9C] text-center text-[10px] font-medium leading-normal bg-gradient-to-r from-[#FD4E6B] to-[#D4314C] bg-clip-text text-transparent'>Home</p>
                    ) : (
                      <p className='text-[#9B9A9C] text-center text-[10px] font-medium leading-normal'>Home</p>
                    )
                  }
                </IonRouterLink>    
                <IonRouterLink 
                  routerLink='/search'
                  className='inline-flex flex-col items-center gap-1.5 cursor-pointer'
                  onClick={() => {
                    setHomeIconClicked(false);
                    setSearchIconClicked(!searchIconClicked);
                    setFavouriteIconClicked(false);
                    setSavedIconClicked(false);
                  }}
                >
                  <SearchIcon width="24px" height="24px" clicked={searchIconClicked} />
                  {
                    searchIconClicked ? (
                        <p className='text-[#9B9A9C] text-center text-[10px] font-medium leading-normal bg-gradient-to-r from-[#FD4E6B] to-[#D4314C] bg-clip-text text-transparent'>Search</p>
                    ) : (

                      <p className='text-[#9B9A9C] text-center text-[10px] font-medium leading-normal'>Search</p>
                    )
                  }
                </IonRouterLink>
                <IonRouterLink routerLink='/create-playlist' className='p-3 rounded-full bg-gradient-to-b from-[#FD4E6B] to-[#D4314C] cursor-pointer'>
                  <PlusIcon width="24px" height="24px" />
                </IonRouterLink>         
                <IonRouterLink     
                  routerLink='/favourite'
                  className='inline-flex flex-col items-center justify-center gap-1.5 cursor-pointer'
                  onClick={() => {   
                    setHomeIconClicked(false);
                    setSearchIconClicked(false);
                    setFavouriteIconClicked(!favouriteIconClicked);
                    setSavedIconClicked(false);
                  }}     
                >
                  <FavouriteIcon width="24px" height="24px" className='ml-2'  clicked={favouriteIconClicked} />
                  {
                    favouriteIconClicked ? (  

                      <p className='text-[#9B9A9C] text-center text-[10px] font-medium leading-normal bg-gradient-to-r from-[#FD4E6B] to-[#D4314C] bg-clip-text text-transparent'>Favourite</p>
                    ) : (

                      <p className='text-[#9B9A9C] text-center text-[10px] font-medium leading-normal'>Favourite</p>
                    )
                  }     
                </IonRouterLink>
                
                <IonRouterLink   
                  routerLink='/saved'
                  className='inline-flex flex-col items-center gap-1.5 cursor-pointer'
                  onClick={() => {
                    setHomeIconClicked(false);
                    setSearchIconClicked(false);  
                    setFavouriteIconClicked(false);
                    setSavedIconClicked(!savedIconClicked);
                  }}
                >  
                  <SavedIcon width="24px" height="24px" clicked={savedIconClicked} />
                  {
                    savedIconClicked ? (

                      <p className='text-[#9B9A9C] text-center text-[10px] font-medium leading-normal bg-gradient-to-r from-[#FD4E6B] to-[#D4314C] bg-clip-text text-transparent'>Saved</p>
                    ) : (
   
                      <p className='text-[#9B9A9C] text-center text-[10px] font-medium leading-normal'>Saved</p>
                    )
                  }
                </IonRouterLink>  
            </div>    
        </div>
    )}
        
    </>
  );    
};  

export default TabNavigator;
