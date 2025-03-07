import React from "react";
import { twMerge } from "tailwind-merge";

interface MusicNoteIconProps {
  width?: string;
  height?: string;
  className?: string;
}

const MusicNoteIcon: React.FC<MusicNoteIconProps> = (props) => {
  const { width, height, className } = props;

  return (
    <>
      <svg
        fill="#060307"
        width={width}
        height={height}
        className={twMerge(className)}  
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Music_Note_1" data-name="Music Note 1" fill="#060307">
          <path
            d="M20.05,3.657a2.487,2.487,0,0,0-2.03-.56l-7.88,1.33a2.483,2.483,0,0,0-2.08,2.46v8.82a3,3,0,1,0,1,2.23V9.387l10.88-1.83v6.22a2.936,2.936,0,0,0-2-.77,3,3,0,1,0,3,3V5.567A2.513,2.513,0,0,0,20.05,3.657ZM6.06,19.937a2,2,0,1,1,2-2A1.993,1.993,0,0,1,6.06,19.937Zm11.88-1.93a2,2,0,1,1,2-2A2,2,0,0,1,17.94,18.007Zm2-11.46L9.06,8.377V6.887a1.483,1.483,0,0,1,1.25-1.47l7.88-1.33a1.493,1.493,0,0,1,1.75,1.48Z"
            fill="#060307"
          ></path>
        </g>
      </svg>
    </>
  );
};

export default MusicNoteIcon;
