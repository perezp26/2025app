import { useCallback, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { MaterialReactTable } from 'material-react-table'
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { TableEstadisticasRvsOesColumns } from './TableEstadisticasRvsOesColumns';

import * as XLSX from 'xlsx';

export const TableEstadisticasRvsOes = () => {

    const tbl = useRef();
    const [ order, setOrder ] = useState(true); 

    const { loading } = useSelector(state=>state.ui);
    const { estadisticaRvsOes } = useSelector(state=>state.estadistica);
    const columns = TableEstadisticasRvsOesColumns() ;
    

     const exportTable =useCallback(() =>{
             //dispatch(uiStartLoading());
             setOrder(false);
            
             setTimeout(() => {
                const wb = XLSX.utils.table_to_book(tbl.current);
                XLSX.writeFile(wb, 'EstadisticaRvs.xlsx');
                 setOrder(true);
                 //dispatch(uiEndLoading());
               }, 1000);
    
        });
  return (
    <MaterialReactTable 
    columns = { columns }
    data = { estadisticaRvsOes }
    muiTableProps={{ ref: tbl }}

    localization={MRT_Localization_ES}
    enableColumnActions={ false }
    enableTopToolbar = { true }
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
                                            <button onClick={exportTable} className=' text-black rounded-sm py-2 px-4 ransition-all duration-200 bg-slate-300 hover:bg-slate-400 hover:scale-103 active:tranform active:scale-90 active:bg-slate-600'>Exportar </button>  
                                    </div>
                                                
                                    }
/>
  )
}
