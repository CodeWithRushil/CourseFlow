import { SignUp } from '@clerk/nextjs'
import Image from 'next/image'

export default function Page() {
  return (
    <>
      <div className="text-center">
        <div className="mt-5">
          <h3 className="text-gray-800 text-xl font-bold sm:text-xl">Create your account</h3>
        </div>
      </div>
      <div className="min-h-screen flex fle-col items-center justify-center">
        <div className="py-2 px-4">
          <div className="grid lg:grid-cols-2 items-center gap-6 max-w-6xl w-full">
            <div className="border border-slate-300 rounded-lg max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-lg:mx-auto">
              <SignUp />
            </div>
            <div className="max-lg:mt-8">
              {/* <Image
                src="https://readymadeui.com/login-image.webp"
                className="w-full aspect-[71/50] max-lg:w-4/5 mx-auto block object-cover"
                alt="login img" width={300} height={300}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}