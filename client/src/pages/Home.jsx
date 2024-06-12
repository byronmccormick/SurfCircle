import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import CallToAction from '../components/CallToAction' ;
import PostCard from '../components/PostCard'

export default function Home() {
  const [posts,setPosts] = useState([])

  useEffect(()=>{
      const fetchPosts = async () => {
        const res = await fetch('/api/post/getPosts');
        const data = await res.json();
        setPosts(data.posts);
      }
      fetchPosts();
  }, []);
  return (
    <div className=''>
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to SurfCircle!</h1>
        <p className='text-gray-500 text-xs sm:text-sm'>Join our vibrant surf community and share your stoke for waves. Whether you’re logging your surf sessions, comparing the latest forecasts, or reading about fellow surfers' adventures, SurfCircle is your go-to platform. Dive in and connect with surfers worldwide. It’s up to you how you ride the wave with us!</p>
        <Link to='/search' className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'>Check it out</Link>
      </div>
      <div className='p-3 bg-gray-300 dark:bg-slate-700'>
        <CallToAction></CallToAction>
      </div>
      <div className='flex flex-wrap mt-5 py-7 justify-center'>
        {
          posts && posts.length > 0 &&(
            <div className='flex flex-col gap-6 '>
              <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
              <div className='flex flex-wrap gap-4 justify-center'>
                {posts.map((post)=> (
                  <PostCard key={post._id} post={post}/>
                ))}
              </div>
              <Link to='/search' className='text-lg text-teal-500 text-center hover:underline'>View all posts</Link>
            </div>
          )
        }
      </div>
    </div>
  )
}
