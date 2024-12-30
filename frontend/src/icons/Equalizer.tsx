import React from "react";
import { twMerge } from "tailwind-merge";

interface EqualizerProps {
  width?: string;
  height?: string;
  className?: string;
}

const EqualizerIcon: React.FC<EqualizerProps> = (props) => {
  const { width, height, className } = props;

  return (
    <>
      <svg
        width={width}
        height={height}
        viewBox="0 0 30 24"
        fill="none"
        className={twMerge(className)}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <rect width={width} height={height} fill="url(#pattern0_673_3228)" />
        <defs>
          <pattern
            id="pattern0_673_3228"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use
              xlinkHref="#image0_673_3228"
              transform="matrix(0.01 0 0 0.0125 0 -0.125)"
            />
          </pattern>
          <image
            id="image0_673_3228"
            width="100"
            height="100"
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAAXNSR0IArs4c6QAABClJREFUeAHtXEuOFTEMNAsWwC2Ay3AAOAi/O/LZ81nABiF2SMAelCGl6ZhHp/Oe3XZP6kkjt+cldrnK6Y5akxHhhwyQATIwDQO3ReRWgmqJQ0SeiMh3EfkhIo8DRSGOSv43Efldf74GCkIclXyIARulCfLDTosDBMBOS0SWBoUQsBTk+hZeONn9AyFgdwdQEyI/7LQ4QADstERkaQwIAUtBeMu66gE0BOy0jQECYKclohYOHmB35wOJYXcHkIWILDggBCwF4TPkqgfQELDTNgYIgJ2WiFo4eIDdnQ8kht0dQBYisuCAELAUxPkZck9EXorIWxH5tXjVDgF6tsx5IyIvROSuo1oah2Oq1dCuOB6KyMczRNCg4L8XkQer5Zz/JXLAnh/pspnID3tZtMXssjI+GIoBgEUUj5WC+LCLUna9RH5Ys+TlNoWg1va5GcrrQBrj9Tf7XrnhKM8MHdzKf+3AkcbmkGJTSDcc5zzANZj/+T83lTY2SOcam2032g2HDmzt21HwN5LGZx0f8cJ2nbpAax8FWlmNzyruMk7orlMXaO0vC7W41vgsYi5jhO86dYHW/rJYi2uNzyLmMkb4rrM8eHWRVn75K0frj8ZmHT981xkOYJBRb0HCG7S8e9JFWvlPB8neMlxj2zJnZIyOb+13sZSHWHnNYZ34nYjc6WYfH6BxjkdYn6HjW/vr2eu35UWgpShFjPubMo8P0gSNR1ifoeNb++vZF9+WF4HPROTVBa/fy9xym/JYGYCqCcLvrayOb+1b4UwTRxNkDSz8oW5dkHc8b0EOs+v0JmKrkN44DrPr9CYiiyCH2XXOIkhpjEPsOmcSpIiSftc5myBbb6Fh4yhIGPWnE1OQlpdwPsIBVD6Ig0S0SyMLH+zMVpdwPsIBZOnMLDgoCFdIy0CWzsyCgyuk7Y9wPsIBZOnMLDgoCFdIy0CWzsyCgyuk7Y9wPsIBZOnMLDgoCFdIy0CWzsyCgyuk7Y9wPsIBZOnMLDgoyKQrJOxsX8t31wtv0D0AhJ7t60rQDtiDjzaj8rwBhJ/tU/X2XG8+evn/OT/SnTA4IPxs3yDeGy/IYf7IuQp34wXhf5RItkR1x1n7g+V2h2t83QnWA7wB6PjW/tH46OLVBHUnDA7Q8a39QTjd4Rpfd4L1AG8AOr61fzQ+ung1Qd0JgwOOdrbPm48ufd4AuO3tStAO8BbkMGf7Ki3efLTsn/C8ARzmbN8sgpQ6D3G2byZBSq3pz/bNJkitN73xvoV3CQgH0EW474BwPsIBVL6Jg0ScXHrhjREOgI3RNgYFScYHBaEgLQPVY2OQiJyNwc5sdQnnIxwAV2qyjqAgFKRloPXC7xjhALhCknUEBaEgLQOtF37H+Lz4h/2fWmy7esRR6X4kIl/qT7mO+hBHFPPMSwbIABkgA6kY+AMw9IoxSBL3BgAAAABJRU5ErkJggg=="
          />
        </defs>
      </svg>
    </>
  );
};

export default EqualizerIcon;
