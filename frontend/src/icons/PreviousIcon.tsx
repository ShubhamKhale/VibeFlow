import React from "react";
import { twMerge } from "tailwind-merge";

interface PreviousIconProps {
  width?: string;
  height?: string;
  className?: string;
}

const PreviousIcon: React.FC<PreviousIconProps> = (props) => {
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
          d="M23.6133 8.42331V19.5883C23.6133 21.875 21.1283 23.31 19.145 22.1666L14.3033 19.3783L9.46162 16.5783C7.47829 15.435 7.47829 12.5766 9.46162 11.4333L14.3033 8.6333L19.145 5.84499C21.1283 4.70166 23.6133 6.12498 23.6133 8.42331Z"
          fill="#CDCDCD"
        />
        <path
          d="M4.38672 22.085C3.90839 22.085 3.51172 21.6884 3.51172 21.21V6.79004C3.51172 6.31171 3.90839 5.91504 4.38672 5.91504C4.86505 5.91504 5.26172 6.31171 5.26172 6.79004V21.21C5.26172 21.6884 4.86505 22.085 4.38672 22.085Z"
          fill="#060307"
        />
      </svg>
    </>
  );
};

export default PreviousIcon;