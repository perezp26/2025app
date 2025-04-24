
import { RangerDateControl } from '../components/formControls/RangerDateControl'
import { useDispatch, useSelector } from 'react-redux'
import { Spinner } from '../components/formControls/Spinner'
import { estadisticaGetEstadisticaCap } from '../store/slices/estadistica/thunks'
import { TableEstadisticasCap } from '../components/estadisticasCapturistas/TableEstadisticasCap'


export const EstadisticaCaptura = () => {

  const dispatch  = useDispatch();
  const { dates } = useSelector( state => state.ui);
  const { loading } = useSelector( state => state.ui );

  const handlesConsulta = () => {
    dispatch( estadisticaGetEstadisticaCap ({...dates}) )
  }

  
  return (
    <div className='p-5'>
                <h1 className=' font-light text-2xl'>Estadisticas Capturistas</h1>
                <hr />
                <div className='boder bg-slate-300 p-3 my-3 md:flex '>
                    <div className='w-1/3'> <RangerDateControl /> </div>
                    <div className='w-1/3'>
                    {
                            !loading ?
                              <button type='button'
                                  onClick={ handlesConsulta }
                                  className=' mt-6 rounded-sm p-2 ransition-all duration-200 bg-gray-600 text-gray-50 hover:bg-gray-700 hover:scale-103 active:tranform active:scale-90 active:bg-gray-900 '> 
                                  Consultar 
                              </button>
                              :
                              <Spinner />
                          }
                    </div>
                </div>
  {
      !loading ? 
      <div className=" w-full">
          <TableEstadisticasCap />
    </div>
    : <Spinner />
  }
 
    </div>

  )
}
