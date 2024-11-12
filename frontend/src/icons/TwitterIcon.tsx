import React from "react";
import { twMerge } from "tailwind-merge";

interface TwitterIconProps {
  width?: string;
  height?: string;
  className?: string;
}

const TwitterIcon: React.FC<TwitterIconProps> = (props) => {
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
        <g filter="url(#filter0_d_414_3361)">
          <path
            d="M21.4998 34.9997C31.1647 34.9997 38.9997 27.1647 38.9997 17.4998C38.9997 7.83494 31.1647 0 21.4998 0C11.8349 0 4 7.83494 4 17.4998C4 27.1647 11.8349 34.9997 21.4998 34.9997Z"
            fill="#55ACEE"
          />
        </g>
        <path
          d="M32.2185 12.5766C31.455 12.9149 30.6451 13.1366 29.8158 13.2345C30.6895 12.7121 31.3433 11.8897 31.6554 10.9208C30.8343 11.408 29.9359 11.7512 28.9991 11.9355C28.6076 11.518 28.1346 11.1854 27.6092 10.9582C27.0839 10.7311 26.5175 10.6143 25.9451 10.6151C23.6354 10.6151 21.7622 12.4883 21.7622 14.798C21.7622 15.1259 21.7993 15.445 21.871 15.7513C18.3947 15.577 15.3123 13.9118 13.249 11.3803C12.877 12.0187 12.6814 12.7445 12.6825 13.4834C12.6825 14.9343 13.4215 16.2152 14.5433 16.9651C13.879 16.9446 13.2293 16.765 12.6488 16.4414L12.6485 16.4944C12.6485 18.5212 14.091 20.2116 16.0042 20.5956C15.6451 20.6936 15.2745 20.743 14.9024 20.7426C14.6322 20.7426 14.3705 20.7167 14.1153 20.668C14.6475 22.3295 16.192 23.5389 18.0228 23.5729C16.541 24.7359 14.711 25.3666 12.8273 25.3635C12.4904 25.3635 12.1566 25.3438 11.83 25.3048C13.7422 26.5343 15.9681 27.1868 18.2415 27.1844C25.9355 27.1844 30.1431 20.8106 30.1431 15.2825C30.1431 15.1012 30.139 14.9206 30.1309 14.7415C30.9502 14.15 31.6571 13.4168 32.2185 12.5766Z"
          fill="#F1F2F2"
        />
        <defs>
          <filter
            id="filter0_d_414_3361"
            x="0"
            y="0"
            width="42.9997"
            height="42.9997"
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
              result="effect1_dropShadow_414_3361"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_414_3361"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </>
  );
};

export default TwitterIcon;
