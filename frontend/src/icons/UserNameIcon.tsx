import React from "react";
import { twMerge } from "tailwind-merge";

interface UserNameIconProps {
  width?: string;
  height?: string;
  className?: string;
}

const UserNameIcon: React.FC<UserNameIconProps> = (props) => {
  const { width, height, className } = props;

  return (
    <>   
      <svg
        width={width}
        height={height}
        className={twMerge(className)}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.0969 11.4482C13.5679 11.4482 15.571 9.44505 15.571 6.97408C15.571 4.50311 13.5679 2.5 11.0969 2.5C8.62592 2.5 6.62281 4.50311 6.62281 6.97408C6.62281 9.44505 8.62592 11.4482 11.0969 11.4482Z"
          fill="#9A9A9A"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.99998 17.6708C3.99879 17.3563 4.06914 17.0456 4.2057 16.7623C4.63426 15.9052 5.84278 15.4509 6.8456 15.2452C7.56883 15.0909 8.30205 14.9878 9.0398 14.9367C10.4057 14.8167 11.7795 14.8167 13.1454 14.9367C13.883 14.9884 14.6162 15.0915 15.3396 15.2452C16.3424 15.4509 17.5509 15.8623 17.9794 16.7623C18.2541 17.3399 18.2541 18.0104 17.9794 18.588C17.5509 19.4879 16.3424 19.8993 15.3396 20.0965C14.6172 20.2572 13.8837 20.3632 13.1454 20.4136C12.0336 20.5078 10.9167 20.525 9.80263 20.465C9.54549 20.465 9.29693 20.465 9.0398 20.4136C8.30423 20.3638 7.57355 20.2578 6.85417 20.0965C5.84278 19.8993 4.64283 19.4879 4.2057 18.588C4.06983 18.3013 3.99956 17.988 3.99998 17.6708Z"
          fill="#9A9A9A"
        />
      </svg>
    </>
  );
};

export default UserNameIcon;
