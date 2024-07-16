import Image from 'next/image'

import { Status } from '@context/DialogueContext'
import { useDialogues } from '@hooks/useDialogues'

const color = {
  [Status.FAILED]: {
    border: 'error-500',
    text: 'error-600',
    src: '/failed-icon.svg',
  },
  [Status.SUCCESS]: {
    border: 'successful-500',
    text: 'successful-700',
    src: '/success-icon.svg',
  },
  [Status.WARNING]: {
    border: 'warning-500',
    text: 'warning-700',
    src: '/warning-icon.svg',
  },
} as const

const Dialogue = () => {
  const { dialogues } = useDialogues()

  return (
    <div className="fixed bottom-5 z-10 flex w-full flex-col gap-2 md:right-5 md:w-2/3">
      {dialogues.map(({ status, message }, index) => {
        const { border, text, src } = color[status]
        return (
          <div
            id={`Dialogue:${status}${index}`}
            key={`Dialogue_${status}_${index}`}
            className={`relative rounded border-l-8 bg-white border-${border} mw-full animate-fadeIn py-2 shadow-md md:animate-slideInFromRight`}
          >
            <div className=" flex flex-row px-2">
              <Image height={30} width={30} className="shrink-0 md:top-0 md:block" src={src} alt={`${status} ${message}`} />
              <div className="flex flex-col justify-between px-4">
                <h4 id="dialogue-header" className={`text-${text} font-medium`}>
                  {status}
                </h4>
                <div className="flex flex-wrap whitespace-normal">
                  <p className="flex flex-wrap text-text-secondary">{message}</p>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Dialogue
