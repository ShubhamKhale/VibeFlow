import React from "react";
import { twMerge } from "tailwind-merge";

interface GoogleIconProps {
  width?: string;
  height?: string;
  className?: string;
}

const GoogleIcon: React.FC<GoogleIconProps> = (props) => {
  const { width, height, className } = props;

  return (
    <>
      <svg
        width={width}
        height={height}
        className={twMerge(className)}
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_414_3364)">
          <path
            d="M21.5263 35.0533C31.206 35.0533 39.053 27.2063 39.053 17.5266C39.053 7.84694 31.206 0 21.5263 0C11.8467 0 3.99969 7.84694 3.99969 17.5266C3.99969 27.2063 11.8467 35.0533 21.5263 35.0533Z"
            fill="#E0E0E0"
          />
        </g>
        <path
          d="M21.5263 34.5205C31.0589 34.5205 38.7866 26.7928 38.7866 17.2603C38.7866 7.72768 31.0589 0 21.5263 0C11.9938 0 4.26605 7.72768 4.26605 17.2603C4.26605 26.7928 11.9938 34.5205 21.5263 34.5205Z"
          fill="white"
        />
        <mask
          id="mask0_414_3364"
          style={{maskType: "luminance"}}
          maskUnits="userSpaceOnUse"
          x="10"
          y="5"
          width="23"
          height="25"
        >
          <path
            d="M32.7135 15.2359H21.7927V19.764H28.0788C27.4928 22.6408 25.0423 24.2922 21.7927 24.2922C17.9571 24.2922 14.8673 21.2024 14.8673 17.3668C14.8673 13.5312 17.9571 10.4414 21.7927 10.4414C23.4441 10.4414 24.9357 11.0274 26.1077 11.9863L29.5172 8.57683C27.4396 6.76557 24.7759 5.64685 21.7927 5.64685C15.2935 5.64685 10.0728 10.8675 10.0728 17.3668C10.0728 23.866 15.2935 29.0867 21.7927 29.0867C27.6527 29.0867 32.9799 24.8249 32.9799 17.3668C32.9799 16.6742 32.8734 15.9284 32.7135 15.2359Z"
            fill="white"
          />
        </mask>
        <g mask="url(#mask0_414_3364)">
          <path
            d="M9.00731 24.2922V10.4413L18.0636 17.3668L9.00731 24.2922Z"
            fill="#FBBC05"
          />
        </g>
        <mask
          id="mask1_414_3364"
          style={{maskType: "luminance"}}
          maskUnits="userSpaceOnUse"
          x="10"
          y="5"
          width="23"
          height="25"
        >
          <path
            d="M32.7135 15.2359H21.7927V19.764H28.0788C27.4928 22.6408 25.0423 24.2922 21.7927 24.2922C17.9571 24.2922 14.8673 21.2024 14.8673 17.3668C14.8673 13.5312 17.9571 10.4414 21.7927 10.4414C23.4441 10.4414 24.9357 11.0274 26.1077 11.9863L29.5172 8.57683C27.4396 6.76557 24.7759 5.64685 21.7927 5.64685C15.2935 5.64685 10.0728 10.8675 10.0728 17.3668C10.0728 23.866 15.2935 29.0867 21.7927 29.0867C27.6527 29.0867 32.9799 24.8249 32.9799 17.3668C32.9799 16.6742 32.8734 15.9284 32.7135 15.2359Z"
            fill="white"
          />
        </mask>
        <g mask="url(#mask1_414_3364)">
          <path
            d="M9.00731 10.4414L18.0636 17.3668L21.7927 14.1172L34.5781 12.0396V4.58142H9.00731V10.4414Z"
            fill="#EA4335"
          />
        </g>
        <mask
          id="mask2_414_3364"
          style={{maskType: "luminance"}}
          maskUnits="userSpaceOnUse"
          x="10"
          y="5"
          width="23"
          height="25"
        >
          <path
            d="M32.7135 15.2359H21.7927V19.764H28.0788C27.4928 22.6408 25.0423 24.2922 21.7927 24.2922C17.9571 24.2922 14.8673 21.2024 14.8673 17.3668C14.8673 13.5312 17.9571 10.4414 21.7927 10.4414C23.4441 10.4414 24.9357 11.0274 26.1077 11.9863L29.5172 8.57683C27.4396 6.76557 24.7759 5.64685 21.7927 5.64685C15.2935 5.64685 10.0728 10.8675 10.0728 17.3668C10.0728 23.866 15.2935 29.0867 21.7927 29.0867C27.6527 29.0867 32.9799 24.8249 32.9799 17.3668C32.9799 16.6742 32.8734 15.9284 32.7135 15.2359Z"
            fill="white"
          />
        </mask>
        <g mask="url(#mask2_414_3364)">
          <path
            d="M9.00731 24.2922L24.989 12.0396L29.1976 12.5723L34.5781 4.58142V30.1522H9.00731V24.2922Z"
            fill="#34A853"
          />
        </g>
        <mask
          id="mask3_414_3364"
          style={{maskType: "luminance"}}
          maskUnits="userSpaceOnUse"
          x="10"
          y="5"
          width="23"
          height="25"
        >
          <path
            d="M32.7135 15.2359H21.7927V19.764H28.0788C27.4928 22.6408 25.0423 24.2922 21.7927 24.2922C17.9571 24.2922 14.8673 21.2024 14.8673 17.3668C14.8673 13.5312 17.9571 10.4414 21.7927 10.4414C23.4441 10.4414 24.9357 11.0274 26.1077 11.9863L29.5172 8.57683C27.4396 6.76557 24.7759 5.64685 21.7927 5.64685C15.2935 5.64685 10.0728 10.8675 10.0728 17.3668C10.0728 23.866 15.2935 29.0867 21.7927 29.0867C27.6527 29.0867 32.9799 24.8249 32.9799 17.3668C32.9799 16.6742 32.8734 15.9284 32.7135 15.2359Z"
            fill="white"
          />
        </mask>
        <g mask="url(#mask3_414_3364)">
          <path
            d="M34.5781 30.1521L18.0636 17.3668L15.9327 15.7686L34.5781 10.4413V30.1521Z"
            fill="#4285F4"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_414_3364"
            x="-0.000305176"
            y="0"
            width="43.0533"
            height="43.0533"
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
              result="effect1_dropShadow_414_3364"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_414_3364"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </>
  );
};

export default GoogleIcon;
