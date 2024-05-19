import { Button } from "flowbite-react"

export default function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
        <div className='flex flex-col flex-1 justify-center'>
            <h2 className="text-2xl">
                Having a good time logging your surf sessions?
            </h2>
            <p className="text-gray-500 my-2">Consider buying me a beer, or use this space to adverise your business!</p>
            <Button gradientDuoTone='purpleToPink' className="rounded-tl-xl rounded-bl-none">
                <a href='' target='_blank'>Get in touch</a>  
            </Button>
        </div>
        <div className='p-7 flex-1'>
            <img src='https://images.unsplash.com/photo-1496449903678-68ddcb189a24?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='get your ad posted here!'></img>
        </div>
    </div>
  )
}
