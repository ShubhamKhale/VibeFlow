import React from "react";
import { twMerge } from "tailwind-merge";

interface PasswordIconProps {
  width?: string;
  height?: string;
  className?: string;
}

const PasswordIcon: React.FC<PasswordIconProps> = (props) => {
  const { width, height, className } = props;

  return (
    <>
      <svg
        width={width}
        height={height}
        className={twMerge(className)}
        viewBox="0 0 14 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.375 6.125V4.375C11.375 1.925 9.45 0 7 0C4.55 0 2.625 1.925 2.625 4.375V6.125C1.1375 6.125 0 7.2625 0 8.75V14.875C0 16.3625 1.1375 17.5 2.625 17.5H11.375C12.8625 17.5 14 16.3625 14 14.875V8.75C14 7.2625 12.8625 6.125 11.375 6.125ZM4.375 4.375C4.375 2.8875 5.5125 1.75 7 1.75C8.4875 1.75 9.625 2.8875 9.625 4.375V6.125H4.375V4.375ZM7.875 13.125C7.875 13.65 7.525 14 7 14C6.475 14 6.125 13.65 6.125 13.125V10.5C6.125 9.975 6.475 9.625 7 9.625C7.525 9.625 7.875 9.975 7.875 10.5V13.125Z"
          fill="#9A9A9A"
        />
      </svg>
    </>
  );
};

export default PasswordIcon;