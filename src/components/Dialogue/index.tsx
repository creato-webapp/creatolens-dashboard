import Image from 'next/image'
import { useMemo } from 'react'

export enum Status {
  FAILED = 'FAILED',
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING',
}

interface DialogueIconProps {
  status: Status
}

interface DialogueInterface {
  status: Status
  message: string
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

const Dialogue = (props: DialogueInterface) => {
  const { status, message } = props

  const color = useMemo(() => {
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
  }, [status])
  return (
    <div className={`w-full rounded border-l-8 border-${color?.border} py-4 shadow-md md:w-2/3`}>
      <div className="flex flex-row px-2">
        <DialogueIcon status={status} />
        <div className="flex flex-col px-4 justify-between">
          <h4 id="dialogue-header" className={`text-${color?.text} font-medium`}>
            {status}
          </h4>
          <div className="text-sm text-text-secondary">{message}</div>
        </div>
      </div>
    </div>
  )
}

export default Dialogue
