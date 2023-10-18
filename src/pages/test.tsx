import React, { useState, ChangeEvent } from 'react'
import axios from 'axios'
import { uploadImage } from '@services/Object/ImageBlob'
import { imageToBase64 } from '../services/util'
const ImageUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null)
  const [labels, setLabels] = useState([])

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
      {labels.map((e) => (
        <>{e.description}</>
      ))}
    </div>
  )
}

export default ImageUpload
