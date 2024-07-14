import React from 'react'
import { twMerge } from 'tailwind-merge'

interface HomeIconProps {
    width?: string;
    height?: string;
    className?: string;
    clicked?: boolean;
}

const HomeIcon: React.FC<HomeIconProps> = (props) => {

    const { width, height, className, clicked } = props;
    
    return (  
        <>
          {clicked ? (  
            


<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} className={twMerge(className)} viewBox="0 0 24 24" fill="none">
  <path d="M20.04 6.82L14.28 2.79C12.71 1.69 10.3 1.75 8.78999 2.92L3.77999 6.83C2.77999 7.61 1.98999 9.21 1.98999 10.47V17.37C1.98999 19.92 4.05999 22 6.60999 22H17.39C19.94 22 22.01 19.93 22.01 17.38V10.6C22.01 9.25 21.14 7.59 20.04 6.82Z" fill="url(#paint0_linear_231_2694)" fillOpacity="0.4"/>
  <path d="M12 18.75C11.59 18.75 11.25 18.41 11.25 18V15C11.25 14.59 11.59 14.25 12 14.25C12.41 14.25 12.75 14.59 12.75 15V18C12.75 18.41 12.41 18.75 12 18.75Z" fill="url(#paint1_linear_231_2694)"/>
  <defs>
    <linearGradient id="paint0_linear_231_2694" x1="5.11812" y1="4.9186" x2="19.0744" y2="19.3075" gradientUnits="userSpaceOnUse">
      <stop stopColor="#FD4E6B"/>
      <stop offset="1" stopColor="#D4314C"/>
    </linearGradient>
    <linearGradient id="paint1_linear_231_2694" x1="11.4844" y1="14.9063" x2="13.4141" y2="15.5687" gradientUnits="userSpaceOnUse">
      <stop stopColor="#FD4E6B"/>
      <stop offset="1" stopColor="#D4314C"/>
    </linearGradient>
  </defs>
</svg> 
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} className={twMerge(className)} viewBox="0 0 24 24" fill="none">
                <path d="M20.04 6.82006L14.28 2.79006C12.71 1.69006 10.3 1.75006 8.78999 2.92006L3.77999 6.83006C2.77999 7.61006 1.98999 9.21006 1.98999 10.4701V17.3701C1.98999 19.9201 4.05999 22.0001 6.60999 22.0001H17.39C19.94 22.0001 22.01 19.9301 22.01 17.3801V10.6001C22.01 9.25006 21.14 7.59006 20.04 6.82006Z" fill="#CDCDCD" />
                <path d="M12 18.75C11.59 18.75 11.25 18.41 11.25 18V15C11.25 14.59 11.59 14.25 12 14.25C12.41 14.25 12.75 14.59 12.75 15V18C12.75 18.41 12.41 18.75 12 18.75Z" fill="#060307" />
            </svg>
            
          )}  
        </>

    );
};

export default HomeIcon;
