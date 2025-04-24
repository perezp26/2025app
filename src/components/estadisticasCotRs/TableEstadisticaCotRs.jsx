import { MaterialReactTable } from 'material-react-table'
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { useDispatch, useSelector } from 'react-redux';
import { TableEstadisticasCotRsColumns } from './TableEstadisticasCotRsColumns';
import { colmnsCot } from './GeneraColumnsCots';
import { useCallback, useRef, useState } from 'react';
import { colmnsRs } from './GeneraColumnsRs';
import * as XLSX from 'xlsx';
import { uiEndLoading, uiStartLoading } from '../../store/slices/ui/uiSlice';
import { fetchSinToken } from '../../api/apiFetch';
import { exportaEstadisticasCots, exportaEstadisticasRS } from '../../helpers/exportaEstadisticasCots';

export const TableEstadisticaCotRs = ({ figura }) => {

    const tbl = useRef();
    const dispatch = useDispatch();
    const { loading } = useSelector(state=>state.ui);
    const { estadisticaCotRs, metasEsperadas } =useSelector(state=>state.estadistica);
    const [ order, setOrder ] = useState(true); 

    const columnsGenera = figura === 'COT' ? [...colmnsCot(metasEsperadas)] : [...colmnsRs(metasEsperadas)];

    const columns = TableEstadisticasCotRsColumns( metasEsperadas,columnsGenera ) ;

    const exportTable =useCallback(() =>{
        //  //dispatch(uiStartLoading());
        
        //  setOrder(false);
        
        //  setTimeout(() => {
        //     const wb = XLSX.utils.table_to_book(tbl.current);
        //     XLSX.writeFile(wb, 'EstadisticaCotRs.xlsx');
        //      setOrder(true);
        // //      //dispatch(uiEndLoading());
        //     }, 1000);

       figura === 'COT' ?  exportaEstadisticasCots( estadisticaCotRs, metasEsperadas, figura ) : exportaEstadisticasRS( estadisticaCotRs, metasEsperadas, figura )

    });

      const consultaNominaCot = async() => {

        dispatch( uiStartLoading() );
    
        const url = figura === 'COT' ? `excel/exportanominacot` : `excel/exportanominars`;
        const nameFile = figura === 'COT' ? 'nominaCot.xlsx' : 'nominaRs.xlsx';
        const resp = await fetchSinToken( url, 'GET' );
        
        const resObj = await resp.blob();
        
        const urlExcel = window.URL.createObjectURL(new Blob([resObj]))
        const link = document.createElement('a')
        link.href= urlExcel
        link.setAttribute('download',nameFile)
        document.body.appendChild(link)
        link.click();

        dispatch( uiEndLoading() );
      }

  return (
    <div className='p-7' >

    <MaterialReactTable 
    //table={{ id: 'tableEstadisticaCotRs', ref: tbl }}
    columns = { columns }
    data = { estadisticaCotRs }
    muiTableProps={{ ref: tbl }}

    localization={MRT_Localization_ES}
    enableColumnActions={ false }
    enableTopToolbar = { true }
    ////enableBottomToolbar = { false }
    enableDensityToggle ={ false }
    enableFullScreenToggle={false}
    enableHiding={ false }
    enableSorting={ order }
    state={{
        isLoading : loading,
      }}
    initialState={{
        pagination : {
                    pageIndex:0,
                    pageSize:500,    
        }
    }}
    muiTableBodyCellProps={{
        sx: {
          fontSize:'12px',
          fontWeight:'light',
        }
      }}
      enableRowActions ={ false }

  
      renderTopToolbarCustomActions={
                          () =>     <div className='flex w-full'>
                                            <button onClick={exportTable} className=' text-black rounded-sm py-2 px-4 ransition-all duration-200 bg-slate-300 hover:bg-slate-400 hover:scale-103 active:tranform active:scale-90 active:bg-slate-600'>Exportar Resumen</button>  

                                            <button className='ml-7 text-black rounded-sm p-2 ransition-all duration-200 bg-slate-300 hover:bg-slate-400 hover:scale-103 active:tranform active:scale-90 active:bg-slate-600' onClick={ consultaNominaCot } > Descargar Nomina </button>

                                    </div>
                                                
                                    }
/>
</div>
  )
}
