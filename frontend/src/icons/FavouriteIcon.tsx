import React from 'react'
import { twMerge } from 'tailwind-merge'

interface FavouriteIconProps {
    width?: string;
    height?: string;
    className?: string;
    clicked?: boolean;
}

const FavouriteIcon: React.FC<FavouriteIconProps> = (props) => {

    const { width, height, className, clicked } = props;
    
    return (  
        <>

        {
          clicked? (
            <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} className={twMerge(className)}  viewBox="0 0 24 24" fill="none">
  <path d="M22 8.68997C22 9.87997 21.81 10.98 21.48 12H2.52C2.19 10.98 2 9.87997 2 8.68997C2 5.59998 4.49 3.09998 7.56 3.09998C9.37 3.09998 10.99 3.97998 12 5.32998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68997Z" fill="url(#paint0_linear_231_1631)"/>
  <path d="M21.48 12C19.9 17 15.03 19.99 12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.97002 19.99 4.10002 17 2.52002 12H21.48Z" fill="#F1AFBA"/>
  <defs>
    <linearGradient id="paint0_linear_231_1631" x1="5.125" y1="4.39789" x2="9.65035" y2="14.8708" gradientUnits="userSpaceOnUse">
      <stop stopColor="#FD4E6B"/>
      <stop offset="1" stopColor="#D4314C"/>
    </linearGradient>  
  </defs>
</svg> 
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} className={twMerge(className)}  viewBox="0 0 24 24" fill="none">
  <path d="M22 8.68997C22 9.87997 21.81 10.98 21.48 12H2.52C2.19 10.98 2 9.87997 2 8.68997C2 5.59998 4.49 3.09998 7.56 3.09998C9.37 3.09998 10.99 3.97998 12 5.32998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68997Z" fill="#060307"/>
  <path d="M21.48 12C19.9 17 15.03 19.99 12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.97002 19.99 4.10002 17 2.52002 12H21.48Z" fill="#CDCDCD"/>
</svg>  
          )
        }
          

 
        </>

    );
};

export default FavouriteIcon;
