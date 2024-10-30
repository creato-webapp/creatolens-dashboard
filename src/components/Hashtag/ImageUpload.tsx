import { forwardRef, useCallback, useEffect, useState } from 'react'

import { useDropzone } from 'react-dropzone'

import { ImageDetailsType } from '@context/ImageToHashtagContext'
import UploadIcon from '@components/Icon/UploadIcon'
interface IImageUpload {
  uploadedImage?: File | null
  setUploadedImage: (image: File | null) => void // Updated type
  setImageDetails: (arg: Partial<ImageDetailsType>) => void // Updated type
  onClickBrowse?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
}
const ImageUpload = forwardRef<HTMLInputElement, IImageUpload>((props, fileInputRef) => {
  const { uploadedImage, setUploadedImage, setImageDetails } = props
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/jpeg': ['.jpeg', '.png'],
    },
    onDrop: (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0]
        setUploadedImage(file)
        const reader = new FileReader()
        reader.onloadend = () => {
          setImagePreview(reader.result as string)
        }
        reader.readAsDataURL(file)

        const filePath = file.name || ''

        const fileFormat = file.type
        const fileExtension = file.name.split('.').pop()

        setImageDetails({
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
    setUploadedImage(null)
    setImagePreview(null)
    setImageDetails({})
  }, [setImageDetails, setUploadedImage])

  useEffect(() => {
    if (!uploadedImage) {
      clearFile()
    }
  }, [uploadedImage])

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
      {imagePreview ? (
        <div className="relative flex w-full flex-col items-center">
          <div className="absolute right-5 top-5 flex h-12 w-12 cursor-pointer rounded-full bg-primary-500 p-4 text-white" onClick={clearFile}>
            <div className="flex h-full w-full items-center justify-center">X</div>
          </div>
          <img
            src={imagePreview}
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
