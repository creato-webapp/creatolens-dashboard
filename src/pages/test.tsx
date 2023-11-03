import React, { useState, ChangeEvent } from 'react'
import { uploadImage, Labels, ImageRecord, ImageResponse } from '@services/Object/ImageBlob'

const ImageUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null)
  const [imageRes, setImageRes] = useState<ImageResponse>({ labels: [], data: [] })

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
      console.log(res)
      setImageRes(res)
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
      {file ? <img width="200" height="200" src={URL.createObjectURL(file)}></img> : null}
      <div className="flex flex-row">
        {imageRes.labels.map((e) => (
          <>{e.description} &#8203; </>
        ))}
      </div>
      <div className="flex">
        {imageRes.data.map((e, index) => (
          <div className="flex-row">
            {/* <div>
              {e.labels.map((e) => (
                <div className="ml-4">{e}</div>
              ))}
            </div> */}
            <div className="ml-4">
              {index}
              {e.target.map((e) => (
                <div>{e}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ImageUpload
