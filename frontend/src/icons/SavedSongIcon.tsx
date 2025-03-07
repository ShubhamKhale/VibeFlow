import React from "react";
import { twMerge } from "tailwind-merge";

interface SavedSongIconProps {
  width?: string;
  height?: string;
  className?: string;
}

const SavedSongIcon: React.FC<SavedSongIconProps> = (props) => {
  const { width, height, className } = props;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        className={twMerge(className)}
        viewBox="0 0 30 30"
        fill="none"
      >
        <path
          d="M27.5 4.6875H2.5C1.9875 4.6875 1.5625 4.2625 1.5625 3.75C1.5625 3.2375 1.9875 2.8125 2.5 2.8125H27.5C28.0125 2.8125 28.4375 3.2375 28.4375 3.75C28.4375 4.2625 28.0125 4.6875 27.5 4.6875Z"
          fill="#000205"
        />
        <path
          d="M13.75 12.1875H2.5C1.9875 12.1875 1.5625 11.7625 1.5625 11.25C1.5625 10.7375 1.9875 10.3125 2.5 10.3125H13.75C14.2625 10.3125 14.6875 10.7375 14.6875 11.25C14.6875 11.7625 14.2625 12.1875 13.75 12.1875Z"
          fill="#000205"
        />
        <path
          d="M10 19.6875H2.5C1.9875 19.6875 1.5625 19.2625 1.5625 18.75C1.5625 18.2375 1.9875 17.8125 2.5 17.8125H10C10.5125 17.8125 10.9375 18.2375 10.9375 18.75C10.9375 19.2625 10.5125 19.6875 10 19.6875Z"
          fill="#000205"
        />
        <path
          d="M7.5 27.1875H2.5C1.9875 27.1875 1.5625 26.7625 1.5625 26.25C1.5625 25.7375 1.9875 25.3125 2.5 25.3125H7.5C8.0125 25.3125 8.4375 25.7375 8.4375 26.25C8.4375 26.7625 8.0125 27.1875 7.5 27.1875Z"
          fill="#000205"
        />
        <path
          d="M27.325 9.59999C26.5875 9.03749 25.575 8.92503 24.3875 9.25003L18.95 10.725C17.4875 11.125 16.5875 12.3125 16.5875 13.8125V17V21.6C16.0625 21.3 15.45 21.1125 14.8 21.1125C12.7875 21.1125 11.1375 22.75 11.1375 24.775C11.1375 26.7875 12.775 28.4375 14.8 28.4375C16.825 28.4375 18.4625 26.8 18.4625 24.775V17.7125L26.5624 15.5V19.7875C26.0374 19.4875 25.4249 19.3 24.775 19.3C22.7625 19.3 21.1124 20.9375 21.1124 22.9625C21.1124 24.975 22.7499 26.625 24.775 26.625C26.7999 26.625 28.4375 24.9875 28.4375 22.9625V14.275V12.3375C28.4375 11.075 28.0625 10.15 27.325 9.59999Z"
          fill="#000205"
        />
      </svg>
    </>
  );
};

export default SavedSongIcon;
