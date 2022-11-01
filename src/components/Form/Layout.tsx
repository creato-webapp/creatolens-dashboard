import React, { FC } from 'react'
import { FormLayoutProps } from './interface'

const Layout: FC<FormLayoutProps> = (props: FormLayoutProps) => {
  return (
    <div className="form-container">
      <div className="px-6 text-gray-900 antialiased">
        <div className="mx-auto max-w-xl divide-y py-12 md:max-w-4xl">
          <div className="py-8">
            <h1 className="text-4xl font-bold">@tailwindcss/forms examples</h1>
            <p className="mt-2 text-lg text-gray-600">
              An opinionated form reset designed to make form elements easy to
              style with utility classNames.
            </p>
            <div className="mt-4 flex space-x-4">
              <a
                className="text-lg underline"
                href="https://github.com/tailwindlabs/tailwindcss-forms"
              >
                Documentation
              </a>
              <a className="text-lg underline" href="/kitchen-sink.html">
                Kitchen Sink
              </a>
            </div>
          </div>

          <div className="py-12">
            <h2 className="text-2xl font-bold">Simple</h2>
            <div className="mt-8 max-w-md">
              <div className="grid grid-cols-1 gap-6">{props.children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout
