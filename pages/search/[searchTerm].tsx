import React, { useState } from 'react'
import { useRouter } from 'next/router';
import useAuthStore from '../../store/authStore';
import { IUser, Video } from '../../types';
import Link from 'next/link';
import { NoResult, VideoCard } from '../../components';
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';
import axios from 'axios';

const SearchTerm = ({ videos }: { videos: Video[] }) => {

    console.log(videos);

    const { allUser } = useAuthStore();
    const router = useRouter();
    const [isAccount, setIsAccount] = useState(true);

    const { searchTerm }: any = router.query;

    const searchAccount = allUser.filter((user: IUser) => user.userName.toLocaleLowerCase().includes(searchTerm));

    const account = isAccount ? 'border-b-2 border-black' : 'text-gray-400';
    const video = !isAccount ? 'border-b-2 border-black' : 'text-gray-400';

    return (
        <div className='w-full'>
            <div className='flex gap-10 mb-10 border-b-2 border-gray-200 md:fixed z-50 bg-white w-full'>
                <p className={`text-xl font-semibold cursor-pointer ${account} mt-2`} onClick={() => setIsAccount(true)}>
                    Accounts
                </p>
                <p className={`text-xl font-semibold cursor-pointer ${video} mt-2`} onClick={() => setIsAccount(false)}>
                    Videos
                </p>
            </div>

            {isAccount ? (
                <div className='md:mt-16'>
                    {searchAccount.length ? (
                        searchAccount.map((user: IUser, idx: number) => (
                            <Link href={`/profile/${user._id}`} key={idx}>
                                <div className='flex gap-3 p-2 cursor-pointer font-semobold rounded border-b-2 border-gary-200'>
                                    <div>
                                        <Image
                                            src={user.image}
                                            alt="user-profile"
                                            height={50}
                                            width={50}
                                            className="rounded-full"
                                        />
                                    </div>

                                    <div>
                                        <div>
                                            <p className='flex gap-1 items-center text-lg font-bold text-primary'>
                                                {user.userName}
                                                <GoVerified className='text-blue-400' />
                                            </p>
                                            <p className='capitalize text-gray-400 text-sm'>
                                                {user.userName}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <NoResult text={`No account found for ${searchTerm}`} />
                    )}
                </div>
            ) : (
                <div className='md:mt-16 flex flex-wrap gap-6 md:justify-start'>
                    {videos.length ? (
                        videos.map((post: Video, idx: number) => (
                            <VideoCard post={post} key={idx} />
                        ))
                    ) : (
                        <NoResult text={`No Video Result for ${searchTerm}`} />
                    )}
                </div>
            )}
        </div>
    )
};

export async function getServerSideProps({ params: { searchTerm } }: { params: { searchTerm: string } }) {

    const res = await axios.get(`http://localhost:3000/api/search/${searchTerm}`);

    return {
        props: {
            videos: res.data,
        }
    }
}

export default SearchTerm