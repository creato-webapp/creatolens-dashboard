import { FC } from 'react'
import { Button } from '@components/Button'

export interface ModalProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  isShow: boolean
  title?: React.ReactNode | string | null
  onCancel?: () => void
  isLoading?: boolean
}

const Modal: FC<ModalProps> = ({ title, isShow, children, onCancel, isLoading }) => {
  return isShow ? (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 overflow-x-auto overflow-y-auto">
        <div className="flex min-h-full min-w-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h5 className="flex-auto text-2xl font-bold tracking-tight text-gray-900">{title}</h5>
                <hr className="my-4 h-px border-0 bg-gray-300"></hr>
                <div className="py-4">{children}</div>
              </div>
            </div>
            <hr className="h-px border-0 bg-gray-300"></hr>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <Button.Primary
                className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-accent2-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={onCancel}
                loading={isLoading}
              >
                Cancel
              </Button.Primary>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null
}
export default Modal
