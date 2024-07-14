import React from "react";
import { twMerge } from "tailwind-merge";

interface NextIconProps {
  width?: string;
  height?: string;
  className?: string;
}

const NextIcon: React.FC<NextIconProps> = (props) => {
  const { width, height, className } = props;

  return (
    <>
      <svg
        width={width}
        height={height}
        className={twMerge(className)}
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"   
      >
        <path
          d="M4.38672 8.42331V19.5883C4.38672 21.875 6.8717 23.31 8.85504 22.1666L13.6967 19.3783L18.5384 16.5783C20.5217 15.435 20.5217 12.5766 18.5384 11.4333L13.6967 8.6333L8.85504 5.84499C6.8717 4.70166 4.38672 6.12498 4.38672 8.42331Z"
          fill="#CDCDCD"
        />
        <path
          d="M23.6133 22.085C23.1349 22.085 22.7383 21.6884 22.7383 21.21V6.79004C22.7383 6.31171 23.1349 5.91504 23.6133 5.91504C24.0916 5.91504 24.4883 6.31171 24.4883 6.79004V21.21C24.4883 21.6884 24.1033 22.085 23.6133 22.085Z"
          fill="#060307"
        />
      </svg>
    </>
  );
};

export default NextIcon;