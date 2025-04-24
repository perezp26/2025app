import { useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { TableEstadisticasRvsOes } from '../components/estadisticasRvsOes/TableEstadisticasRvsOes';
import { estadisticaGetEstadisticaRvs } from '../store/slices/estadistica/thunks';


export const EstadisticasRvsOes = () => {

    const dispatch = useDispatch();
    const { dsFederales } = useSelector( state => state.casilla );
    const [parametros, setParametros] = useState({ figura : 'RV', distrito : 1 });



    const consulta = async() => {

      
        dispatch( estadisticaGetEstadisticaRvs( parametros ) )
    }

  return (
    <div className=' p-5'>
                <h1 className=' font-light text-2xl'>Estadisticas Estructura</h1>
                <hr />
                <div className='boder bg-slate-300 p-4 flex'>
                        <div className='w-1/6 pl-5'> 
                            <label className='block text-sm font-medium text-gray-700'>Figura</label>
                            <select className='mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
                                    onChange={ e => setParametros({ ...parametros, figura : e.target.value }) }>
                                        <option value="RV">RV</option>
                                        {/* <option value="COT">COT</option> */}
                            </select>
                        </div>
                        <div className='w-1/6 pl-5'> 
                            <label className='block text-sm font-medium text-gray-700'>Distrito</label>
                            <select className='mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
                                    onChange={ e => setParametros({ ...parametros, distrito : e.target.value }) }
                            >
                                        {
                                        dsFederales.map( ds =>  <option key={ ds.value } value={ ds.values }>{ ds.label }</option> )
                                        }
                            </select>
                        </div>
                        <button type="button" className="mt-5 ml-10 rounded-lg p-2 ransition-all duration-200 bg-gray-600 text-gray-50 hover:bg-gray-700 hover:scale-103 active:tranform active:scale-90 active:bg-gray-900" onClick={ () => consulta() }> Consultar </button>
                </div>
                <TableEstadisticasRvsOes />
    </div>
  )
}
