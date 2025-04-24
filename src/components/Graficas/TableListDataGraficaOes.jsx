import { MaterialReactTable } from 'material-react-table'
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { TableListDataGraficaOesColumns } from './TableListDataGraficaOesColumns';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

export const TableListDataGraficaOes = () => {

    const { loading } = useSelector(state=>state.ui);
    const  { graficaOes } =   useSelector( state => state.grafica );
    const { data, regiones } = graficaOes

    const columns = useMemo( () => TableListDataGraficaOesColumns() );

    useEffect(() => {
      // const agrupa = Object.groupBy( regiones, (r) => r.municipio );
      // const llaves = Object.keys( agrupa );

      // console.log(agrupa);
      // const data = llaves.reduce( ( acc, item ) => {

      //   return [ ...acc , {
      //         municipio : agrupa[item][0].municipio,
      //         regiones :  agrupa[item].length,
      //         regionesNum :   agrupa[item].reduce( (acc, {}) ),
      //         oeP : agrupa[item].reduce( (acc, item) => acc + item.oeP, 0 ),
      //         oeS : agrupa[item].reduce( (acc, item) => acc + item.oeS, 0 ),
      //     }
      //   ]
      // },[]
              
      //  )

      // console.log(data);

      
    }, [graficaOes])
    
  return (
            <MaterialReactTable
                     enableColumnActions={ false }
                     enableTopToolbar = { false }
                        columns = { columns }
                        data = { data }
                        localization={MRT_Localization_ES} 
                        state={{
                          isLoading : loading,
                        }}
                        muiTableBodyCellProps={{
                          sx: {
                            fontSize:'10px',
                            fontWeight:'light',
                          }
                        }}
                       muiTableHeadCellProps={{
                        sx:{ fontSize:'10px' }
                       }}
                    /> 
  )
}
