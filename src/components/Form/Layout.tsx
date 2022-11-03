import React, { FC } from 'react'
import { Button } from '../Button'
import { FormLayoutProps } from './interface'

const Layout: FC<FormLayoutProps> = (props: FormLayoutProps) => {
  const { Header, subHeader, loading, onSubmit } = props
  return (
    <div className="form-container">
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="px-6 text-gray-900 antialiased">
          <div className="mx-auto max-w-xl divide-y py-12 md:max-w-4xl">
            <div className="py-12">
              <h1 className="text-4xl font-bold">{Header}</h1>
              <h2 className="text-2xl font-bold">{subHeader}</h2>
              <div className="mt-8 max-w-md">
                <div className="grid grid-cols-1 gap-6">
                  {props.children}
                  <div className="ml-auto flex justify-end py-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-transparent py-2 px-4 text-blue-700 hover:text-blue-900"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Layout
