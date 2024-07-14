import React from "react";
import { twMerge } from "tailwind-merge";

interface PauseIconProps {
  width?: string;
  height?: string;
  className?: string;
}

const PauseIcon: React.FC<PauseIconProps> = (props) => {
  const { width, height, className } = props;

  return (
    <>
      <svg
        width={width}
        height={height}
        className={twMerge(className)}   
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.2 25.48V6.52C14.2 4.72 13.44 4 11.52 4H6.68C4.76 4 4 4.72 4 6.52V25.48C4 27.28 4.76 28 6.68 28H11.52C13.44 28 14.2 27.28 14.2 25.48Z"
          fill="white"
        />
        <path
          opacity="0.4"
          d="M27.9998 25.48V6.52C27.9998 4.72 27.2398 4 25.3198 4H20.4798C18.5731 4 17.7998 4.72 17.7998 6.52V25.48C17.7998 27.28 18.5598 28 20.4798 28H25.3198C27.2398 28 27.9998 27.28 27.9998 25.48Z"
          fill="white"
        />
      </svg>
    </>
  );
};

export default PauseIcon;
