import React from 'react'
import { twMerge } from 'tailwind-merge'

interface DisplayCardProps {
    imgSrc?: string;
    albumName?: string;
    albumArtist?: string;
}

const DisplayCard: React.FC<DisplayCardProps> = (props) => {

    const { imgSrc, albumName, albumArtist } = props;

    return (
        <>
            <div className='rounded-xl cursor-pointer border w-[130px] bg-white shadow-[0_4px_20px_0px_rgba(0,0,0,0.06)]'>
                <img className='rounded-t-xl w-[130px] h-[130px] object-cover' src={imgSrc} alt="-" />
                <div className='p-2.5'>

                    <p className='mb-0 text-[#060307] font-urbanist text-xs font-semibold leading-normal capitalize'>{albumName}</p>
                    <p className='mb-0 text-[#7F8489] font-urbanist text-[10px] font-medium leading-normal capitalize'>{albumArtist}</p>
                </div>
            </div>
        </>
    );
};

export default DisplayCard;
