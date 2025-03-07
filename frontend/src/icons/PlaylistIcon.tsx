import React from "react";
import { twMerge } from "tailwind-merge";

interface PlaylistIconProps {
  width?: string;
  height?: string;
  className?: string;
}

const PlaylistIcon: React.FC<PlaylistIconProps> = (props) => {
  const { width, height, className } = props;

  return (
    <>
      <svg
        width={width}
        height={height}
        className={twMerge(className)}
        viewBox="0 0 30 30"
        // #F1AFBA
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      > 
        <rect width="30" height="30" fill="url(#pattern0_674_3234)" />
        <defs>
          <pattern
            id="pattern0_674_3234"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use xlinkHref="#image0_674_3234" transform="scale(0.01)" />
          </pattern>
          <image
            id="image0_674_3234"
            width="100"
            height="100"
            xlinkHref="data:image/png;base64,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"
          />
        </defs>
      </svg>
    </>
  );
};

export default PlaylistIcon;
