import React from "react";
import { twMerge } from "tailwind-merge";

interface MobileIconProps {
  width?: string;
  height?: string;
  className?: string;
}

const MobileIcon: React.FC<MobileIconProps> = (props) => {
  const { width, height, className } = props;

  return (   
    <>
      <svg
        width={width}
        height={height}
        className={twMerge(className)}
        fill="#9A9A9A"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
      >
        <path d="M304 0h-224c-35.35 0-64 28.65-64 64v384c0 35.35 28.65 64 64 64h224c35.35 0 64-28.65 64-64V64C368 28.65 339.3 0 304 0zM192 480c-17.75 0-32-14.25-32-32s14.25-32 32-32s32 14.25 32 32S209.8 480 192 480zM304 64v320h-224V64H304z" />
      </svg>
    </>
  );
};

export default MobileIcon;
