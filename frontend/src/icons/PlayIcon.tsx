import React from "react";
import { twMerge } from "tailwind-merge";

interface PlayIconProps {
  width?: string;
  height?: string;
  className?: string;
}

const PlayIcon: React.FC<PlayIconProps> = (props) => {
    const { width, height, className } = props;

  return (
    <>
      <svg
        width={width}
        height={height}
        className={twMerge(className)}     
        viewBox="0 0 68 68"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* <circle cx="34" cy="34" r="34" fill="url(#paint0_linear_48_19471)" /> */}
        <path d="M18 10L60 34L18 58V10Z" fill="white" />
        <defs>
          <linearGradient
            id="paint0_linear_48_19471"
            x1="10.625"    
            y1="9.91667"
            x2="58.0833"
            y2="58.7917"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FD4E6B" />
            <stop offset="1" stopColor="#D4314C" />
          </linearGradient>
        </defs>
      </svg>
    </>
  );
};

export default PlayIcon;