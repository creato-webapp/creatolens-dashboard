import React, { useCallback, useRef, useState, useMemo } from 'react'
import Primary from '@components/Button/Primary'
import { ImageDetailsType } from '@context/ImageToHashtagContext'
import ImageUpload from '../ImageUpload'
import useImageUploader from '@hooks/useImageUploader'
import { imageToBase64 } from '@services/util'
import { useImageHashtagContext } from '@hooks/UseImagetoHashtag'

const Step1 = () => {
  const [uploading, setUploading] = useState<boolean>(false)
  const [uploadedImage, setUploadedImage] = useState<File | null>(null)
  const [imageDetails, setImageDetails] = useState<ImageDetailsType>({})
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const { uploadImage, error } = useImageUploader({ timeout: 30000 })
  const { addImage, goForward } = useImageHashtagContext()

  const onClickButton = useCallback(async () => {
    if (!uploadedImage || !imageDetails.format || !imageDetails.path) return

    setUploading(true)
    try {
      const imageString = await imageToBase64(uploadedImage)
      if (!imageString) throw new Error('Failed to convert image to base64')

      const uploadResponse = await uploadImage(uploadedImage)
      if (!uploadResponse?.data) throw new Error('Upload response is missing data')

      addImage(uploadResponse.data, [])
      goForward()
    } catch (e) {
      console.error('Error uploading image:', e)
    } finally {
      setUploading(false)
    }
  }, [addImage, goForward, imageDetails.format, imageDetails.path, uploadImage, uploadedImage])

  const triggerFileInput = useCallback(() => fileInputRef.current?.click(), [])

  const fileSizeInMB = useMemo(() => (imageDetails.size ? (imageDetails.size / (1024 * 1024)).toFixed(2) : null), [imageDetails.size])

  return (
    <div className="flex flex-col gap-3 rounded-2xl">
      <div className="w-full">
        <h2 className="font-extrabold md:block">Image Upload</h2>
        <h4 className="my-4 text-text-secondary">
          Drag and drop or{' '}
          <span className="cursor-pointer text-accent2-500 underline underline-offset-2" onClick={triggerFileInput}>
            browse
          </span>{' '}
          your files
        </h4>
        <div className="flex flex-col items-center justify-center">
          <div className="mt-4 h-full w-full items-center md:mt-0">
            <ImageUpload uploadedImage={uploadedImage} setUploadedImage={setUploadedImage} setImageDetails={setImageDetails} ref={fileInputRef} />
          </div>
          <div className="flex w-full flex-col justify-center gap-4 md:w-1/2">
            <div className="flex flex-row flex-wrap items-center gap-x-4">
              <h3 className="text-text-secondary">{imageDetails.path}</h3>
              {fileSizeInMB && <h3 className="text-disabled">File size: {fileSizeInMB} MB</h3>}
            </div>
            <Primary disabled={uploading} sizes={['m', 'm', 'm']} onClick={onClickButton}>
              Annotate
            </Primary>
            {error && <div>{error.message}</div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Step1)
