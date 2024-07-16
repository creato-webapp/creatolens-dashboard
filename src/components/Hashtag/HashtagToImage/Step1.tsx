import { useState } from 'react'

import Outline from '@components/Button/Outline'
import Primary from '@components/Button/Primary'
import { useHashtagImageContext } from '@context/HashtagToImageContext'

const Step1 = () => {
  const { goForward, addKeywords } = useHashtagImageContext()
  const [text, setText] = useState<string>('')

  const gotoNextStep = () => {
    addKeywords(text)
    goForward()
    return null
  }

  return (
    <>
      <h2 className="font-extrabold">Keywords input</h2>
      <div className="mt-4 flex items-center justify-center">
        <Outline sizes={['l', 'l', 'l']}>+ Get Keywords from Image</Outline>
      </div>
      <div className="my-4 border-b"></div>
      <h3 className="font-semibold text-text-primary">Describe the image you want and we’ll generate image for you.</h3>
      <textarea
        className="mt-4 min-h-96 w-full border border-black p-5 text-text-disabled ring-0  focus:border-accent1-500 focus:ring-accent1-500"
        placeholder="Input your own keyword"
        value={text}
        onChange={(e) => setText(e.target.value)} // ... and update the state variable on any edits!
      />

      <div className="mt-4 flex items-center justify-center">
        <Primary onClick={gotoNextStep} sizes={['l', 'l', 'l']}>
          Next
        </Primary>
      </div>
    </>
  )
}

export default Step1
