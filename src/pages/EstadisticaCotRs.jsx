
import { useDispatch, useSelector } from 'react-redux';
import { TableEstadisticaCotRs } from '../components/estadisticasCotRs/TableEstadisticaCotRs'
import { Spinner } from '../components/formControls/Spinner';
import { RangerDateControl } from '../components/formControls/RangerDateControl'
import { estadisticaGetEstadisticaCotsRs } from '../store/slices/estadistica/thunks';
import { useState } from 'react';



export const EstadisticaCotRs = () => {
  const dispatch  = useDispatch();
  const { dates } = useSelector( state => state.ui);
  const { loading } = useSelector( state => state.ui );
  const { dsFederales } = useSelector( state => state.casilla );

  const [parametros, setParametros] = useState({ figura : 'RS', distrito : 1 });

  const handlesConsulta = () => {

    dispatch( estadisticaGetEstadisticaCotsRs( dates, parametros ) );
  }


  return (
    <div>
      <h1 className=' font-light text-2xl'>Estadisticas Rv - Rs</h1>
                <hr />
                <div className='boder bg-slate-300 p-3 my-3 md:flex '>
                    <div className='w-1/3'> <RangerDateControl /> </div>
                    <div className='w-1/6 pl-5'> 
                      <label className='block text-sm font-medium text-gray-700'>Figura</label>
                      <select className='mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
                              onChange={ e => setParametros({ ...parametros, figura : e.target.value }) }>
                                <option value="RS">RS</option>
                                <option value="COT">COT</option>
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
                    <div className='w-1/3'>
                          {
                            !loading ?
                              <button type='button'
                                  onClick={ handlesConsulta }
                                  className=' mt-5 ml-10 rounded-lg p-2 ransition-all duration-200 bg-gray-600 text-gray-50 hover:bg-gray-700 hover:scale-103 active:tranform active:scale-90 active:bg-gray-900 '> 
                                  Consultar 
                              </button>
                              :
                              <Spinner />
                          }
                    </div>
                </div>
      <TableEstadisticaCotRs figura={ parametros.figura } />

     
    </div>
  )
}

