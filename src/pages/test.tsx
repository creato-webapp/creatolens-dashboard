import React, { useState, ChangeEvent } from 'react'
import { uploadImage, Labels, ImageRecord } from '@services/Object/ImageBlob'

const ImageUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null)
  const [labels, setLabels] = useState<Array<ImageRecord>>([])

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const handleUpload = async () => {
    try {
      if (!file) {
        console.error('No file selected.')
        return
      }

      const res = await uploadImage(file, {
        headers: {
          processData: false,
          'Content-Type': false,
          cache: false,
        },
        maxBodyLength: 8000,
        maxContentLength: 8000,
      })
      setLabels(res)
      return res
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div>
      <h1>Image Upload</h1>
      <input type="file" onChange={handleFileChange} accept="image/*" />
      <button onClick={handleUpload}>Upload</button>
      <div className="flex">
        {labels.map((e) => (
          <div className="flex-row">
            {/* <div>
              {e.labels.map((e) => (
                <div className="ml-4">{e}</div>
              ))}
            </div> */}
            <div>
              {e.target.map((e) => (
                <div className="ml-4">{e}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ImageUpload
