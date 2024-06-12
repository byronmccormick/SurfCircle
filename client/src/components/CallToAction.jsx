import { Button } from "flowbite-react"

export default function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
        <div className='flex flex-col flex-1 justify-center'>
            <h2 className="text-2xl">
                Looking to grow your business?
            </h2>
            <p className="text-gray-500 my-2">You can support SurfCircle and reach out to hundreds of users and visitors by using this space!</p>
            <Button gradientDuoTone='purpleToPink' className="rounded-tl-xl rounded-bl-none">
                <a href='mailto:byronjamesmccormick@gmail.com' target='_blank'>Get in touch</a>  
            </Button>
        </div>
        <div className='p-7 flex-1'>
            <img src='https://www.cidewalk.com/uploads/4/9/2/1/49215843/editor/dall-e-2023-11-10-14-47-17-a-black-and-white-image-depicting-a-highway-scene-the-focus-is-on-a-large-billboard-beside-the-highway-displaying-the-message-your-ad-here-in-bold_2.png?1705074084' alt='get your ad posted here!'></img>
        </div>
    </div>
  )
}
