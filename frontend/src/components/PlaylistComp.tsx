import React from 'react'
import { twMerge } from 'tailwind-merge'

interface PlaylistCompProps {
    imgSrc?: string;
    playNum?: number;
}

const PlaylistComp: React.FC<PlaylistCompProps> = (props) => {

    const { imgSrc, playNum } = props;
  
    return (
        <>
            <div className='w-full cursor-pointer flex items-center pr-16 py-1 pl-1.5 gap-3 rounded-[10px] bg-[#EDEDED] border-2'>
                <img src={imgSrc} alt="-" className='w-[50px] h-[45px] rounded-[10px] object-cover' />
                <p className='text-[#060307]  font-urbanist text-xs font-semibold leading-4'>Playlist #{playNum}</p>
            </div>
        </>
    );
};

export default PlaylistComp;
