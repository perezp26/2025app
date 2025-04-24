import React, { useEffect } from 'react'
import { BtnAddNew } from '../components/formControls/BtnAddNew'
import { useDispatch, useSelector } from 'react-redux';
import { TableListFichasPromocion } from '../components/fichaPromocion/TableListFichasPromocion';
import { fichaPromocionSetDataFicha } from '../store/slices/fichaPromocion/fichaPromocionSlice';
import { fichaPromocionSetListFichas } from '../store/slices/fichaPromocion/thunks';

export const FichaPromocion = () => {

  const dispatch = useDispatch();
  const { filterFigura } = useSelector(state=>state.ui);
  const { login } = useSelector(state => state.auth);
  const { permisos } = login;
  useEffect(() => {
    dispatch( fichaPromocionSetDataFicha( {}) );
    filterFigura.dFederal !== -1 && dispatch( fichaPromocionSetListFichas( filterFigura ) )
  }, [])

  return (
     <div className='p-5'>
          
            <h1 className='text-2xl font-light'>Ficha Promoción</h1>
            <hr/>
            {permisos.includes(17) &&<>
                <BtnAddNew navigateTo='/ficha/formfichapromocion' text='Agregar COT' estructura='P' figura='COT'  />
                <BtnAddNew navigateTo='/ficha/formfichapromocion' text='Agregar Rep Sección (RS)' estructura='P' figura='RS' />
                <BtnAddNew navigateTo='/ficha/formfichapromocion' text='Agregar Voluntarios' estructura='P' figura='V' /> 
                <BtnAddNew navigateTo='/ficha/formfichapromocion' text='Agregar Movilizado' estructura='P' figura='M' /> 
                </>
            }
    
    <TableListFichasPromocion />
        </div>
  )
}
