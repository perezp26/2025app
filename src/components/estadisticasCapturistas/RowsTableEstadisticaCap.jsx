import React from 'react'

export const RowsTableEstadisticaCap = ({d, values}) => {
  return (
    <tr className='text-xs'>
    <td className="px-1 align-middle border border-solid border-gray-400 py-1 text-xs whitespace-nowrap text-left">
            { d.nombre }
    </td>
    <td className="px-1 align-middle border border-solid border-gray-400 py-1 text-xs whitespace-nowrap text-center ">
            { d.RV }
    </td>
    <td className="px-1 align-middle border border-solid border-gray-400 py-1 text-xs whitespace-nowrap text-center ">
            {( d.RV / values.sumRv).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2}) }
    </td>
    <td className="px-1 align-middle border border-solid border-gray-400 py-1 text-xs whitespace-nowrap text-center ">
            { d.acumuladoRv }
    </td>
    <td className="px-1 align-middle border border-solid border-gray-400 py-1 text-sm whitespace-nowrap text-center ">
            {( d.acumuladoRv / values.sumRvAcum).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2}) }
    </td>
    <td className="px-1 align-middle border border-solid border-gray-400 py-1 text-xs whitespace-nowrap text-center ">
            { d.OE }
    </td>
    <td className="px-1 align-middle border border-solid border-gray-400 py-1 text-xs whitespace-nowrap text-center ">
            { (d.OE / values.sumOe).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2}) }
    </td>
    <td className="px-1 align-middle border border-solid border-gray-400 py-1 text-xs whitespace-nowrap text-center ">
            { d.acumuladoOE }
    </td>
    <td className="px-1 align-middle border border-solid border-gray-400 py-1 text-sm whitespace-nowrap text-center ">
            { (d.acumuladoOE / values.sumOeAcum).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2}) }
    </td>
    <td className="px-1 align-middle border border-solid border-gray-400 py-1 text-xs whitespace-nowrap text-center ">
            { d.COTS }
    </td>
    <td className="px-1 align-middle border border-solid border-gray-400 py-1 text-xs whitespace-nowrap text-center ">
            {(d.COTS / values.sumCot).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2}) }
    </td>
    <td className="px-1 align-middle border border-solid border-gray-400 py-1 text-xs whitespace-nowrap text-center ">
            { d.acumuladoCOTS }
    </td>
    <td className="px-1 align-middle border border-solid border-gray-400 py-1 text-xs whitespace-nowrap text-center ">
            { (d.acumuladoCOTS / values.sumCotAcum).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2}) }
    </td>
    <td className="px-1 align-middle border border-solid border-gray-400 py-1 text-xs whitespace-nowrap text-center ">
            { d.RS }
    </td>
    <td className="px-1 align-middle border border-solid border-gray-400 py-1 text-xs whitespace-nowrap text-center ">
            { (d.RS / values.sumRs).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2}) }
    </td>
    <td className="px-1 align-middle border border-solid border-gray-400 py-1 text-xs whitespace-nowrap text-center ">
            { d.acumuladoRS }
    </td>
    <td className="px-1 align-middle border border-solid border-gray-400 py-1 text-xs whitespace-nowrap text-center ">
            { (d.acumuladoRS / values.sumRsAcum).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2}) }
    </td>
    <td className="px-1 align-middle border border-solid border-gray-400 py-1 text-xs whitespace-nowrap text-center ">
            { d.VS }
    </td>
    <td className="px-1 align-middle border border-solid border-gray-400 py-1 text-xs whitespace-nowrap text-center ">
            { (d.VS / values.sumV).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2}) }
    </td>
    <td className="px-1 align-middle border border-solid border-gray-400 py-1 text-xs whitespace-nowrap text-center ">
            { d.acumuladoV }
    </td>
    <td className="px-1 align-middle border border-solid border-gray-400 py-1 text-xs whitespace-nowrap text-center ">
            { (d.acumuladoV / values.sumVAcum).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2}) }
    </td>
    <td className="px-1 align-middle border border-solid border-gray-400 py-1 text-xs whitespace-nowrap text-center ">
            { d.MS }
    </td>
    <td className="px-1 align-middle border border-solid border-gray-400 py-1 text-xs whitespace-nowrap text-center ">
            { (d.MS / values.sumM).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2}) }
    </td>
    <td className="px-1 align-middle border border-solid border-gray-400 py-1 text-xs whitespace-nowrap text-center ">
            { d.acumuladoM }
    </td>
    <td className="px-1 align-middle border border-solid border-gray-400 py-1 text-xs whitespace-nowrap text-center ">
            { (d.acumuladoM / values.sumMAcum).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2}) }
    </td>
    <td className="px-1 align-middle border border-solid border-gray-400 py-1 text-xs whitespace-nowrap text-center font-bold">
            { d.RV + d.OE + d.COTS + d.RS + d.VS + d.MS }
    </td>
    <td className="px-1 align-middle border border-solid border-gray-400 py-1 text-xs whitespace-nowrap text-center  font-bold">
            { ((d.RV + d.OE + d.COTS + d.RS + d.VS + d.MS) / values.granTotal).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2}) }
    </td>
    <td className="px-1 align-middle border border-solid border-gray-400 py-1 text-xs whitespace-nowrap text-center font-bold">
            { d.acumuladoRv + d.acumuladoOE + d.acumuladoCOTS + d.acumuladoRS + d.acumuladoV + d.acumuladoM }
    </td>
    <td className="px-1 align-middle border border-solid border-gray-400 py-1 text-xs whitespace-nowrap text-center  font-bold">
            { ((d.acumuladoRv + d.acumuladoOE + d.acumuladoCOTS + d.acumuladoRS + d.acumuladoV + d.acumuladoM) / values.granTotalAcum).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2}) }
    </td>
</tr>
  )
}
