import { useEffect, useMemo, useState } from 'react'
import { MaterialReactTable } from 'material-react-table'
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { TableListNominaCotsColumns } from '../components/nominaCots/TableListNominaCotsColumns';
import { fetchSinToken } from '../api/apiFetch';

export const NominsaCots = () => {


  const columns = useMemo( () => TableListNominaCotsColumns() );
const [values, setValues] = useState([]);
  useEffect(() => {
   consulta()
  }, [])


  const consulta = async () => {
    const resp = await fetchSinToken(`captura/nominacot` );
    const body = await resp.json();
setValues(body.laNomina);

  }
  
  
  
  return (
    <div>NominsaCots


            <MaterialReactTable
                      columns = { columns }
                      data = { values }

                      localization={MRT_Localization_ES}
                          enableColumnActions={ false }
                          enableTopToolbar = { true }
                          ////enableBottomToolbar = { false }
                          enableDensityToggle ={ false }
                          enableFullScreenToggle={false}
                          enableHiding={ false }
                      state={{
                          //isLoading : loading,
                        }}
                      initialState={{
                          pagination : {
                                      pageIndex:0,
                                      pageSize:25,    
                          }
                      }}
                      muiTableBodyCellProps={{
                          sx: {
                            fontSize:'12px',
                            fontWeight:'light',
                          }
                        }}
                        //muiPaginationProps={{ showRowsPerPage: false }}
                        enableRowActions ={ false }
            />
</div>
  )
}
