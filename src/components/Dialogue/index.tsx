import Image from 'next/image'
import { Status, useDialogues } from 'src/context/DialogueContext'

interface DialogueIconProps {
  status: Status
}

export interface DialogueInterface {
  status: Status
  message: string
  id: number
}

const DialogueIcon: React.FC<DialogueIconProps> = ({ status }) => {
  if (status === Status.SUCCESS) {
    return <Image height={30} width={30} className="shrink-0 md:top-0 md:block" src="/success-icon.svg" alt="success" />
  } else if (status === Status.FAILED) {
    return <Image height={30} width={30} className="shrink-0 md:top-0 md:block" src="/failed-icon.svg" alt="success" />
  } else if (status === Status.WARNING) {
    return <Image height={30} width={30} className="shrink-0 md:top-0 md:block" src="/warning-icon.svg" alt="success" />
  } // Return null or a default element if no specific icon should be shown
  return null
}

const Dialogue = () => {
  const { dialogues } = useDialogues()

  const color = (status: Status) => {
    if (status === Status.FAILED) {
      return {
        border: 'error-500',
        text: 'error-600',
      }
    }
    if (status === Status.SUCCESS) {
      return {
        border: 'successful-500',
        text: 'successful-700',
      }
    }
    if (status === Status.WARNING) {
      return {
        border: 'warning-500',
        text: 'warning-700',
      }
    }
    return {
      border: 'warning-500',
      text: 'warning-700',
    }
  }
  return (
    <div className="fixed bottom-5 z-10 flex w-full flex-col gap-2 md:right-5 md:w-2/3">
      {dialogues.map((dialogue, index) => {
        const { border, text } = color(dialogue.status)
        return (
          <div
            key={index}
            className={`relative rounded border-l-8 bg-white border-${border} mw-full animate-fadeIn py-2 shadow-md md:animate-slideInFromRight`}
          >
            <div className=" flex flex-row px-2">
              <DialogueIcon status={dialogue.status} />
              <div className="flex flex-col justify-between px-4">
                <h4 id="dialogue-header" className={`text-${text} font-medium`}>
                  {dialogue.status}
                </h4>
                <div className="flex flex-wrap whitespace-normal">
                  <p className="flex flex-wrap text-text-secondary">{dialogue.message}</p>
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
