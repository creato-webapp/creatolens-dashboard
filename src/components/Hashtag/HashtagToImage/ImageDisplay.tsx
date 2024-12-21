import { Status } from '@context/DialogueContext'
import { useDialogues } from '@hooks/useDialogues'
import { MoreHorizontalIcon } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'

interface IImageDisplay {
  imageUrl: string | null
  isLoading?: boolean
}
const ImageDisplay = (props: IImageDisplay) => {
  const { imageUrl } = props
  const [imageBlob, setImageBlob] = useState<Blob | null>(null)
  const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false)
  const { addDialogue } = useDialogues()

  const onClickMore = () => {
    setIsDropDownOpen((pre) => {
      return !pre
    })
  }

  useEffect(() => {
    const fetchImageBlob = async () => {
      if (imageUrl) {
        try {
          const response = await fetch(imageUrl)
          const blob = await response.blob()
          setImageBlob(blob)
        } catch (error) {
          console.error('Failed to fetch image blob:', error)
        }
      }
    }
    fetchImageBlob()
  }, [])

  const DropDownOptions = () => {
    const { t } = useTranslation('hashtag')

    const downloadBlob = (blob: Blob, fileName: string) => {
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob) // Create a temporary URL for the Blob
      link.href = url
      link.download = fileName // Set the file name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url) // Release the object URL to free up memory
    }

    const onClickCopy = async () => {
      try {
        if (!imageBlob) {
          addDialogue(t('copy_failure'), Status.FAILED)
          return
        }
        const clipboardItem = new ClipboardItem({ [imageBlob.type]: imageBlob })
        await navigator.clipboard.write([clipboardItem])
        addDialogue(t('copy_success'), Status.SUCCESS)
      } catch (error) {
        addDialogue(t('copy_failure'), Status.FAILED)
      }
    }

    const onClickDownload = () => {
      if (!imageBlob) {
        addDialogue(t('copy_failure'), Status.FAILED)
        return
      }
      downloadBlob(imageBlob, '2tag-generated-image.jpg')
      onClickMore()
    }

    return (
      <div className="absolute right-2 top-2 z-10 flex w-[170px] flex-col items-start  rounded-md bg-white p-2 shadow-md">
        <div onClick={onClickCopy} className="cursor-pointer p-2 hover:bg-neutral-200">
          {t('copy_image_url')}
        </div>
        <div onClick={onClickDownload} className="cursor-pointer p-2 hover:bg-neutral-200">
          {t('download_image')}
        </div>
      </div>
    )
  }

  if (imageUrl) {
    return (
      <div className="relative flex w-full items-center justify-center">
        <Image src={imageUrl} alt="Generated Image" width={0} height={0} sizes="100vw" className="h-full w-full rounded-lg md:max-w-[400px]" />
        <div
          className="absolute right-2 top-2 flex aspect-square cursor-pointer items-center justify-center rounded-full bg-neutral-400 p-3 hover:bg-neutral-500"
          onClick={onClickMore}
        >
          <MoreHorizontalIcon color="white" />
        </div>
        {isDropDownOpen ? (
          <div className="absolute right-2 top-10">
            <DropDownOptions />
          </div>
        ) : (
          ''
        )}
      </div>
    )
  }
  return null
}

export default ImageDisplay
