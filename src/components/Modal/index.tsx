import { ModalKeyEnum } from '@context/ModalContext'
import { useModals } from '@hooks/useModal'

import { GenericModal } from './GenericModal'
import { SessionModal } from './SessionModal'

const Modals = () => {
  const { modal } = useModals()
  return (
    <>
      {modal === ModalKeyEnum.DEFAULT && <GenericModal />}
      {modal === ModalKeyEnum.SESSION && <SessionModal />}
    </>
  )
}

export default Modals
