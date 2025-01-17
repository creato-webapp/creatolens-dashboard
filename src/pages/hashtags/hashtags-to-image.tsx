import { ReactElement, Suspense } from 'react'

import Keywordsinput from '@components/Hashtag/HashtagToImage/Keywordsinput'
import NegativePrompt from '@components/Hashtag/HashtagToImage/NegativePrompt'
import StyleSelection from '@components/Hashtag/HashtagToImage/StyleSelection'
import { Layout } from '@components/Layout'
import SideMenuLayout from '@components/Layout/SideMenuLayout'
import { Tabs, TabsContent } from '@components/ui/Tabs'
import { useTranslation } from 'next-i18next'
import PrimaryButton from '@components/Button/Primary'
import { useHashtagToImage } from '@hooks/useHashtagToImage'
import ImageDisplay from '@components/Hashtag/HashtagToImage/ImageDisplay'
import { Progress } from '@components/ui/Progress'
import { Skeleton } from '@components/ui/Skeleton'
import NeutralButton from '@components/Button/Neutral'
import RepeatIcon from '@components/Icon/RepeatIcon'
import { AlertTriangle, InfoIcon } from 'lucide-react'
import React from 'react'

import { getLocaleProps } from '@services/locale'
import { GetStaticPropsContext, GetServerSidePropsContext } from 'next'

export async function getStaticProps(context: { locale: GetStaticPropsContext | GetServerSidePropsContext }) {
  return await getLocaleProps(context.locale)
}

const HashtagToImage = () => {
  const { t } = useTranslation(['hashtag', 'common'])
  const { generateImageWithKeywords, generatedImageUri, isLoading, loadingIndicator, isImageGenerated, resetToDefault } = useHashtagToImage()

  const resetButtonOnClick = () => {
    resetToDefault()
  }

  const GenerationControls = React.memo(() => (
    <div className="mt-4 flex w-full flex-row items-center justify-center gap-2">
      <NeutralButton onClick={resetButtonOnClick}>{t('return')}</NeutralButton>
      <PrimaryButton onClick={generateImageWithKeywords}>
        <RepeatIcon />
        {t('regenerate')}
      </PrimaryButton>
    </div>
  ))

  return (
    <div className="mb-4 flex w-full flex-col justify-center gap-8 md:min-h-144">
      <div className="flex items-center justify-between">
        <h1 className="text-subtitle font-bold">{t('hashtags_to_image')}</h1>
        <div className="flex flex-row gap-2"></div>
      </div>
      <div className="flex w-full items-center justify-center">
        <div className="flex w-full flex-col">
          <Tabs defaultValue="keyword" className="flex flex-col">
            <TabsContent value="keyword" className="w-full">
              <div className="flex flex-col items-center gap-4 lg:flex-row">
                {(isLoading || isImageGenerated || generatedImageUri) && (
                  <div className="flex w-full flex-col items-center justify-center">
                    {isLoading ? (
                      <>
                        <Skeleton className="h-[300px] w-full rounded-lg" />
                        <Progress className="mt-12 w-full" value={loadingIndicator} />
                      </>
                    ) : isImageGenerated && !generatedImageUri ? (
                      <div className="flex h-64 w-64 items-center justify-center text-red-500">
                        <AlertTriangle className="mr-2" />
                        {t('image_generated_failed')}
                      </div>
                    ) : (
                      <>
                        <ImageDisplay imageUrl={generatedImageUri} />
                        <GenerationControls />
                      </>
                    )}
                  </div>
                )}

                <div className="flex w-full flex-col flex-wrap gap-6">
                  <div className="flex flex-row items-center gap-2 text-neutral-500">
                    <div className="flex flex-row items-center gap-2">
                      <InfoIcon height={20} width={20} />
                      {t('keywords_input_info')}
                    </div>
                  </div>
                  <Keywordsinput />
                  <NegativePrompt />
                  <StyleSelection />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="paste"></TabsContent>
          </Tabs>
        </div>
      </div>
      <div className="flex justify-center">
        <PrimaryButton sizes={['m', 'm', 'm']} className="w-full md:!w-80" onClick={generateImageWithKeywords}>
          {t('generate')}
        </PrimaryButton>
      </div>
      <div className="text-start text-neutral-500">{t('disclaimer')}</div>
    </div>
  )
}

const HashtagsToImageWrapper = () => (
  <Suspense fallback={<div>Loading translations...</div>}>
    <HashtagToImage />
  </Suspense>
)

export default HashtagsToImageWrapper

HashtagsToImageWrapper.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <SideMenuLayout>{page}</SideMenuLayout>
    </Layout>
  )
}
