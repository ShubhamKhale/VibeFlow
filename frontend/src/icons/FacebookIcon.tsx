import React from "react";
import { twMerge } from "tailwind-merge";

interface FaceBookIconProps {
  width?: string;
  height?: string;
  className?: string;
}

const FaceBookIcon: React.FC<FaceBookIconProps> = (props) => {
  const { width, height, className } = props;

  return (
    <>   
      <svg
        width={width}
        height={height}
        className={twMerge(className)}
        viewBox="0 0 43 43"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_414_3358)">
          <path
            d="M21.5 35C31.165 35 39 27.165 39 17.5C39 7.83502 31.165 0 21.5 0C11.835 0 4 7.83502 4 17.5C4 27.165 11.835 35 21.5 35Z"
            fill="#3B5998"
          />
        </g>
        <path
          d="M25.6778 17.6597H23.305V26.3528H19.7098V17.6597H18V14.6046H19.7098V12.6276C19.7098 11.2138 20.3814 9 23.337 9L26 9.01114V11.9766H24.0678C23.7509 11.9766 23.3052 12.135 23.3052 12.8094V14.6074H25.9919L25.6778 17.6597Z"
          fill="white"
        />
        <defs>
          <filter
            id="filter0_d_414_3358"
            x="0"
            y="0"
            width="43"
            height="43"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_414_3358"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_414_3358"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </>
  );
};

export default FaceBookIcon;
