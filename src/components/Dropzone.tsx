import { ChangeEvent, useState, useCallback, DragEvent } from 'react'

interface DropzoneProps {
  classNames?: string
  imageClassnames?: string
  onChange?: (file: File | null) => void
}

const Dropzone: React.FC<DropzoneProps> = ({ classNames, onChange }) => {
  const [isValidImage, setIsValidImage] = useState(true)

  const validateImage = (file: File) => {
    return file.type.startsWith('image/')
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (!validateImage(file)) {
      setIsValidImage(false)
      return
    }
    setIsValidImage(true)
    if (onChange) {
      onChange(file)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (!validateImage(selectedFile)) {
        setIsValidImage(false)
        return
      }
      setIsValidImage(true)
      if (onChange) {
        onChange(selectedFile)
      }
    }
  }

  const dropZonePreventDefault = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }, [])

  return (
    <div className={`rounded-lg border-2 border-dashed hover:bg-bg-dark ${classNames}`} onDrop={handleDrop} onDragOver={dropZonePreventDefault}>
      <label htmlFor="dropzone-file" className="flex h-full cursor-pointer flex-col items-center justify-center">
        {!isValidImage && <p className="text-red-500">Please upload a valid image file.</p>}
        <div className="text-center">
          <p>Drag and drop an image here</p>
        </div>

        <input id="dropzone-file" type="file" accept="image/*" className="hidden" onChange={handleChange} />
      </label>
    </div>
  )
}

export default Dropzone
