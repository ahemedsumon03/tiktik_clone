import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react'
import { GoVerified } from 'react-icons/go';
import useAuthStore from '../store/authStore'
import { IUser } from '../types';

const SuggestedAccount = () => {

  const { fetchAllUser, allUser } = useAuthStore();

  useEffect(() => {
    fetchAllUser();
  }, [fetchAllUser]);

  console.log(allUser);


  return (
    <div className='xl:border-b-2 border-gray-200 pb-4'>
      <p className='text-gray-500 font-semibold m-3 mt-4 hidden xl:block'>
        Suggested Account
      </p>
      <div>
        {allUser.slice(0, 6).map((user: IUser) => (
          <Link href={`/profile/${user?._id}`} key={user._id}>
            <div className='flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded'>
              <div className='w-8 h-8'>
                <Image
                  src={user.image}
                  alt="profile"
                  height={36}
                  width={36}
                  layout="responsive"
                  className='rounded-full'
                />
              </div>

              <div className='hidden xl:block'>
                <p className='flex gap-2 items-center text-md font-bold text-primary lowercase'>
                  {user.userName.replace('/\s+/g', '')}
                  <GoVerified className='text-blue-400'/>
                </p>
                <p className='text-sm capitalize text-gray-400'>{ user.userName }</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SuggestedAccount