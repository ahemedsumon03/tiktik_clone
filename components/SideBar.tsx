import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import GoogleLogin from 'react-google-login';
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';
import { Discover,Footer,SuggestedAccount } from '../components';

const SideBar = () => {

  const [showSideBar, setshowSideBar] = useState(true);

  const normalLink = 'flex items-center gap-3 hover:bg-primary p-3 justify-center cursor-pointer font-semibold text-[#F51997] rounded';

  return (
    <div>
      <div
        className='block xl:hidden m-2 ml-4 mt-3 text-xl'
        onClick={() => setshowSideBar((prev) => !prev)}
      >
        {showSideBar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>

      {showSideBar && (
        <div className='xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3'>
          <div>
            <Link href="/">
              <div className={normalLink}>
                <p className='text-2xl'>
                  <AiFillHome />
                </p>
                <span className='text-xl hidden xl:block'>
                  For You
                </span>
              </div>
            </Link>
          </div>

          
          <Discover />
          <SuggestedAccount />
          <Footer/>
        </div>
      )}
    </div>
  )
}

export default SideBar