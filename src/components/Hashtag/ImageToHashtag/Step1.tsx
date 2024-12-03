import React, { useCallback, useRef, useMemo } from 'react'
import Primary from '@components/Button/Primary'
import ImageUpload from '../ImageUpload'
import useImageUploader from '@hooks/useImageUploader'
import { useImageHashtagContext } from '@hooks/UseImagetoHashtag'
import Neutral from '@components/Button/Neutral'
import RefreshIcon from '@components/Icon/RefreshIcon'
import CaretRightBoldIcon from '@components/Icon/CaretRightBoldIcon'

const Step1 = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const { error } = useImageUploader({ timeout: 30000 })
  const { addImage, goForward, image, clearImage } = useImageHashtagContext()

  const onClickButton = useCallback(async () => {
    try {
      if (!image.details) return
      goForward()
    } catch (e) {
      console.error('Error uploading image:', e)
    }
  }, [goForward, image.details])

  const triggerFileInput = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }, [])

  const fileSizeInMB = useMemo(() => (image.details.size ? (image.details.size / (1024 * 1024)).toFixed(2) : null), [image.details.size])

  return (
    <div className="flex h-full flex-col gap-3 rounded-2xl">
      <div className="h-full w-full">
        <h2 className="text-subheading md:block">Image Upload</h2>
        <h4 className="my-2 text-sm text-neutral-500">
          Drag and drop or{' '}
          <span className="cursor-pointer text-accent2-500 underline underline-offset-2" onClick={triggerFileInput}>
            browse
          </span>{' '}
          your files
        </h4>
        <div className="md:mt-0 md:px-4">
          <div className="w-full items-center">
            <ImageUpload clearImage={clearImage} uploadedImage={image.image} setUploadedImage={addImage} ref={fileInputRef} />
          </div>
          <div className="flex w-full flex-col justify-center gap-4 ">
            <div className="flex flex-row flex-wrap items-center gap-x-4 text-base text-neutral-500 md:max-h-96">
              {image.details?.path && (
                <em className="">
                  Image uploaded: {image.details.path}
                  {fileSizeInMB && ` File size: ${fileSizeInMB} MB`}
                </em>
              )}
            </div>

            <div className="flex flex-row justify-center gap-4">
              <Neutral disabled={image.details?.path === undefined} sizes={['m', 'm', 'm']} onClick={clearImage}>
                <RefreshIcon />
                <div className="text-base">Re-Upload</div>
              </Neutral>
              <Primary disabled={image.details?.path === undefined} className="w-28" sizes={['m', 'm', 'm']} onClick={onClickButton}>
                Next
                <CaretRightBoldIcon width={16} height={16} />
              </Primary>
            </div>
            {error && <div>{error.message}</div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Step1)
