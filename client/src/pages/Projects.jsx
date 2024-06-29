import CallToAction from '../components/CallToAction'

export default function Projects() {
  return (
    <div className='min-h-screen max-w-2xl mx-auto flex flex-col justify-center items-center gap-6 p-3'>
        <h1 className='text-3xl lg:text-6xl font-semibold text-center'>Thanks for the support!</h1>
        <p className='text-md text-center text-gray-500'>At this time, we’re not seeking donations. The best way you can support us is by spreading the word! Tell your friends to join and start using SurfCircle.</p>
        <CallToAction/>
    </div>
  )
}
