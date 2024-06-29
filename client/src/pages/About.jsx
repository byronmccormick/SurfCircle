import React from 'react'

export default function about() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-2xl mx-auto p-3 text-center'>
        <div>
          <h1 className='text-3xl lg:text-6xl font-semibold text-center my-7'>About SurfCirlce</h1>
          <div className=' text-md text-gray-500 flex flex-col gap-6'>
            <p>
            Welcome to SurfCircle, your digital diary for capturing and reflecting on every wave you’ve surfed. Created with a deep love for the ocean, SurfCircle lets you log your surf sessions, offering insights into your surfing adventures and the accuracy of surf forecasts. Whether you’re tracking your progress, noting memorable swells, or preserving the joy of beach days, SurfCircle helps you understand your surfing journey better.
            </p>
            <p>
            SurfCircle is also a community where surfers share their adventures and journals. Explore stories from surfers worldwide, find new surf spots, and draw inspiration from their experiences. By connecting through shared surf journals, you can pick up tips, build a network of fellow enthusiasts, and contribute to a rich collection of ocean tales that unite our love for the waves.
            </p>
            <p>
            As an evolving project driven by my passion for software development, SurfCircle is continually growing. I built this platform to enhance my skills, so you might notice some rough edges. With your support and feedback, I aim to improve SurfCircle and add new features, including advanced data processing for your surf locations. Your participation is key to shaping the future of SurfCircle. Let’s ride this wave together!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
