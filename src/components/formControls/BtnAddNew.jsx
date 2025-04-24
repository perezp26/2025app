import { uiOpenModal } from '../../store/slices/ui/uiSlice';
import { Add } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fichaSetConfigFicha, fichaSetDataFicha } from '../../store/slices/ficha/fichaSlice';
import { fichaPromocionSetDataFicha } from '../../store/slices/fichaPromocion/fichaPromocionSlice';

export const BtnAddNew = ( { navigateTo, text, estructura, figura, seccion = 0, sustituye = 'NO', figuraSustituye = { value: 0 , label : ''} } ) => {

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handlesOnclick = () =>{
      dispatch( fichaPromocionSetDataFicha( {}) );
      dispatch( fichaSetDataFicha( {}) );
      
      dispatch( fichaSetConfigFicha( { estructura, figura, seccion, sustituye, figuraSustituye } ) );
      navigate(navigateTo)
    }
  
    return (
      <button className="p-2 m-3 rounded-sm  transition-all duration-200 bg-gray-500 fab text-cyan-50 hover:bg-gray-700 " 
              onClick={ handlesOnclick } >
              <Add fontSize="medium" />  { text }
      </button>
    )
  }