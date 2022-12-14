import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { NavBar, SideBar } from '../components';
import { useEffect,useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

const App = ({ Component, pageProps }: AppProps) => {

  const [isSSr, setIsSSr] = useState(true);

  useEffect(() => {
    setIsSSr(false);
  }, []);

  if (isSSr) return null;

  return (
    <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}>
       <NavBar/>
      <div className='flex gap-6 md:gap-20'>
        <div className='h-[96vh] overflow-hidden xl:hover:overflow-auto'>
          <SideBar/>
        </div>
        <div className='mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1'>
           <Component {...pageProps} />
        </div>
      </div>
    </GoogleOAuthProvider>
  )
}

export default App;
