import { Button } from "flowbite-react"

export default function CallToAction() {
  return (
    <div className='max-h-96 flex flex-col sm:flex-row p-3 border border-emerald-600 justify-evenly items-center rounded-tl-3xl rounded-br-3xl text-center'>
        <div className='flex flex-col justify-center'>
            <h2 className="text-2xl">
                Looking to grow your business?
            </h2>
            <p className="text-gray-500 my-2">You can support SurfCircle and reach out to hundreds of users and visitors by using this space!</p>
            <a  className='w-full' href='https://byronmccormick.netlify.app' target='_blank'>
                <Button gradientDuoTone='greenToBlue' className="w-full mt-2 rounded-tl-xl rounded-bl-none">
                    Get in touch
                </Button>
            </a>
        </div>
        <div className='p-5'>
            <img className='max-h-32 rounded sm:max-h-72' src='https://tii.imgix.net/production/articles/9157/a26be84f-ae20-41b1-8057-646ffd2af41e.jpg?auto=compress&fit=crop&auto=format' alt='get your ad posted here!'></img>
        </div>
    </div>
  )
}
