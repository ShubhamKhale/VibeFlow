import React from 'react'
import { twMerge } from 'tailwind-merge'

interface PlusIconProps {
    width?: string;
    height?: string;
    className?: string;
}

const PlusIcon: React.FC<PlusIconProps> = (props) => {

    const { width, height, className } = props;
      
    return (  
        <>  
          <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} className={twMerge(className)}  viewBox="0 0 24 24" fill="none">
  <path d="M6 12H18" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M12 18V6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
        </>

    );
};

export default PlusIcon;
