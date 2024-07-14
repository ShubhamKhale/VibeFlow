import React from 'react'
import { twMerge } from 'tailwind-merge'

interface SearchIconProps {
    width?: string;
    height?: string;
    className?: string;
    clicked?: boolean;
}

const SearchIcon: React.FC<SearchIconProps> = (props) => {

    const { width, height, className, clicked } = props;
    
    return (  
        <>
        {
          clicked ? (
            <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} className={twMerge(className)} viewBox="0 0 24 24" fill="none">
            <path d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z" fill="#F1AFBA"/>
            <path d="M21.3001 22.0001C21.1201 22.0001 20.9401 21.9301 20.8101 21.8001L18.9501 19.9401C18.6801 19.6701 18.6801 19.2301 18.9501 18.9501C19.2201 18.6801 19.6601 18.6801 19.9401 18.9501L21.8001 20.8101C22.0701 21.0801 22.0701 21.5201 21.8001 21.8001C21.6601 21.9301 21.4801 22.0001 21.3001 22.0001Z" fill="url(#paint0_linear_231_861)"/>
            <defs>
              <linearGradient id="paint0_linear_231_861" x1="19.2562" y1="19.2219" x2="21.5261" y2="21.5614" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FD4E6B"/>
                <stop offset="1" stopColor="#D4314C"/>
              </linearGradient>
            </defs>
          </svg> 
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} className={twMerge(className)}  viewBox="0 0 24 24" fill="none">
  <path d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z" fill="#CDCDCD"/>
  <path d="M21.3 22.0001C21.12 22.0001 20.94 21.9301 20.81 21.8001L18.95 19.9401C18.68 19.6701 18.68 19.2301 18.95 18.9501C19.22 18.6801 19.66 18.6801 19.94 18.9501L21.8 20.8101C22.07 21.0801 22.07 21.5201 21.8 21.8001C21.66 21.9301 21.48 22.0001 21.3 22.0001Z" fill="#060307"/>
</svg>  
          )
        }
           
        </>

    );
};

export default SearchIcon;
