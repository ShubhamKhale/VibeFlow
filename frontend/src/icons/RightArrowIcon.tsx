import React from "react";
import { twMerge } from "tailwind-merge";

interface RightArrowIconProps {
  width?: string;
  height?: string;
  className?: string;
}

const RightArrowIcon: React.FC<RightArrowIconProps> = (props) => {
  const { width, height, className } = props;

  return (
    <>  
      <svg
        width={width}
        height={height}
        className={twMerge(className)}
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 9C0 9.62132 0.503679 10.125 1.125 10.125L13.6912 10.125L8.20406 15.6122C7.76448 16.0518 7.76448 16.7645 8.20406 17.2041C8.64365 17.6436 9.35635 17.6436 9.79594 17.2041L17.625 9.375C17.8321 9.16789 17.8321 8.83211 17.625 8.625L9.79594 0.795937C9.35635 0.356352 8.64365 0.356354 8.20406 0.795937C7.76448 1.23552 7.76448 1.94823 8.20406 2.38781L13.6912 7.875L1.125 7.875C0.503679 7.875 0 8.37868 0 9Z"
          fill="white"
        />
      </svg>
    </>
  );
};

export default RightArrowIcon;
