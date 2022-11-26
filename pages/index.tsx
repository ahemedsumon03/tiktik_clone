import { NextPage } from 'next';
import axios from 'axios';
import { Video } from '../types';
import { VideoCard,NoResult } from '../components';

interface IProps {
  videos: Video[]
}

const Home = ({ videos }: IProps) => {

  return (
    <h1 className="flex flex-col gap-10 videos h-full">
      {videos.length > 0 ? (
        videos.map((video: Video) => (
          <VideoCard post={video} key={video._id} />
        ))
      ) : (
          <NoResult text={"No Video Found"} />
      )}
    </h1>
  )
}

export async function getServerSideProps({ query: { topic } }: { query: { topic: string } }) {
  
  let response = null;

  if (topic) {
    response = await axios.get(`http://localhost:3000/api/discover/${topic}`);
  }
  else { 
    response = await axios.get('http://localhost:3000/api/post');
  }

  return {
    props: {
      videos: response.data
    }
  }
}

export default Home