import React from "react";
import { twMerge } from "tailwind-merge";

interface SoundMutedIconProps {
  width?: string;
  height?: string;
  className?: string;
}

const SoundMutedIcon: React.FC<SoundMutedIconProps> = (props) => {
  const { width, height, className } = props;

  return (
    <>
      <svg
        width={width}
        height={height}
        className={twMerge(className)}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 9.99997V14C2 16 3 17 5 17H6.43C6.8 17 7.17 17.11 7.49 17.3L10.41 19.13C12.93 20.71 15 19.56 15 16.59V7.40997C15 4.42997 12.93 3.28997 10.41 4.86997L7.49 6.69997C7.17 6.88997 6.8 6.99997 6.43 6.99997H5C3 6.99997 2 7.99997 2 9.99997Z"
          stroke="#060307"
          strokeWidth="1.5"
        />
        <path
          d="M18 8C19.78 10.37 19.78 13.63 18 16"
          stroke="#CDCDCD"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19.8301 5.5C22.7201 9.35 22.7201 14.65 19.8301 18.5"
          stroke="#CDCDCD"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line
          x1="2"
          y1="22"
          x2="22"
          y2="2"
          stroke="#060307"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </>
  );
};

export default SoundMutedIcon;
