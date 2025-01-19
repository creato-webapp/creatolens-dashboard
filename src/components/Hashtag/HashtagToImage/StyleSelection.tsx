import React from 'react'

import { useHashtagToImage } from '@hooks/useHashtagToImage'
import ImageAspectSelector from '../ImageGen/ImageAspect'
import ImageCategory from '../ImageGen/ImageCategory'
import ImageStyle from '../ImageGen/ImageStyle'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@components/ui/Dialog'
import PrimaryButton from '@components/Button/Primary'
import { ScrollArea, ScrollBar } from '@components/ui/ScrollArea'
import SliderIcon from '@components/Icon/SliderIcon'
import { ChevronDown } from 'lucide-react'
import { useTranslation } from 'next-i18next'

export function EffectButton() {
  const { t } = useTranslation(['hashtag', 'common'])
  const { imageConfig, updateImageCategory, imageCategory } = useHashtagToImage()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex flex-row items-center">
          <button className=" flex flex-row items-center gap-2 focus:outline-none">
            <SliderIcon />
            {t('effect')} <ChevronDown size={16} />
            {`(${Object.keys(imageCategory).length})`}
          </button>
        </div>
      </DialogTrigger>
      <DialogContent className="h-4/5 max-w-128 py-4">
        <DialogHeader className="flex w-full flex-col">
          <div className="flex w-full flex-col items-center justify-center text-center">
            <DialogTitle>{t('effect_list')}</DialogTitle>
          </div>
        </DialogHeader>
        <ScrollArea className="-px-6  p-4">
          <ImageCategory imageConfigStyles={imageConfig.imageStyle} setCategories={updateImageCategory} imageCategory={imageCategory} />
          <ScrollBar />
        </ScrollArea>

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <div className="flex h-fit w-full justify-end">
              <PrimaryButton>{t('confirm')}</PrimaryButton>
            </div>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const StyleSelection = () => {
  const { t } = useTranslation(['hashtag', 'common'])

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col flex-wrap gap-4 sm:flex-row">
        <div className="flex w-full flex-col gap-2 sm:w-[300px]">
          {t('type_of_image')}
          <ImageStyle />
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-[300px]">
          {t('aspect_ratio')}
          <ImageAspectSelector />
        </div>
        <EffectButton />
      </div>
    </div>
  )
}

export default React.memo(StyleSelection)
