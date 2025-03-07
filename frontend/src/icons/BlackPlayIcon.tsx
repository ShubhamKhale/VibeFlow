import React from "react";
import { twMerge } from "tailwind-merge";

interface BlackPlayIconProps {
  width?: string;
  height?: string;
  className?: string;
}

const BlackPlayIcon: React.FC<BlackPlayIconProps> = (props) => {
  const { width, height, className } = props;

  return (
    <>
      <svg
        width={width}
        height={height}
        className={twMerge(className)}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 3.5L15 10L5 16.5V3.5Z"
          fill="#060307"
        />
      </svg>
    </>
  );
};

export default BlackPlayIcon;
