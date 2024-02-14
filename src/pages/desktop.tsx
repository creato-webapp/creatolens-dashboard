import React from 'react'
import type { NextPage } from 'next'

const Desktop: NextPage = () => {
  return (
    <div className="relative h-96 w-96 bg-white">
      <div className="absolute left-[81px] top-[424px] inline-flex items-end justify-start gap-7">
        <img alt="Creato Lens" className="h-56 w-96" src="https://via.placeholder.com/361x227" />
        <div className="w-96 self-stretch text-8xl font-extrabold leading-10 tracking-widest text-accent1-500">Creato Lens</div>
      </div>
      <div className="absolute left-[953px] top-[363px] inline-flex flex-col items-center justify-start gap-6 rounded bg-neutral-50 px-9 py-16 shadow">
        <div className="text-3xl font-bold leading-10 text-neutral-800">Let’s get started</div>
        <div className="flex flex-col items-start justify-start gap-2.5 p-2.5">
          <div className="rounded--md inline-flex items-center justify-center gap-2 bg-blue-600 py-0.5">
            <div className="relative h-11 w-11">
              <div className="bg-error-50 absolute left-[-1px] top-[-1px] h-px w-px">
                <div className="absolute left-[4px] top-[4px] h-10 w-10"></div>
                <div className="absolute left-[15px] top-[15px] h-4 w-4"></div>
              </div>
            </div>
            <div className="flex items-start justify-start gap-2.5 px-6 py-0.5">
              <div className="text-error-50 text-lg font-medium leading-loose">Continue with Google</div>
            </div>
          </div>
        </div>
        <div className="inline-flex items-start justify-start gap-2.5 p-2.5">
          <div className="w-64 text-center text-sm font-normal leading-none tracking-tight text-neutral-800">
            By signing up, you agree to our terms and privacy policy.
          </div>
        </div>
      </div>
    </div>
  )
}

export default Desktop
