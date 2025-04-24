
import { uiOpenModal } from '../../store/slices/ui/uiSlice';
import { Add } from '@mui/icons-material';
import { useDispatch } from 'react-redux';

export const BtnAddNewOpenModal = ( { initializeState } ) => {

    const dispatch = useDispatch()

    const handlesOnclick = () =>{
      dispatch( initializeState() )
      dispatch( uiOpenModal() ) ;
    }
  
    return (
      <button className=" transition-all duration-200 bg-rose-500 fab text-cyan-50 hover:bg-rose-700 " onClick={ handlesOnclick } >
              <Add fontSize="large" className=' -mt-1' /> 
      </button>
    )
  }

