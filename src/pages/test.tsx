import React, { useCallback, useState } from 'react'

import axios from 'axios'

import { Button } from '@components/Button'
import Dropzone from '@components/Dropzone'
import Checkbox from '@components/Form/Checkbox'
import CrossIcon from '@components/Icon/CrossIcon'
import { LabelImage } from '@services/Object/Gemini'
import { Labels, ModelResult } from '@services/Object/ImageBlob'
import { usePromptTemplate } from '@hooks/usePromptTemplate'
import useImageUploader from '@hooks/useImageUploader'

type hashtag = {
  acc: number
  hashtag: string
}

const ImageUpload: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [imageRes, setImageRes] = useState<ModelResult>({ data: [] })
  const [labels, setLabels] = useState<Labels[]>([])
  const [uploadedUrl, setUploadedUrl] = useState<string>('')
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([])
  const {
    uploadImage,
    loading: isLoading,
    response,
    error,
  } = useImageUploader({
    timeout: 30000,
  })

  const { ImageAspectRatios } = usePromptTemplate()
  const toggleCheckbox = useCallback(
    (hashtag: string) => {
      setSelectedHashtags((prevSelected) =>
        prevSelected.includes(hashtag) ? prevSelected.filter((tag) => tag !== hashtag) : [...prevSelected, hashtag]
      )
    },
    [setSelectedHashtags]
  )
  const handleFileChange = (file: File | null) => {
    setFile(file)
  }

  const clearAll = useCallback(() => {
    setSelectedHashtags([])
  }, [])

  const selectAll = useCallback(() => {
    setSelectedHashtags(imageRes?.data?.map((tag) => tag.hashtag))
  }, [imageRes])

  const copyToClipboard = useCallback(async () => {
    const copiedHashtags = selectedHashtags.join(' ')
    await navigator.clipboard.writeText(copiedHashtags)
    window.alert('Copied to clipboard!')
  }, [selectedHashtags])

  const handleClose = useCallback(() => {
    setFile(null)
    setLabels([])
    setImageRes({ data: [] })
    setSelectedHashtags([])
    setUploadedUrl('')
  }, [])

  const getHashtag = useCallback(async (input: string): Promise<ModelResult> => {
    try {
      const response = await axios.get('/api/blob', {
        headers: {
          Cookie: document.cookie,
        },
        params: { input },
        timeout: 30000,
      })
      return response.data
    } catch (error) {
      console.error('Error in fetching hashtags:', error)
      throw new Error('Error in fetching hashtags: ' + error)
    }
  }, [])

  const handlerRetryLabelImage = useCallback(async () => {
    try {
      if (!uploadedUrl) {
        window.alert('No image uploaded.')
        return
      }
      setLoading(true)
      const labels = await LabelImage(uploadedUrl)
      setLabels(labels)
    } catch (error) {
      console.error('Error in fetching labels:', error)
      window.alert(error)
    } finally {
      setLoading(false)
    }
  }, [uploadedUrl])

  const handleRetryRecommendation = useCallback(async () => {
    try {
      if (!labels) {
        window.alert('No labels detected.')
        return
      }
      setLoading(true)
      const labelsJoined = labels.map((e) => e).join(', ')
      const hashtagRes = await getHashtag(labelsJoined)
      setImageRes(hashtagRes)
    } catch (error) {
      console.error('Error in upload or fetching hashtags:', error)
      window.alert(error)
    } finally {
      setLoading(false)
    }
  }, [labels, getHashtag])

  const handleUpload = useCallback(async () => {
    if (!file) {
      window.alert('No file selected.')
      return
    }
    await uploadImage(file)
    response && setUploadedUrl(response.path)
    if (error) {
      console.error('Error in upload or fetching hashtags:', error)
      window.alert(error)
      setLabels([])
    }
  }, [file, uploadImage, response, error])

  const AspectRatioSelection = useCallback(() => {
    if (!ImageAspectRatios) return null
    const options = Object.entries(ImageAspectRatios).map(([key, value]) => {
      return (
        <div className="flex flex-col items-center justify-center rounded-xl" key={key}>
          <div
            className="bg-[#D9D9D9] shadow-2xl"
            style={{
              aspectRatio: `${value.width} / ${value.height}`,
              width: `${value.width === 9 && value.height === 16 ? '70%' : '100%'}`,
            }}
          >
            <div>{value.label}</div>
          </div>
        </div>
      )
    })
    return options
  }, [ImageAspectRatios])

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1>Image Upload (mvp for internal use only)</h1>
      <div className="flex h-64 w-full justify-center ">
        {file ? (
          <div className="relative flex h-full w-auto justify-center bg-bg-dark">
            <img src={URL.createObjectURL(file)} alt="Dropped Image" className="object-fit h-auto rounded-lg" />
            <button className="absolute right-2 top-2 rounded-full bg-accent1-500 p-1 text-white" onClick={handleClose}>
              <CrossIcon />
            </button>
          </div>
        ) : (
          <Dropzone onFileChange={handleFileChange} className="w-full" />
        )}
      </div>
      <div className="flex items-center gap-6 p-4">
        <Button.Primary onClick={handleUpload} loading={isLoading}>
          {!labels?.length ? 'Upload' : 'Re-Upload'}
        </Button.Primary>
        <Button.Primary onClick={handlerRetryLabelImage} loading={loading} disabled={!uploadedUrl}>
          {!labels?.length ? 'Annotate' : 'Re-Annotate'}
        </Button.Primary>
        <Button.Primary onClick={handleRetryRecommendation} loading={loading} disabled={!labels?.length}>
          {!labels?.length ? 'Get Keywords' : 'Get Keywords With Labels...'}
        </Button.Primary>
      </div>
      <>{AspectRatioSelection()}</>

      <div className="mb-4 flex flex-col">
        <h4>Images Uploaded</h4>
        <>{uploadedUrl}</>
        <h4>Labels detected</h4>
        {labels?.map((e) => (
          <>{e} &#8203; </>
        ))}
        {labels?.length === 0 && <p>No labels detected</p>}
      </div>
      <div className="flex flex-col items-center md:flex-row">
        {file && (
          <div className="relative hidden h-72 w-auto justify-center bg-bg-dark md:flex">
            <img src={URL.createObjectURL(file)} alt="Dropped Image" className="object-fit h-auto rounded-lg" />
          </div>
        )}
        <div className="m-4 flex flex-col gap-4">
          <h4>Image-Keywords Model (mvp for internal use only)</h4>
          <h4>
            {selectedHashtags.length}/{imageRes?.data?.length} Selected Hashtag
          </h4>
          <div className="flex flex-row gap-4">
            <Button.Outline sizes={['s', 'l', 'l']} className="w-fit" onClick={clearAll}>
              Clear All
            </Button.Outline>
            <Button.Primary sizes={['s', 'l', 'l']} className="w-fit" onClick={selectAll}>
              Select All
            </Button.Primary>
            <Button.Primary sizes={['s', 'l', 'l']} className="w-fit" onClick={copyToClipboard}>
              Copy Selected
            </Button.Primary>
          </div>
          <div className="grid grid-cols-3 gap-1 md:grid-cols-4 md:gap-4">
            {imageRes?.data?.map((e: hashtag, index: number) => (
              <li key={e.hashtag + index} className="flex items-center" onClick={() => toggleCheckbox(e.hashtag)}>
                <Checkbox id={index + `checkbox-${e.hashtag}`} checked={selectedHashtags.includes(e.hashtag)} />
                <div className="block">{e.hashtag} &#8203;</div>
              </li>
            ))}
          </div>
          <textarea className="min-h-48 w-full" placeholder={imageRes?.data?.map((e) => e.hashtag).join(' ')}></textarea>
        </div>
      </div>
    </div>
  )
}

export default ImageUpload
