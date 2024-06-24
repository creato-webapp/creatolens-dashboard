import { useRef } from 'react'

import { useDropzone } from 'react-dropzone'

import { ImageDetailsType } from 'src/context/ImageToHashtagContext'

interface IImageUpload {
  uploadedImage: string
  setUploadedImage: (image: string) => void // Updated type
  setImageDetails: (arg: Partial<ImageDetailsType>) => void // Updated type
}
const ImageUpload = (props: IImageUpload) => {
  const { uploadedImage, setUploadedImage, setImageDetails } = props
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleBrowseClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    fileInputRef.current?.click()
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/jpeg': ['.jpeg', '.png'],
    },
    onDrop: (acceptedFiles: Blob[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0]

        const reader = new FileReader()
        reader.onloadend = () => {
          setUploadedImage(reader.result as string)
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

  return (
    <div
      {...getRootProps()}
      style={{
        border: uploadedImage ? '' : '2px dashed #d3d3d3',
        borderRadius: '10px',
        padding: '40px',
        textAlign: 'center',
        backgroundColor: isDragActive ? '#f0f0f0' : uploadedImage ? '' : '#F5F5F6',
        color: '#445F6F',
        transition: 'background-color 0.2s ease-in-out',
        // marginBottom: '20px',
      }}
      className="flex aspect-square items-center justify-center"
    >
      <input {...getInputProps()} ref={fileInputRef} />
      <div style={{ display: 'flex', width: '100%', flexDirection: 'column', alignItems: 'center' }}>
        {uploadedImage ? (
          <div style={{ textAlign: 'center' }}>
            <img src={uploadedImage} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: 'auto', borderRadius: '10px' }} />
          </div>
        ) : (
          <img src="/file-input.png" alt="Upload Icon" style={{ width: '50px', marginBottom: '20px' }} />
        )}
        <h4>
          Drag and drop or{' '}
          <a className="text-accent2-500 underline underline-offset-2" href="#" onClick={handleBrowseClick}>
            browse
          </a>{' '}
          your files
        </h4>
      </div>
    </div>
  )
}

export default ImageUpload
