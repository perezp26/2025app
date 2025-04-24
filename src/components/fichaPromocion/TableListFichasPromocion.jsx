import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { format } from 'date-fns-tz'
import { TableListFichasPromocionColumns } from './TableListFichasPromocionColumns';
import { MaterialReactTable } from 'material-react-table'
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Autorenew, CancelRounded, Edit, ExitToApp, Login, LoginOutlined, LogoutOutlined, MeetingRoomOutlined, SwapHorizRounded } from '@mui/icons-material';
import { fichaPromocionDesasignarSeccion, fichaPromocionGetFichaEdit, fichaPromocionSetListFichas } from '../../store/slices/fichaPromocion/thunks';
import { useNavigate } from 'react-router-dom';
import { uiOpenModal, uiSetFilterFigura } from '../../store/slices/ui/uiSlice';
import { FormAsignaRutaSeccion } from './FormAsignaRutaSeccion';
import { ModalForm } from '../formControls/ModalForm';
import { fichaPromocionAsignacionInit } from '../../store/slices/fichaPromocion/fichaPromocionSlice';
import * as XLSX from 'xlsx';
import { exportaListadoEstructura } from '../../helpers/exportaListadoEstructura';
import { exportaListadoVoluntariosMovilizados } from '../../helpers/exportaListadoVoluntariosMovilizados';
import { fichaSetConfigFicha } from '../../store/slices/ficha/fichaSlice';


export const TableListFichasPromocion = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const tbl = useRef();
    const [ order, setOrder ] = useState(true); 
    
    const { login } = useSelector(state => state.auth);
    const { usuario, permisos, perfil } = login;
    const { loading, filterFigura } = useSelector(state=>state.ui);
    const { listFichaPromocion } = useSelector( state => state.fichaPromocion );
    const { dsFederales } = useSelector( state => state.casilla );

    const columns = useMemo( () => TableListFichasPromocionColumns(filterFigura.figura) );

    const handlesEditFicha = async( {idFicha,figura} ) => {
  
        const respuesta = await dispatch( fichaPromocionGetFichaEdit(idFicha,figura) );
        respuesta && navigate('/ficha/formfichapromocion');
  
      }

    const handlesDesasignarSeccion = (data, desactiva) => {
        const nombreFigura = `${data.nombre} ${data.apellidoPaterno} ${data.apellidoMaterno}`;
        const values = {
            fecha : format(new Date(),"yyyy-MM-dd HH:mm:ss").toString(),
            usuario,
            idFicha : data.idFicha,
            figura : data.figura,
            dFederal : data.dFederal,
            dLocal : data.dLocal,
            region : 0,
            ruta : data.ruta,
            seccion : data.seccion,
            casilla : '',
            desactiva
        }
         dispatch( fichaPromocionDesasignarSeccion( values, filterFigura.figura, `${ nombreFigura }` ,`Seguro que desea eliminar  de la sección ?`) );

    }
    const handlesDesactivaPromocion = (data, desactiva) => {
      const nombreFigura = `${data.nombre} ${data.apellidoPaterno} ${data.apellidoMaterno}`;
      const values = {
          fecha : format(new Date(),"yyyy-MM-dd HH:mm:ss").toString(),
          usuario,
          idFicha : data.idFicha,
          figura : data.figura,
          dFederal : data.dFederal,
          dLocal : data.dLocal,
          region : 0,
          ruta : data.ruta,
          seccion : data.seccion,
          casilla : '',
          desactiva
      }
       dispatch( fichaPromocionDesasignarSeccion( values, filterFigura.figura,`${ nombreFigura }`,`Seguro que desea dar de "BAJA" a esta persona ?` ) );
    }

    const handelOpenModal = ( values, sustituye = 'NO' ) => {
      
      const val = { figura : values.figura, idFicha :  values.idFicha, nombreFigura: `${values.nombre} ${values.apellidoPaterno} ${values.apellidoMaterno}`, sustituye }
      dispatch(fichaPromocionAsignacionInit( val ));
      dispatch( uiOpenModal() ) ;
    }

  const consultarData = () => {
    dispatch( fichaPromocionSetListFichas( filterFigura ) )
  }

  const handlesSustituye = (values) => {
    
      dispatch( fichaSetConfigFicha( {  estructura: 'P', figura: values.figura, 
                                        seccion : { value: values.idSeccion , label: `${values.seccion} - ${values.ruta}`, seccion : values.seccion, dFederal : values.dFederal, dLocal : values.dLocal , ruta : values.ruta }, 
                                        sustituye: 'SI', 
                                        figuraSustituye : { value: values.idFicha, label: values.nombre + ' ' + values.apellidoPaterno + ' ' + values.apellidoMaterno } } ) );
      navigate('/ficha/formfichapromocion')
  }

  //  const exportTable =useCallback(() =>{
  //          dispatch(uiStartLoading());
  //          setOrder(false);
          
  //          setTimeout(() => {
  //             const wb = XLSX.utils.table_to_book(tbl.current);
  //             XLSX.writeFile(wb, `Listado${filterFigura.figura}.xlsx`);
  //              setOrder(true);
  //              dispatch(uiEndLoading());
  //            }, 1000);
  
  //     });

  const handlesExportsNomina = () => {   
    (filterFigura.figura =='COT' || filterFigura.figura =='RS') ? exportaListadoEstructura(listFichaPromocion,filterFigura.figura) 
    : exportaListadoVoluntariosMovilizados( listFichaPromocion,filterFigura.figura )
    }
    
  return (
    <>
    <MaterialReactTable
    columns = { columns }
    data = { listFichaPromocion }
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
                    pageSize:50,    
        }
    }}
    muiTableBodyCellProps={{
        sx: {
          fontSize:'12px',
          fontWeight:'light',
        }
      }}
      //muiPaginationProps={{ showRowsPerPage: false }}
      enableRowActions

      renderRowActions={ ({row}) => {
         return (  
              row.original.status === 'A' ?
                  <div className='flex'>
                     {
                                                  
                          ( row.original.ruta !== 0 ) &&  permisos.includes(13) &&
                                  (row.original.figura === 'RS' || row.original.figura === 'V')  &&
                                  <button onClick={ () => handlesSustituye( { ...row.original } ) } >
                                        <SwapHorizRounded className=' ml-1' fontSize='small' /> 
                                  </button> 
                                 
                    }
                    { ( row.original.ruta !== 0 ) && permisos.includes(13) &&
                        <button onClick={ () => handlesDesasignarSeccion( row.original, false ) } >
                                  <LogoutOutlined className=' ml-1' fontSize='small' />
                        </button> 
                    }
                    { (row.original.ruta === 0 ) && permisos.includes(13) &&
                        <button onClick={ () => handelOpenModal( row.original ) } >
                                  <MeetingRoomOutlined className=' ml-1' fontSize='small' />
                        </button> 
                    }
                     { (row.original.ruta === 0 && (row.original.figura === 'RS' || row.original.figura === 'V') ) && permisos.includes(13) &&
                        <button onClick={ () => handelOpenModal( row.original, "SI" ) } >
                                  <Autorenew className=' ml-1' fontSize='small' />
                        </button> 
                    }
                    { permisos.includes(12) && row.original.ruta !== 0 &&
                        <button onClick={ () => handlesEditFicha( row.original ) }>
                                                    <Edit className=' ml-1' fontSize='small' />
                        </button>
                    }
                    { permisos.includes(14) &&
                        <button onClick={ () => handlesDesactivaPromocion( row.original, true ) } >
                                  <CancelRounded className=' ml-2' fontSize='small' />
                        </button> 
                    }
                    
                  </div>
                 :<div className=' text-amber-800'>Desactivado</div>    
                )
           }
      }

       muiTableBodyRowProps={({row}) => ({
                      sx: {
                        opacity: row.original.status === 'B' ? .7 : ''
                      }
            })
        }

        renderTopToolbarCustomActions={
                     () =>       
                          <div className='flex w-full'>
                            <select className=' w-44 border border-gray-300 rounded shadow p-2 focus:border-gray-400 focus:outline-0 focus:shadow ocus:shadow-gray-300 font-light'
                                        name='puesto' value={ filterFigura.figura }  onChange={ e => dispatch( uiSetFilterFigura( {figura : e.target.value} ) ) }  
                                        >
                                        <option value = "COT" > COT</option>
                                        <option value = "RS" > Rep. Sección</option>
                                        <option value = "V" >Voluntarios</option>
                                        <option value = "M" >Movilizados</option>
                            </select>
                             <select className='ml-5 w-24 border border-gray-300 rounded shadow p-2 focus:border-gray-400 focus:outline-0 focus:shadow ocus:shadow-gray-300 font-light'
                                        name='distrito' value={ filterFigura.dFederal }  onChange={ e => dispatch( uiSetFilterFigura( {dFederal : e.target.value} ) ) }  
                                        >
                                        <option value={-1} >Seleccionar</option>
                                        {
                                          dsFederales.map( (item) => (
                                            (perfil.dFederal === 0 || perfil.dFederal === item.value ) &&  <option key={item.value} value={item.value} > {item.label}</option>
                                          ))
                                        }
                            </select> 
                            <button className='ml-7 text-black rounded-sm p-2 ransition-all duration-200 bg-slate-300 hover:bg-slate-400 hover:scale-103 active:tranform active:scale-90 active:bg-slate-600' onClick={ consultarData } > Consultar </button>
                            {permisos.includes(15) &&
                              <button onClick={handlesExportsNomina} className='ml-7 text-black rounded-sm py-2 px-4 ransition-all duration-200 bg-slate-300 hover:bg-slate-400 hover:scale-103 active:tranform active:scale-90 active:bg-slate-600'>Exportar</button>  
                            }

                          </div>
                        }

/>

<ModalForm>
        <FormAsignaRutaSeccion />
</ModalForm>
</>
  )
}
