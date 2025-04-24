import React from 'react'
import { RowsTableEstadisticaCap } from './RowsTableEstadisticaCap'
import { useSelector } from 'react-redux';

export const TableEstadisticasCap = () => {

    const { estadisticaCaptura } = useSelector( state => state.estadistica );
    const {data, sumRv, sumRvAcum, sumOe, sumOeAcum, sumCot, sumCotAcum, sumRs, sumRsAcum, sumV, sumVAcum, sumM, sumMAcum, granTotal, granTotalAcum } = estadisticaCaptura

  return (
    <div className="w-full overflow-x-auto">
    <table className="items-center bg-transparent w-full border-collapse">
          <thead className=''>
              <tr>
                  <th style={{ width:500 }} className='px-2 align-middle border border-solid border-gray-400 py-3 text-xs whitespace-nowrap font-semibold text-left'>Nombre Capturista</th>
                  <th className='px-2 w-5 align-middle border border-solid border-gray-400 py-3 text-xs whitespace-nowrap font-semibold text-center'>Rv's</th>
                  <th className='px-2 w-5 align-middle border border-solid border-gray-400 py-3 text-xs whitespace-nowrap font-semibold text-center'></th>
                  <th className='px-2 w-5 align-middle border border-solid border-gray-400 py-3 text-xs whitespace-nowrap font-semibold text-center'>Acum</th>
                  <th className='px-2 w-5 align-middle border border-solid border-gray-400 py-3 text-xs whitespace-nowrap font-semibold text-center'>% Acum</th>
                  <th className='px-2 w-5 align-middle border border-solid border-gray-400 py-3 text-xs whitespace-nowrap font-semibold text-center'>Oe's</th>
                  <th className='px-2 w-5 align-middle border border-solid border-gray-400 py-3 text-xs whitespace-nowrap font-semibold text-center'></th>
                  <th className='px-2 w-5 align-middle border border-solid border-gray-400 py-3 text-xs whitespace-nowrap font-semibold text-center'>Acum</th>
                  <th className='px-2 w-5 align-middle border border-solid border-gray-400 py-3 text-xs whitespace-nowrap font-semibold text-center'>% Acum</th>
                  <th className="px-2 w-5 align-middle border border-solid border-gray-400 py-3 text-xs whitespace-nowrap font-semibold text-center">Cot's</th>
                  <th className='px-2 w-5 align-middle border border-solid border-gray-400 py-3 text-xs whitespace-nowrap font-semibold text-center'></th>
                  <th className='px-2 w-5 align-middle border border-solid border-gray-400 py-3 text-xs whitespace-nowrap font-semibold text-center'>Acum</th>
                  <th className='px-2 w-5 align-middle border border-solid border-gray-400 py-3 text-xs whitespace-nowrap font-semibold text-center'>% Acum</th>
                  <th className="px-2 w-5 align-middle border border-solid border-gray-400 py-3 text-xs whitespace-nowrap font-semibold text-center"> RS's </th>
                  <th className='px-2 w-5 align-middle border border-solid border-gray-400 py-3 text-xs whitespace-nowrap font-semibold text-center'></th>
                  <th className='px-2 w-5 align-middle border border-solid border-gray-400 py-3 text-xs whitespace-nowrap font-semibold text-center'>Acum</th>
                  <th className='px-2 w-5 align-middle border border-solid border-gray-400 py-3 text-xs whitespace-nowrap font-semibold text-center'>% Acum</th>
                  <th className="px-2 w-5 align-middle border border-solid border-gray-400 py-3 text-xs whitespace-nowrap font-semibold text-center"> Vol </th>
                  <th className='px-2 w-5 align-middle border border-solid border-gray-400 py-3 text-xs whitespace-nowrap font-semibold text-center'></th>
                  <th className='px-2 w-5 align-middle border border-solid border-gray-400 py-3 text-xs whitespace-nowrap font-semibold text-center'>Acum</th>
                  <th className='px-2 w-5 align-middle border border-solid border-gray-400 py-3 text-xs whitespace-nowrap font-semibold text-center'>% Acum</th>
                  <th className="px-2 w-5  align-middle border border-solid border-gray-400 py-3 text-xs whitespace-nowrap font-semibold text-center">Mov</th>
                  <th className='px-2 w-5 align-middle border border-solid border-gray-400 py-3 text-xs whitespace-nowrap font-semibold text-center'></th>
                  <th className='px-2 w-5 align-middle border border-solid border-gray-400 py-3 text-xs whitespace-nowrap font-semibold text-center'>Acum</th>
                  <th className='px-2 w-5 align-middle border border-solid border-gray-400 py-3 text-xs whitespace-nowrap font-semibold text-center'>% Acum</th>
                  <th className="px-2 w-20 align-middle border border-solid border-gray-400 py-3 text-xs whitespace-nowrap font-semibold text-center"> Total </th>
                  <th className="px-2 w-20 align-middle border border-solid border-gray-400 py-3 text-xs whitespace-nowrap font-semibold text-center"> Productividad </th>
                  <th className="px-2 w-20 align-middle border border-solid border-gray-400 py-3 text-xs whitespace-nowrap font-semibold text-center"> Acumulado </th>
                  <th className="px-2 w-20 align-middle border border-solid border-gray-400 py-3 text-xs whitespace-nowrap font-semibold text-center"> Prod. Acum. </th>
              </tr>
          </thead>
          <tbody>
              {
                  data.map( d => (
                      //<RowTableProveedorContrato key={ d.idAnexoContrato } data= { d } />
                      <RowsTableEstadisticaCap key={ d.usuario } d ={ d } values = { estadisticaCaptura } />
                  ) )
              }
               <tr>
                  <td style={{ width:333 }} className='px-2  align-middle border border-solid border-gray-400 py-3 text-sm whitespace-nowrap font-semibold text-left'>Total</td>
                  <td className='px-2 w-5 align-middle border border-solid border-gray-400 py-3 text-sm whitespace-nowrap font-semibold text-center'>{ sumRv }</td>
                  <td className='px-2 w-5 align-middle border border-solid border-gray-400 py-3 text-sm whitespace-nowrap font-semibold text-center'></td>
                  <td className='px-2 w-5 align-middle border border-solid border-gray-400 py-3 text-sm whitespace-nowrap font-semibold text-center'>{ sumRvAcum }</td>
                  <td className='px-2 w-5 align-middle border border-solid border-gray-400 py-3 text-sm whitespace-nowrap font-semibold text-center'></td>
                  <td className='px-2 w-5 align-middle border border-solid border-gray-400 py-3 text-sm whitespace-nowrap font-semibold text-center'>{ sumOe }</td>
                  <td className='px-2 w-5 align-middle border border-solid border-gray-400 py-3 text-sm whitespace-nowrap font-semibold text-center'></td>
                  <td className='px-2 w-5 align-middle border border-solid border-gray-400 py-3 text-sm whitespace-nowrap font-semibold text-center'>{ sumOeAcum }</td>
                  <td className='px-2 w-5 align-middle border border-solid border-gray-400 py-3 text-sm whitespace-nowrap font-semibold text-center'></td>
                  <td className="px-2 w-5 align-middle border border-solid border-gray-400 py-3 text-sm whitespace-nowrap font-semibold text-center">{ sumCot }</td>
                  <td className="px-2 w-5 align-middle border border-solid border-gray-400 py-3 text-sm whitespace-nowrap font-semibold text-center"></td>
                  <td className='px-2 w-5 align-middle border border-solid border-gray-400 py-3 text-sm whitespace-nowrap font-semibold text-center'>{ sumCotAcum }</td>
                  <td className='px-2 w-5 align-middle border border-solid border-gray-400 py-3 text-sm whitespace-nowrap font-semibold text-center'></td>
                  <td className="px-2 w-5 align-middle border border-solid border-gray-400 py-3 text-sm whitespace-nowrap font-semibold text-center">{ sumRs }</td>
                  <td className='px-2 w-5 align-middle border border-solid border-gray-400 py-3 text-sm whitespace-nowrap font-semibold text-center'></td>
                  <td className="px-2 w-5 align-middle border border-solid border-gray-400 py-3 text-sm whitespace-nowrap font-semibold text-center">{ sumRsAcum }</td>
                  <td className="px-2 w-5 align-middle border border-solid border-gray-400 py-3 text-sm whitespace-nowrap font-semibold text-center"></td>
                  <td className="px-2 w-5 align-middle border border-solid border-gray-400 py-3 text-sm whitespace-nowrap font-semibold text-center">{ sumV }</td>
                  <td className='px-2 w-5 align-middle border border-solid border-gray-400 py-3 text-sm whitespace-nowrap font-semibold text-center'></td>
                  <td className="px-2 w-5 align-middle border border-solid border-gray-400 py-3 text-sm whitespace-nowrap font-semibold text-center">{ sumVAcum }</td>
                  <td className="px-2 w-5 align-middle border border-solid border-gray-400 py-3 text-sm whitespace-nowrap font-semibold text-center"></td>
                  <td className="px-2 w-5  align-middle border border-solid border-gray-400 py-3 text-sm whitespace-nowrap font-semibold text-center">{ sumM }</td>
                  <td className='px-2 w-5 align-middle border border-solid border-gray-400 py-3 text-sm whitespace-nowrap font-semibold text-center'></td>
                  <td className="px-2 w-5 align-middle border border-solid border-gray-400 py-3 text-sm whitespace-nowrap font-semibold text-center">{ sumMAcum }</td>
                  <td className="px-2 w-5  align-middle border border-solid border-gray-400 py-3 text-sm whitespace-nowrap font-semibold text-center"></td>
                  <td className="px-2 w-20 align-middle border border-solid border-gray-400 py-3 text-sm whitespace-nowrap font-extrabold text-center">{ granTotal }</td>
                  <td className="px-2 w-5  align-middle border border-solid border-gray-400 py-3 text-sm whitespace-nowrap font-semibold text-center"></td>
                  <td className="px-2 w-20 align-middle border border-solid border-gray-400 py-3 text-sm whitespace-nowrap font-extrabold text-center">{ granTotalAcum }</td>
                  <th className='px-2 w-5 align-middle border border-solid border-gray-400 py-3 text-xs whitespace-nowrap font-semibold text-center'></th>
              </tr> 
          </tbody>
      </table>
      </div>
  )
}
