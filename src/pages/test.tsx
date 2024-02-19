import React, { useState, ChangeEvent } from 'react'
import { uploadImage, Labels, ImageRecord, ImageResponse } from '@services/Object/ImageBlob'
import { Button } from '@components/Button'
import Dropzone from '@components/Dropzone'
import CrossIcon from '@components/Icon/CrossIcon'

type hashtag = {
  acc: number
  hashtag: string
}

const ImageUpload: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [imageRes, setImageRes] = useState<ImageResponse>({ labels: [], data: [], firstTwo: [], middleTwo: [], lastTwo: [], error: null })

  const handleFileChange = (file: File | null) => {
    setFile(file)
  }

  const handleUpload = async () => {
    if (file === null) {
      window.alert('No file selected.')
      return
    }
    try {
      setLoading(true)
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
        maxBodyLength: 8 * 1024 * 1024,
        maxContentLength: 8 * 1024 * 1024,
      })
      setImageRes(res)
      if (res.error) {
        window.alert(res.error.message)
      }
      return res
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1>Image Upload</h1>
      <div className="flex h-64 w-full justify-center ">
        {file ? (
          <div className="relative flex h-full w-auto justify-center bg-bg-dark">
            <img src={URL.createObjectURL(file)} alt="Dropped Image" className="object-fit h-auto rounded-lg" />
            <button className="absolute top-2 right-2 rounded-full bg-accent1-500 p-1 text-white" onClick={() => setFile(null)}>
              <CrossIcon />
            </button>
          </div>
        ) : (
          <Dropzone onChange={handleFileChange} classNames="w-full" />
        )}
      </div>
      <Button.Primary onClick={handleUpload} loading={loading}>
        Upload
      </Button.Primary>
      <div className="mb-4 flex flex-col">
        <h4>Labels detected</h4>
        {imageRes?.labels?.map((e) => (
          <>{e.description} &#8203; </>
        ))}
        {imageRes?.labels?.length === 0 && <p>No labels detected</p>}
      </div>
      <div className="flex flex-row">
        <div className="m-4 flex flex-col">
          <h4>Hashet Model with First Two Labels</h4>
          <div className="grid  grid-cols-4 gap-4">
            {imageRes?.firstTwo?.map((e: hashtag, index) => (
              <li key={e.hashtag + index}>{e.hashtag} &#8203; </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageUpload
