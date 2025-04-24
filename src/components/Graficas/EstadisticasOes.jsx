
import { GraficaOes} from './GraficaOes'
import { TableListDataGraficaOes } from './TableListDataGraficaOes'

export const EstadisticasOes = () => {
  return (
    <div className='md:flex mt-10'>
        <div className='border'>
            <h3 className=' font-light text-2xl'> OE'S </h3>
            <GraficaOes />
        </div>
        <div className='px-4'>
            <TableListDataGraficaOes /> 
        </div>
    </div>
  )
}
