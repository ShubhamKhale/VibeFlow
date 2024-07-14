import React from "react";
import { twMerge } from "tailwind-merge";

interface EmailIconProps {
  width?: string;
  height?: string;
  className?: string;
}

const EmailIcon: React.FC<EmailIconProps> = (props) => {
  const { width, height, className } = props;

  return (
    <>   
      <svg
        width={width}
        height={height}
        className={twMerge(className)}
        viewBox="0 0 14 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 1.31635V0.933333C0 0.685798 0.0921872 0.448401 0.256282 0.273367C0.420376 0.0983331 0.642936 0 0.875 0L13.125 0C13.3571 0 13.5796 0.0983331 13.7437 0.273367C13.9078 0.448401 14 0.685798 14 0.933333V1.31635L7 5.98302L0 1.31635ZM7.23188 6.92918C7.16232 6.97549 7.08199 7.00004 7 7.00004C6.91801 7.00004 6.83768 6.97549 6.76813 6.92918L0 2.41698V10.2667C0 10.5142 0.0921872 10.7516 0.256282 10.9266C0.420376 11.1017 0.642936 11.2 0.875 11.2H13.125C13.3571 11.2 13.5796 11.1017 13.7437 10.9266C13.9078 10.7516 14 10.5142 14 10.2667V2.41698L7.23188 6.92918Z"
          fill="#9A9A9A"
        />
      </svg>
    </>
  );
};

export default EmailIcon;