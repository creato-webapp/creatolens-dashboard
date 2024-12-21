import { ReactElement } from 'react'

import Keywordsinput from '@components/Hashtag/HashtagToImage/Keywordsinput'
import NegativePrompt from '@components/Hashtag/HashtagToImage/NegativePrompt'
import StyleSelection from '@components/Hashtag/HashtagToImage/StyleSelection'
import { Layout } from '@components/Layout'
import SideMenuLayout from '@components/Layout/SideMenuLayout'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/Tabs'
import { useTranslation } from 'next-i18next'
import PrimaryButton from '@components/Button/Primary'
import { useHashtagToImage } from '@hooks/useHashtagToImage'

const HashtagToImage = () => {
  const { generateImageWithKeywords, generatedImageUri, isLoading, loadingIndicator, isImageGenerated, resetToDefault } = useHashtagToImage()

  return (
    <div className="mb-4 flex w-full flex-col justify-center gap-12 md:min-h-144">
      <div className="flex items-center justify-between">
        <h1 className="text-subtitle font-bold">Hashtags-to-Image</h1>
        <div className="flex flex-row gap-2"></div>
      </div>

      <div className="my-4 flex w-full items-center justify-center">
        <div className="flex w-full flex-col">
          <Tabs defaultValue="keyword" className="">
            <TabsList>
              <TabsTrigger className="w-full" value="keyword" asChild>
                <div>{t('hashtags-to-image.keywords_input')}</div>
              </TabsTrigger>
              <TabsTrigger className="w-full" value="paste" asChild>
                <div>{t('hashtags-to-image.paste_keyword_result')}</div>
              </TabsTrigger>
            </TabsList>
                  <NegativePrompt />
              </div>
            </TabsContent>
            <TabsContent value="paste"></TabsContent>
          </Tabs>
        </div>
      </div>
      <div className="flex justify-center">
        <PrimaryButton sizes={['m', 'm', 'm']} className="w-full md:!w-80">
          Generate
        </PrimaryButton>
      </div>
      <div className="text-start text-neutral-500">{t('hashtags-to-image.disclaimer')}</div>
    </div>
  )
}
export default HashtagToImage

HashtagToImage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <SideMenuLayout>{page}</SideMenuLayout>
    </Layout>
  )
}
