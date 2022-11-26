import React, { useEffect, useState } from 'react'
import { MdFavorite } from 'react-icons/md';
import useAuthStore from '../store/authStore';

const Like = ({ likes, handleLike, handleDisLike } : any) => {

    const { userProfile }: {userProfile: any} = useAuthStore();
    const [alreadyLinked, setAlreadyLinked] = useState(false);

    let filterlikes = likes?.filter((item: any) => item?._ref === userProfile?._id);
    
    useEffect(() => {
        if (filterlikes?.length > 0) {
            setAlreadyLinked(true);
        } else { 
            setAlreadyLinked(false);
        }
    }, [likes, filterlikes]);

    return (
        <div className='flex gap-6'>
            <div className='mt-4 flex flex-col justify-center items-center cursor-pointer'>
                {alreadyLinked ? (
                    <div className='bg-primary rounded-full p-2 md:p-4 text-[#F51997]'>
                        <MdFavorite className='text-lg md:text-2xl' onClick={handleDisLike}/>
                    </div>
                ) : (
                    <div className='bg-primary rounded-full p-2 md:p-4 '>
                        <MdFavorite className='text-lg md:text-2xl' onClick={handleLike}/>
                    </div>
                )}
                <p className='text-md font-semibold'>{likes?.length || 0}</p>
            </div>
        </div>
    )
}

export default Like