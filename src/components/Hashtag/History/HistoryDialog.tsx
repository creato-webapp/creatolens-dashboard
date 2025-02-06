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
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import React, { useCallback } from 'react'
import { useState } from 'react'
import { CategoryOption, Option } from '../ImageToHashtag/Step3'
import HashtagDropdown from '@components/common/HashtagDropdown'

const DetailsDialog = (props: { open: boolean; setOpen: (id: boolean) => void; data: Row<HistoryRow>; onClose: () => void }) => {
  const { open, setOpen, data, onClose } = props
  const [selectedLabels, setSelectedLabels] = useState<string[]>(data.original.labels)
  const { addDialogue } = useDialogues()
  const { t } = useTranslation('history')

  const [categorizedOptions, setCategorizedOptions] = useState<CategoryOption[]>([])

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

  const updateOptions = useCallback((updateFn: (opt: Option) => Option) => {
    setCategorizedOptions((prevOptions) =>
      prevOptions.map((category) => ({
        ...category,
        options: category.options.map(updateFn),
      }))
    )
  }, [])

  const onClickHashtag = useCallback(
    (value: string | number) => {
      updateOptions((opt) => {
        if (opt.value === value) {
          return { ...opt, checked: !opt.checked }
        }
        return opt
      })
    },
    [updateOptions]
  )

  const onClickCopySelectedHashtags = () => {
    const selected = categorizedOptions.flatMap((category) => category.options.filter((opt) => opt.checked).map((opt) => opt.label))

    navigator.clipboard.writeText(selected.join(' '))
    addDialogue('Hashtags Copied Successfully', Status.SUCCESS)
  }

  const onClickCopySelectedLabels = () => {
    const selected = selectedLabels.join(' ')
    navigator.clipboard.writeText(selected)
    addDialogue('Labels Copied Successfully', Status.SUCCESS)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="h-[700px] w-full max-w-5xl overflow-hidden p-4 sm:p-8" showOverlay={false}>
        <DialogHeader className="hidden">
          <DialogTitle>{data.original.uploaded_image.split('/').pop()}</DialogTitle>
        </DialogHeader>

        <div className="h-full max-h-[90vh] overflow-y-auto">
          <div className="flex w-full flex-col gap-4 bg-white">
            <div className="text-neutral-500">
              {t('history_uploaded_image')} {data.original.uploaded_image.split('/').pop()}
            </div>
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
                  <div className="mt-4">
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
                  {t('copy_selected_labels')}
                </PrimaryButton>
              </div>
              <div className="flex flex-1 flex-col items-center justify-between gap-4">
                <div className="w-full">
                  <div className="font-semibold text-secondary-500">{data.original.hashtags.length} Hashtags discovered</div>
                  <div className="mt-4">
                    {/* <Dropdown
                      dropDownSizes={['l', 'l', 'l']}
                      key="hashtags-dropdown"
                      name="Hashtags"
                      options={categorizedOptions}
                      isCheckbox
                      isDefaultOpen={true}
                      onValueChange={onHashtagSelect}
                    /> */}
                    <HashtagDropdown
                      hashtags={data.original.hashtags}
                      onHashtagSelect={onClickHashtag}
                      categorizedOptions={categorizedOptions}
                      setCategorizedOptions={setCategorizedOptions}
                    />
                  </div>
                </div>
                <PrimaryButton className="w-full" onClick={onClickCopySelectedHashtags}>
                  {t('copy_selected_hashtags')}
                </PrimaryButton>
              </div>
            </div>
          </div>
          <div className="mt-12 flex flex-row justify-center gap-4">
            <DialogClose asChild>
              <NeutralButton onClick={() => handleClose()}>{t('close')}</NeutralButton>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const DeleteConfirmationDialog = (props: { onConfirm: () => void }) => {
  const { t } = useTranslation('history')
  const { onConfirm } = props
  return (
    <Dialog>
      <DialogTrigger>
        <button className="btn-secondary">
          <Trash2Icon className="stroke-red-500" />
        </button>
      </DialogTrigger>
      <DialogContent className="w-72 p-8">
        <DialogHeader>
          <DialogTitle className="text-red-600">{t('history_deleting')}</DialogTitle>
        </DialogHeader>
        <DialogDescription>{t('history_deleting_description')}</DialogDescription>
        <div className="flex flex-row justify-center gap-4">
          <DialogClose asChild>
            <NeutralButton>{t('history_deleting_cancel')}</NeutralButton>
          </DialogClose>
          <PrimaryButton onClick={onConfirm}>{t('history_deleting_delete')}</PrimaryButton>
        </div>
      </DialogContent>
    </Dialog>
  )
}
export { DetailsDialog, DeleteConfirmationDialog }
