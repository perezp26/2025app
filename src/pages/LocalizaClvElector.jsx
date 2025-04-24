import React, { useState } from 'react'
import { fichaValidaClvElector } from '../store/slices/ficha/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from '../components/formControls/Spinner';
import Swal from 'sweetalert2';

export const LocalizaClvElector = () => {

  const dispatch = useDispatch();
  const {loading} = useSelector( state => state.ui );
  const[clvElector, setClvElector ] =  useState('')
  const[data, setData] = useState([])

  const localizaClv = async() => {
    
     const respuesta = await dispatch(fichaValidaClvElector(clvElector.toUpperCase(), 'X'));
     setData( [ respuesta?.clvEstructura, respuesta?.clvCot, respuesta?.clvRs, respuesta?.clvV ] )
     console.log(data);
     
     respuesta.clvEstructura === null && respuesta.clvCot === null && respuesta.clvRs === null && respuesta.clvV === null &&
     Swal.fire("Info","Clave no encontrada","info")
     
  }

  return (
    <div className='p-7'>
        <div>LocalizaClvElector</div>
        <div className='md:flex'>
          <div className='w-1/3'>
              <input type='text' className={`font-light, text-sm shadow appearance-none rounded w-full py-2 px-2 text-grey-darker focus:border-gray-400 focus:outline-0 focus:shadow focus:shadow-gray-400  
                  hover:outline-0 hover:gray-gray-400 text-transform: uppercase  `} onChange={ e=> setClvElector( e.target.value ) } />
          </div>
          <div className='w-1/3 pl-5'>
          {
            !loading ?
                <button type='button' className='w-1/2 mx-5 rounded-sm p-2 ransition-all duration-200 bg-gray-600 text-gray-50 hover:bg-gray-700 hover:scale-103 active:tranform active:scale-90 active:bg-gray-900'
                 onClick={ localizaClv }>Consultar</button>
              :<Spinner />
          }
          </div>
        </div>
        <div className='md:flex w-full border mt-10'>
          {
                data.map( (x) =>{ if (x !== null) { return(
                                <div className='md:flex w-full' key={ x.clvElector }>
                                    <div className='w-3/6 p-3 border'>Clv Elector: { x.clvElector }</div>
                                    <div className='w-2/6 p-3 border'>Dto Federal: { x.dFederal }</div>
                                    <div className='w-1/6 p-3 border'>{ !!x.ruta ? `Ruta: ${ x.ruta }` : `Region: ${x.region }` }</div>
                                    <div className='w-2/6 p-3 border'>Sección : { x.seccion }</div>
                                    <div className='w-2/6 p-3 border'>Figura : { x.figura }</div>
                                </div>)} })
          }
           
        </div>
    </div>

  )
}
