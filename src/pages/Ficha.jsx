import React, { useEffect } from 'react'
import { BtnAddNew } from '../components/formControls/BtnAddNew'
import { TableListFichas } from '../components/ficha/TableListFichas'
import { useDispatch, useSelector } from 'react-redux'
import { fichaSetListFichas } from '../store/slices/ficha/thunks'
import { uiSetFilterFigura } from '../store/slices/ui/uiSlice'
import { fichaSetDataFicha } from '../store/slices/ficha/fichaSlice'

export const Ficha = () => {

  const dispatch = useDispatch();
  const { filterFiguraEstructura } = useSelector(state=>state.ui);
  const { login } = useSelector(state => state.auth);
  const { permisos } = login;
  useEffect(() => {
    dispatch( fichaSetDataFicha( {} ) );
    filterFiguraEstructura.dFederal !== -1 && dispatch( fichaSetListFichas( filterFiguraEstructura ) )
  }, [])
  

  return (
    <div className='p-5'>
      
        <h1 className='text-2xl font-light'>Ficha Estructura</h1>
      {permisos.includes(16) &&
        <>
        <BtnAddNew navigateTo='/ficha/formficha' text='Agregar RV' estructura='E' figura='RV'  />
        <BtnAddNew navigateTo='/ficha/formficha' text='Agregar OE' estructura='E' figura='OE' />
        </>
      }
        <hr/>

        <div>
          <TableListFichas />
        </div>
    </div>
  )
}
