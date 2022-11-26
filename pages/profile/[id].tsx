import React, { useState,useEffect } from 'react'
import axios from 'axios';
import { IUser,Video } from '../../types';
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';
import { NoResult, VideoCard } from '../../components';

interface IProps { 
    data: {
        user: IUser,
        userVideo: Video[],
        userLike: Video[]
    }
}

const Profile = ({ data }: IProps) => {

    const [showUserVideos, setShowUserVideos] = useState<boolean>(true);
    const [videoList, setVideoList] = useState<Video[]>([]);

    const video = showUserVideos ? 'border-b-2 border-black' : 'text-gary-400';
    const liked = !showUserVideos ? 'border-b-2 border-black' : 'text-gary-400';

    const { user, userLike, userVideo } = data;
    
    useEffect(() => {

        const faceVideos = async () => { 
            if (showUserVideos) {
                setVideoList(userVideo);
            } else {
                setVideoList(userLike);
            }
        }
        
        faceVideos();

    }, [showUserVideos,userVideo,userLike]);

    console.log(data);
    
    return (
        <div className='w-full'>
            <div className='flex gap-6 md:gap-10 mb-4 bg-white w-full'>
                <div className='w-16 h-16 md:w-32 md:h-32'>
                    <Image
                        width={120}
                        height={120}  
                        src={user.image}
                        alt="user-profile"
                        className='rounded-full'
                    />
                </div>

                <div>
                    <div className='text-md md:text-2xl font-bold tracking-wider flex gap-2 justify-center items-center lowercase'>
                        <span>{user.userName.replace('/\s+/g', '')}</span>
                        <GoVerified className='text-blue-400 md:text-xl text-md'/>
                    </div>
                    <p className='text-blue-400 md:text-xl text-md'>{user.userName}</p>
                </div>
            </div>

            <div>
                <div className='flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full'>
                    <p className={`${video} cursor-pointer text-xl font-semibold`} onClick={()=>setShowUserVideos(true)}>
                        Videos
                    </p>
                    <p className={`${liked} cursor-pointer text-xl font-semibold`} onClick={()=>setShowUserVideos(false)}>
                        Liked
                    </p>
                </div>

                <div className='flex gap-6 flex-wrap md:justify-start'>
                    {videoList.length ? videoList.map((video : Video) => (
                        <VideoCard post={video} key={ video._id } />
                    )) : (
                            <NoResult text={`No ${showUserVideos ? '' : 'Liked'} videos yet`} />
                    )}
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps({ params: { id } }: { params: { id: string } }) {

    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/${id}`);

    return {
        props: {
            data
        }
    }
}

export default Profile