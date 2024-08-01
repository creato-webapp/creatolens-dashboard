import React, { useState, useCallback, useMemo } from 'react'

import Outline from '@components/Button/Outline'
import Primary from '@components/Button/Primary'
import { useHashtagToImage } from '@hooks/useHashtagToImage'

const Step1 = () => {
  const { goForward, addKeywords } = useHashtagToImage()
  const [text, setText] = useState<string>('')

  const gotoNextStep = useCallback(() => {
    addKeywords(text)
    goForward()
  }, [addKeywords, goForward, text])

  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }, [])

  const isNextDisabled = useMemo(() => text.trim().length === 0, [text])

  return (
    <>
      <h2 className="font-extrabold">Keywords input</h2>
      <div className="mt-4 flex items-center justify-center">
        <Outline sizes={['l', 'l', 'l']}>+ Get Keywords from Image</Outline>
      </div>
      <div className="my-4 border-b" />
      <h3 className="font-semibold text-text-primary">Describe the image you want and we&apos;ll generate image for you.</h3>
      <textarea
        className="mt-4 min-h-96 w-full border border-black p-5 ring-0 focus:border-accent1-500 focus:ring-accent1-500"
        placeholder="Input your own keyword"
        value={text}
        onChange={handleTextChange}
      />
      <div className="mt-4 flex items-center justify-center">
        <Primary onClick={gotoNextStep} sizes={['l', 'l', 'l']} disabled={isNextDisabled}>
          Next
        </Primary>
      </div>
    </>
  )
}

export default React.memo(Step1)
