import NeutralButton from '@components/Button/Neutral'
import PrimaryButton from '@components/Button/Primary'
import Dropdown from '@components/Form/Dropdown/Dropdown'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@components/ui/Dialog'
import { Status } from '@context/DialogueContext'
import { useDialogues } from '@hooks/useDialogues'
import { HistoryRow } from '@services/HistoryHelper'
import { Row } from '@tanstack/react-table'
import { convertGcsUriToHttp } from '@utils/index'
import { Trash2Icon } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

const DetailsDialog = (props: { open: boolean; setOpen: (id: boolean) => void; data: Row<HistoryRow>; onClose: () => void }) => {
  const { open, setOpen, data, onClose } = props
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([])
  const [selectedLabels, setSelectedLabels] = useState<string[]>([])
  const { addDialogue } = useDialogues()
  const handleClose = () => {
    setOpen(false)
    onClose()
  }

  const onLabelSelect = (value: string | number) => {
    if (selectedLabels.includes(value as string)) {
      setSelectedLabels(selectedLabels.filter((label) => label !== value))
    } else {
      setSelectedLabels([...selectedLabels, value as string])
    }
  }

  const onHashtagSelect = (value: string | number) => {
    if (selectedHashtags.includes(value as string)) {
      setSelectedHashtags(selectedHashtags.filter((hashtag) => hashtag !== value))
    } else {
      setSelectedHashtags([...selectedHashtags, value as string])
    }
  }

  const onClickCopySelectedHashtags = () => {
    const selected = data.original.hashtags.flatMap((hashtag) => hashtag.hashtag)
    navigator.clipboard.writeText(selected.join(' '))
    addDialogue('Hashtags Copied Successfully', Status.SUCCESS)
  }

  const onClickCopySelectedLabels = () => {
    const selected = data.original.labels.join(' ')
    navigator.clipboard.writeText(selected)
    addDialogue('Labels Copied Successfully', Status.SUCCESS)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="h-[700px] w-full max-w-5xl overflow-hidden p-4 sm:p-8" showOverlay={false}>
        <div className="h-full max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">{data.id}</DialogTitle>
          </DialogHeader>
          <DialogDescription>{data.getValue('favourite')}</DialogDescription>
          <div className="flex w-full flex-col gap-4 bg-white">
            <div>Image Uploaded: {data.original.updated_at}</div>
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="relative flex min-h-[300px] w-full flex-1 bg-neutral-200 sm:h-[400px]">
                <Image
                  src={convertGcsUriToHttp(data.original.uploaded_image)}
                  alt="Output"
                  fill
                  style={{ objectFit: 'contain' }}
                  className="rounded-md"
                />
              </div>
              <div className="flex flex-1 flex-col items-center justify-between gap-4">
                <div className="w-full">
                  <div className="font-semibold text-secondary-500">{data.original.labels.length} Labels discovered</div>{' '}
                  <div>
                    <Dropdown
                      dropDownSizes={['l', 'l', 'l']}
                      key="label-dropdown"
                      name="Label"
                      options={data.original.labels.map((label) => ({
                        value: label,
                        label,
                        checked: selectedLabels.includes(label),
                      }))}
                      isCheckbox
                      onValueChange={onLabelSelect}
                    />
                  </div>
                </div>
                <PrimaryButton className="w-full" onClick={onClickCopySelectedLabels}>
                  Copy Selected Labels
                </PrimaryButton>
              </div>
              <div className="flex flex-1 flex-col items-center justify-between gap-4">
                <div className="w-full">
                  <div className="font-semibold text-secondary-500">{data.original.hashtags.length} Hashtags discovered</div>
                  <div className="w-full">
                    <Dropdown
                      dropDownSizes={['l', 'l', 'l']}
                      key="hashtags-dropdown"
                      name="Hashtags"
                      options={data.original.hashtags.map((hashtag) => ({
                        value: hashtag.hashtag,
                        label: hashtag.hashtag,
                        checked: selectedHashtags.includes(hashtag.hashtag),
                      }))}
                      isCheckbox
                      isDefaultOpen={true}
                      onValueChange={onHashtagSelect}
                    />
                  </div>
                </div>
                <PrimaryButton className="w-full" onClick={onClickCopySelectedHashtags}>
                  Copy Selected Hashtags
                </PrimaryButton>
              </div>
            </div>
          </div>
          <div className="mt-12 flex flex-row justify-center gap-4">
            <DialogClose asChild>
              <NeutralButton onClick={() => handleClose()}>Close</NeutralButton>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const DeleteConfirmationDialog = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <button className="btn-secondary">
          <Trash2Icon className="stroke-red-500" />
        </button>
      </DialogTrigger>
      <DialogContent className="w-72 p-8">
        <DialogHeader>
          <DialogTitle className="text-red-600">History Deleting</DialogTitle>
        </DialogHeader>
        <DialogDescription>Are you sure you want to delete this result?</DialogDescription>
        <div className="flex flex-row justify-center gap-4">
          <DialogClose asChild>
            <NeutralButton>Cancel</NeutralButton>
          </DialogClose>
          <PrimaryButton>Delete</PrimaryButton>
        </div>
      </DialogContent>
    </Dialog>
  )
}
export { DetailsDialog, DeleteConfirmationDialog }
