import { forwardRef, useCallback, useEffect, useState } from 'react'

import { useDropzone } from 'react-dropzone'

import { ImageDetailsType } from '@context/ImageToHashtagContext'
import UploadIcon from '@components/Icon/UploadIcon'
import useImageUploader from '@hooks/useImageUploader'
interface IImageUpload {
  uploadedImage?: null | string
  clearImage?: () => void
  setUploadedImage: (arg: string, details: ImageDetailsType) => void
  onClickBrowse?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
}
const ImageUpload = forwardRef<HTMLInputElement, IImageUpload>((props, fileInputRef) => {
  const { uploadedImage, setUploadedImage, clearImage } = props
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const { uploadImage } = useImageUploader({ timeout: 30000 })

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/jpeg': ['.jpeg', '.png'],
    },
    onDrop: async (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0]
        const reader = new FileReader()
        reader.onloadend = () => {
          setImagePreview(reader.result as string)
        }
        reader.readAsDataURL(file)

        const filePath = file.name || ''

        const fileFormat = file.type
        const fileExtension = file.name.split('.').pop()

        const uploadResponse = await uploadImage(file)
        if (!uploadResponse?.data) throw new Error('Upload response is missing data')

        setUploadedImage(uploadResponse.data, {
          size: file.size,
          path: filePath,
          format: fileFormat,
          extension: fileExtension,
        })
      }
    },
    noClick: true,
  })

  const clearFile = useCallback(() => {
    if (fileInputRef && 'current' in fileInputRef && fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    clearImage && clearImage()
    setImagePreview(null)
  }, [clearImage, fileInputRef])

  useEffect(() => {
    if (!uploadedImage) {
      clearFile()
    }
  }, [clearFile, uploadedImage])

  return (
    <div
      {...getRootProps()}
      style={{
        border: uploadedImage ? '' : '',
        borderRadius: '0px',
        padding: uploadedImage ? '5px' : '40px',
        textAlign: 'center',
        alignItems: 'center',
        backgroundColor: isDragActive ? '#D9D9D9' : '#F5F6F6',
        color: '#445F6F',
        transition: 'background-color 0.2s ease-in-out',
        height: '100%',
      }}
      className="flex aspect-square w-auto cursor-pointer flex-col items-center justify-center md:aspect-auto md:min-h-96"
      onClick={() => {
        if (fileInputRef && 'current' in fileInputRef && fileInputRef.current) {
          fileInputRef.current.click()
        }
      }}
    >
      <input {...getInputProps()} ref={fileInputRef} />
      {uploadedImage || imagePreview ? (
        <div className="relative flex w-full flex-col items-center">
          <div
            className="absolute right-5 top-5 z-50 flex h-12 w-12 cursor-pointer rounded-full bg-primary-500 p-4 text-white"
            onClick={(e) => {
              e.stopPropagation()
              clearFile()
            }}
          >
            <div className="flex h-full w-full items-center justify-center">X</div>
          </div>
          <img
            src={uploadedImage ? uploadedImage : imagePreview || ''}
            draggable={false}
            alt="Uploaded"
            className="aspect-square md:max-h-96"
            style={{ width: '100%', maxWidth: '100%', borderRadius: '10px', objectFit: 'contain' }}
          />
        </div>
      ) : (
        <div className="flex w-full flex-col items-center">
          <UploadIcon className="" />
          <h4>File format accepted PNG, JPG, JPEG</h4>
          <h4>Max. file size 5 MB</h4>
        </div>
      )}
    </div>
  )
})

export default ImageUpload
