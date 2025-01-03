import { ReactElement, Suspense, useCallback, useState } from 'react'

import Image from 'next/image'

import Details from '@components/Hashtag/Details'
import Step1 from '@components/Hashtag/ImageToHashtag/Step1'
import Step2 from '@components/Hashtag/ImageToHashtag/Step2'
import Step3 from '@components/Hashtag/ImageToHashtag/Step3'
import ProgressBar from '@components/Hashtag/ProgressBar'
import { useImageHashtag } from '@hooks/useImagetoHashtag'
import { Layout } from '@components/Layout'
import SideMenuLayout from '@components/Layout/SideMenuLayout'
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next'
import { getLocaleProps } from '@services/locale'
// import HelpIcon from '@components/Icon/HelpIcon'

export async function getStaticProps(context: { locale: GetStaticPropsContext | GetServerSidePropsContext }) {
  return await getLocaleProps(context.locale)
}

const ImageToHashtags = () => {
  const { step } = useImageHashtag()
  const [isDetailPagesOpen, setIsDetailsPageOpen] = useState<boolean>(false)

  const StepComponent = useCallback(() => {
    if (step === 1) {
      return <Step1 />
    } else if (step === 2) {
      return <Step2 />
    } else if (step === 3) {
      return <Step3 />
    } else return <></>
  }, [step])

  if (isDetailPagesOpen)
    return (
      <div className="mx-3 my-4 flex items-center justify-center">
        <Details setIsDetailsPageOpen={() => setIsDetailsPageOpen((pre) => !pre)} />
      </div>
    )

  return (
    <div className="my-4 flex w-full justify-center md:min-h-144">
      <div className="w-full">
        <div className="flex items-center justify-between">
          <h1 className="text-subtitle font-bold">Image-to-Hashtags</h1>
          <div className="flex flex-row gap-2">
            {/* <HelpIcon className="fill-black" /> */}
            <Image
              onClick={() => setIsDetailsPageOpen((pre) => !pre)}
              className="cursor-pointer"
              src="/help-circle.svg"
              alt={'help'}
              width={34}
              height={34}
            ></Image>
          </div>
        </div>
        <div className="my-4 flex w-full items-center justify-center md:my-7">
          <div className="mx-6 w-full md:w-1/2">
            <ProgressBar total_step={3} current_step={step} />
          </div>
        </div>

        <div className="my-4 flex w-full items-center justify-center md:my-12">
          <div className="w-full">
            <StepComponent />
          </div>
        </div>
      </div>
    </div>
  )
}

const ImageToHashtagsWrapper = () => (
  <Suspense fallback={<div>Loading translations...</div>}>
    <ImageToHashtags />
  </Suspense>
)

export default ImageToHashtagsWrapper

ImageToHashtagsWrapper.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <SideMenuLayout>{page}</SideMenuLayout>
    </Layout>
  )
}
