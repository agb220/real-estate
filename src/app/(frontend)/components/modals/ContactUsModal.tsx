'use client'
import type { Styles } from 'react-modal'
import Modal from 'react-modal'
import Button from '../shared/Button'
import { CloseSvg } from '../icons'
import ContactUsForm from '../forms/ContactUsForm'

interface ModalFormProps {
  isOpen: boolean
  setIsOpenModal: (arg0: boolean) => void
  title?: string
  subTitle?: string
  sendFormTitle?: string
  fromUrl?: string
}

const ContactUsModal = (props: ModalFormProps) => {
  const closeModal = () => {
    document.body.style.overflow = ''
    props.setIsOpenModal(false)
  }
  if (props.isOpen) {
    document.body.style.overflow = 'hidden'
  }

  return (
    <Modal
      isOpen={props.isOpen}
      style={modalStyles}
      closeTimeoutMS={300}
      className={{
        base: 'modal',
        afterOpen: 'modal--open',
        beforeClose: 'modal--close',
      }}
      overlayClassName={{
        base: 'modal-overlay',
        afterOpen: 'modal-overlay--open',
        beforeClose: 'modal-overlay--close',
      }}
      ariaHideApp={false}
      shouldCloseOnOverlayClick={true}
      onRequestClose={closeModal}
    >
      <div className="modal__wrapper">
        <div className="modal__button">
          <Button
            onClick={closeModal}
            typeBtn="icon"
            className="modal-button"
            icon={<CloseSvg />}
          />
        </div>
        <div className="modal__content">
          <ContactUsForm />
        </div>
      </div>
    </Modal>
  )
}

const modalStyles: Styles = {
  overlay: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: 9999999,
    background: 'rgb(140 140 140 / 93%)',
  },
  content: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '600px',
    maxHeight: '90svh',
    width: '90%',
    padding: '40px 20px',
    border: '1px solid #colorBlue',
    backgroundColor: '#fff',
    overflowY: 'auto',
    outline: 'none',
    borderRadius: '4px',
    boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.1) inset',
  },
}

export default ContactUsModal
