import { forwardRef, useState } from 'react'

import { useDropzone } from 'react-dropzone'

import { ImageDetailsType } from '@context/ImageToHashtagContext'

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

        // const reader = new FileReader()
        // reader.onloadend = () => {
        //   setUploadedImage(reader.result as string)
        // }
        // reader.readAsDataURL(file)

        const reader = new FileReader()
        reader.onloadend = () => {
          setImagePreview(reader.result as string)
        }
        reader.readAsDataURL(file)

        const filePath = file.name || ''

        const fileFormat = file.type
        // Get the file extension
        const fileExtension = file.name.split('.').pop()
        // If you want to save the file path and format to state or props

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

  const clearFile = () => {
    setUploadedImage(null)
    setImagePreview(null)
    setImageDetails({})
  }

  return (
    <div
      {...getRootProps()}
      style={{
        border: uploadedImage ? '' : '2px dashed #d3d3d3',
        borderRadius: '10px',
        padding: uploadedImage ? '5px' : '40px',
        textAlign: 'center',
        backgroundColor: isDragActive ? '#f0f0f0' : uploadedImage ? '' : '#F5F5F6',
        color: '#445F6F',
        transition: 'background-color 0.2s ease-in-out',
        // marginBottom: '20px',
      }}
      className="flex h-full w-full items-center justify-center"
    >
      <input {...getInputProps()} ref={fileInputRef} />
      <div style={{ display: 'flex', width: '100%', flexDirection: 'column', alignItems: 'center' }}>
        {imagePreview ? (
          <div style={{ textAlign: 'center' }} className=" relative h-full w-full">
            <div className=" absolute right-5 top-5 flex h-12 w-12 cursor-pointer rounded-full bg-accent1-500 p-4 text-white" onClick={clearFile}>
              <div className="flex h-full w-full items-center justify-center">X</div>
            </div>
            <img
              src={imagePreview}
              alt="Uploaded"
              style={{ width: '100%', maxWidth: '100%', maxHeight: '400px', borderRadius: '10px', objectFit: 'contain' }}
            />
          </div>
        ) : (
          <>
            <img src="/file-input.png" alt="Upload Icon" style={{ width: '50px', marginBottom: '20px' }} />
            <h4>File format accepted PNG, JPG, JPEG</h4>
            <h4>Max. file size 5 MB</h4>
          </>
        )}
      </div>
    </div>
  )
})

export default ImageUpload
