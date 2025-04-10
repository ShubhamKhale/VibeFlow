import React from 'react'
import { twMerge } from 'tailwind-merge'

interface LeftArrowIconProps {
    width?: string;
    height?: string;
    className?: string;
}

const LeftArrowIcon: React.FC<LeftArrowIconProps> = (props) => {

    const { width, height, className } = props;

    return (
        <>
            <svg width={width} height={height} className={twMerge(className)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.57 5.93L3.5 12L9.57 18.07" stroke="#060307" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20.4999 12H3.66992" stroke="#060307" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>


        </>  

    );
};

export default LeftArrowIcon;
