import React from "react";
import { twMerge } from "tailwind-merge";

interface ThreeDotsIconProps {
  width?: string;
  height?: string;
  className?: string;
}

const ThreeDotsIcon: React.FC<ThreeDotsIconProps> = (props) => {
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
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <rect width="24" height="24" fill="url(#pattern0_563_3261)" />
        <defs>
          <pattern
            id="pattern0_563_3261"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use xlinkHref="#image0_563_3261" transform="scale(0.02)" />
          </pattern>
          <image
            id="image0_563_3261"
            width="50"
            height="50"
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAwUlEQVR4nO3ZQQ6CMBSE4X8jnMF6Q6zeUoREDVcxuNc0KUuF7qZmvuTt2EwetJkAZlVpgRMwAK88VyACDZU4ABPw/jIPIFDBJqYfIZa5q2/mvCHEMkeEjQVB0jcjay4Ikp79iyBPhA0FQXqExYIgHcKafE+shbgBO8SFlTApxJ5KNPme6PMBkOaSXyf5TZjZdu4jKtxH1IzuI2Jm9xEx0X1EUHAfMbPqtP4/IsJ9RM3oPiJmdh8RE91HBAX3ETPkfADfe0+kCAYLvQAAAABJRU5ErkJggg=="
          />
        </defs>
      </svg>
    </>
  );
};

export default ThreeDotsIcon;
