

import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import { uiCloseModal } from '../../store/slices/ui/uiSlice';
import { CancelOutlined } from '@mui/icons-material';

const customStyles_modal = {
    content: {
        // top: '50%',
        //left: '50%',
        // right: 'auto',
        // bottom: 'auto',
         marginRight: '5%',
         marginLeft: '5%',
        // transform: 'translate(-50%, -50%)',
        // index : '1000'
      },
  };

export const ModalForm = ({ children }) => {

  const { viewModal } = useSelector( state => state.ui )
  const dispatch = useDispatch();

  const closeModal = () => {
        dispatch( uiCloseModal() )
  }

  return (
      <Modal 
        isOpen={ viewModal }
        style={ customStyles_modal }
        onRequestClose={ closeModal }
        closeTimeoutMS={ 200 }
        className='modal'
        overlayClassName=' modal-fondo '
        ariaHideApp= { false }
      > 
            <div className='flex justify-between ' >
              <div></div>
              <button type='button' className='  bg-slate-200 rounded-full p-1' onClick={closeModal}><CancelOutlined fontSize='large' /></button>
            </div>
          { children }
      </Modal>
  )
}