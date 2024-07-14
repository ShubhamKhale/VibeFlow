import React from 'react'
import { twMerge } from 'tailwind-merge'

interface CrossIconProps {
    width?: string;
    height?: string;
    className?: string;
}

const CrossIcon: React.FC<CrossIconProps> = (props) => {

    const { width, height, className } = props;
    
    return (    
        <>
            <svg width={width} height={height} className={twMerge(className)}  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2Z" fill="#CDCDCD"/>
            <path d="M13.06 12L15.36 9.7C15.65 9.41 15.65 8.93 15.36 8.64C15.07 8.35 14.59 8.35 14.3 8.64L12 10.94L9.69998 8.64C9.40998 8.35 8.92999 8.35 8.63999 8.64C8.34999 8.93 8.34999 9.41 8.63999 9.7L10.94 12L8.63999 14.3C8.34999 14.59 8.34999 15.07 8.63999 15.36C8.78999 15.51 8.97999 15.58 9.16999 15.58C9.35999 15.58 9.54998 15.51 9.69998 15.36L12 13.06L14.3 15.36C14.45 15.51 14.64 15.58 14.83 15.58C15.02 15.58 15.21 15.51 15.36 15.36C15.65 15.07 15.65 14.59 15.36 14.3L13.06 12Z" fill="#060307"/>
            </svg>

        </>

    );
};

export default CrossIcon;
