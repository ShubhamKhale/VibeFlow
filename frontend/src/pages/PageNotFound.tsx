// src/pages/NotFound.tsx
import React from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import errorImg from '../icons/404_page_not_found.png'

const PageNotFound: React.FC = () => {
  return (
    <IonPage>   
      <IonContent className='flex items-center justify-center'>
        <img className='mt-20' src={errorImg} alt="404" />
        <h3 className='mt-20 tracking-[0.2rem] text-[#565872] text-center font-semibold capitalize' >OPPS! PAGE NOT FOUND</h3>
      </IonContent>       
    </IonPage>  
  );  
};

export default PageNotFound;
