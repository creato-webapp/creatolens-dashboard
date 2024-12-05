import React from 'react'

import { useHashtagToImage } from '@hooks/useHashtagToImage'
import ImageAspectSelector from '../ImageGen/ImageAspect'
import ImageCategory from '../ImageGen/ImageCategory'
import ImageStyle from '../ImageGen/ImageStyle'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@components/ui/Dialog'
import PrimaryButton from '@components/Button/Primary'
import { ScrollArea, ScrollBar } from '@components/ui/ScrollArea'

export function EffectButton() {
  const { imageConfig, updateImageCategory } = useHashtagToImage()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex flex-row items-center">
          <button className=" hover:underline focus:outline-none"> Effect </button>
        </div>
      </DialogTrigger>
      <DialogContent className="h-4/5 max-w-128 py-4">
        <DialogHeader className="flex w-full flex-col">
          <div className="flex w-full flex-col items-center justify-center text-center">
            <DialogTitle>Effect List</DialogTitle>
          </div>
        </DialogHeader>
        <ScrollArea className="-px-6 mt-4 p-4 pb-8">
          <ImageCategory imageConfigStyles={imageConfig.imageStyle} setCategories={updateImageCategory} />
          <ScrollBar />
        </ScrollArea>

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <div className="flex w-full justify-end">
              <PrimaryButton>Confirm</PrimaryButton>
            </div>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const StyleSelection = () => {
  // const imageConfigSelect = useCallback(
  //   (key: string, value: string) => {
  //     updateImageConfig({ [key]: value })
  //   },
  //   [updateImageConfig]
  // )

  // const updateImageAspect = useCallback(
  //   (aspectRatio: string) => {
  //     imageConfigSelect('aspectRatio', aspectRatio)
  //   },
  //   [imageConfigSelect]
  // )

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2 md:flex-row">
        <div className="flex w-full flex-col gap-2">
          Type of image
          <ImageStyle />
        </div>
        <div className="flex w-full flex-col gap-2">
          Aspect ratio
          <ImageAspectSelector />
        </div>
        <EffectButton />
      </div>
    </div>
  )
}

export default React.memo(StyleSelection)
