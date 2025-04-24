import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TableListFichasColumns } from './TableListFichasColumns';
import { MaterialReactTable } from 'material-react-table'
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { uiEndLoading, uiOpenModal, uiSetFilterFiguraEstructura, uiStartLoading } from '../../store/slices/ui/uiSlice';
import { ModalForm } from '../formControls/ModalForm';
import { FormAsigna } from './FormAsigna';
import { format } from 'date-fns-tz'
import { CancelRounded, Edit, LogoutOutlined, MeetingRoomOutlined, SwapHorizRounded } from '@mui/icons-material';
import { fichaAsignacionInit } from '../../store/slices/ficha/fichaSlice';
import { fichaDesasignarCasilla, fichaGetFichaEdit, fichaSetListFichas, fichaUpdateStatusIne } from '../../store/slices/ficha/thunks';
import { useNavigate } from 'react-router-dom';
import { exportaListadoEstructura } from '../../helpers/exportaListadoEstructura';
import * as XLSX from "xlsx";
import { exportaListadoVoluntariosMovilizados } from '../../helpers/exportaListadoVoluntariosMovilizados';
import Swal from 'sweetalert2';


export const TableListFichas = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const tbl = useRef();
    const [ order, setOrder ] = useState(true); 

    const { login } = useSelector(state => state.auth);
    const { usuario, permisos, perfil } = login;
    const { loading, filterFiguraEstructura } = useSelector(state=>state.ui);
    const { listFichas } = useSelector( state => state.ficha );
    const { dsFederales, statusIne } = useSelector( state => state.casilla );

    const [viewColumnStatusIne, setViewColumnStatusIne]  = useState('RV')
    
    const update = (values) => {
      ejectua(values);
    }
    
    const ejectua = async(values) => {
        if( values.idStatusIne === '4' ){
          const { value: date } = await Swal.fire({
            title: "Fecha de Capacitación",
            input: "date",
            didOpen: () => {
              const today = (new Date()).toISOString();
              Swal.getInput().min = today.split("T")[0];
            }
          });
          if (date) {
            dispatch(fichaUpdateStatusIne( {...values, fechaCapacitacion : date} ));
          }
        }
        else {
            dispatch(fichaUpdateStatusIne( {...values, fechaCapacitacion : null} ));
        }
    }
    
    const columns = useMemo( () => TableListFichasColumns(viewColumnStatusIne, update, statusIne, permisos.includes(8)) );


    const openModalOpenAsignacion = (values) => {

      const data = { tipoAsignacion : values.figura, idFicha :  values.idFicha }
      dispatch(fichaAsignacionInit( data  ));
      dispatch(uiOpenModal());
    }

    const handlesEditFicha = async( idFicha ) => {

      const respuesta = await dispatch( fichaGetFichaEdit(idFicha) );
      respuesta && navigate('/ficha/formficha');

    }

    const handlesDesasignarRegionCasilla = (data, desactiva ) => {
            const values = {
                fecha : format(new Date(),"yyyy-MM-dd HH:mm:ss").toString(),
                usuario,
                idFicha : data.idFicha,
                figura : data.figura,
                puesto : data.puesto,
                dFederal : data.dFederal,
                dLocal : data.dLocal,
                region : data.region,
                ruta : 0,
                seccion : data.seccion,
                casilla : data.casilla,
                desactiva
            }
            
             dispatch( fichaDesasignarCasilla( values, filterFiguraEstructura.figura, 'Corfirmar quitar de la ruta o seccion', 'Seguro que desea eliminar la ruta o la sección de esta persona?' ) );
    
        }


    const handlesDeshabilita = (data, desactiva) => {
          const values = {
              fecha : format(new Date(),"yyyy-MM-dd HH:mm:ss").toString(),
              usuario,
              idFicha : data.idFicha,
              figura : data.figura,
              puesto : data.puesto,
              dFederal : data.dFederal,
              dLocal : data.dLocal,
              region : data.region,
              ruta : 0,
              seccion : data.seccion,
              casilla : data.casilla,
              desactiva
          }
           dispatch( fichaDesasignarCasilla( values, filterFiguraEstructura.figura,'Confirma que desea dar de "BAJA" a estar persona', 'Seguro que desea dar de baja a estar persona ?' ) );
  
      }


    // useEffect(() => {     
    //     filterFiguraEstructura !== '' &&
    //     dispatch( fichaSetListFichas(filterFiguraEstructura) );
    // }, [filterFiguraEstructura])
    const consultarData = () => {
        setViewColumnStatusIne(filterFiguraEstructura.figura)
        dispatch( fichaSetListFichas( filterFiguraEstructura ) );
      }
    
    // const exportTable =useCallback(() =>{
    //         //dispatch(uiStartLoading());
    //         setOrder(false);
          
    //         setTimeout(() => {
    //           const wb = XLSX.utils.table_to_book(tbl.current);
    //           XLSX.writeFile(wb, `Listado${filterFiguraEstructura.figura}.xlsx`);
    //             setOrder(true);
    //             //dispatch(uiEndLoading());
    //           }, 1000);
  
    //   });

  const handlesExportsNomina = () => {
    
    filterFiguraEstructura.figura =='RV' && exportaListadoEstructura(listFichas,filterFiguraEstructura.figura); 
    filterFiguraEstructura.figura =='OE' && exportaListadoVoluntariosMovilizados(listFichas,filterFiguraEstructura.figura, statusIne); 
    //filterFiguraEstructura.figura =='OE' && exportTable();
  }


  return (
  <>
    <MaterialReactTable
    columns = { columns }
    data = { listFichas }
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
                            <div className='w-24  text-center'> 
                           {
                              
                                        (row.original.region === null || row.original.region === 0 || row.original.figura === 'OE')  && permisos.includes(9) &&
                                          <button onClick={ () => openModalOpenAsignacion( row.original ) }>
                                                {
                                                  row.original.figura === 'OE' ? <SwapHorizRounded className=' ml-1' fontSize='small' /> : <MeetingRoomOutlined className=' ml-1' fontSize='small' />
                                                }  
                                          </button> 
                            }
                            {           (row.original.region !== null && row.original.region !== 0 && row.original.figura === 'RV') && permisos.includes(9) &&
                                          <button onClick={ () => handlesDesasignarRegionCasilla( row.original, false ) }>
                                                  <LogoutOutlined className=' ml-1' fontSize='small' />
                                          </button> 
                            }
                            {         permisos.includes(8) &&
                                        <button onClick={ () => handlesEditFicha( row.original.idFicha ) }>
                                                  <Edit className=' ml-2' fontSize='small' />
                                        </button> 
                            }
                            {           permisos.includes(10) &&
                                          <button onClick={ () => handlesDeshabilita( row.original, true ) }>
                                                  <CancelRounded className=' ml-2' fontSize='small' />
                                          </button> 
                            }
                    
                            </div> 
                      </div>
                      :<div className=' text-amber-800'>Desactivado</div>
                    
                     
                    // :  row.original.status === 'R' && permisos.includes(5) ? <button className=' font-light text-sm' onClick={ () => dispatch(entradaUpdateStatus({ ...row.original, status : 'C' })) }> <EventBusy fontSize='small' /> Entrada </button>  : <></>
                   
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
                                  <div>
                                      <select className=' w-44 border border-gray-300 rounded shadow p-2 focus:border-gray-400 focus:outline-0 focus:shadow ocus:shadow-gray-300 font-light'
                                                                  name='puesto' value={ filterFiguraEstructura.figura }  onChange={ e => dispatch( uiSetFilterFiguraEstructura( {figura: e.target.value} ) ) }   >
                                                                  <option value = "RV" > RV</option>
                                                                  <option value = "OE" > Observador Electora</option>
                                      </select>
                                      <select className='ml-5 w-24 border border-gray-300 rounded shadow p-2 focus:border-gray-400 focus:outline-0 focus:shadow ocus:shadow-gray-300 font-light'
                                                  name='distrito' value={ filterFiguraEstructura.dFederal }  onChange={ e => dispatch( uiSetFilterFiguraEstructura( {dFederal : e.target.value} ) ) }  
                                                  >
                                                <option value={-1} >Seleccionar</option> 
                                                { perfil.dFederal === 0 && <option value={0} >Sin asignar</option>  }
                                                  {
                                                    dsFederales.map( (item) => (
                                                            (perfil.dFederal === 0 || perfil.dFederal === item.value ) && <option key={item.value} value={item.value} > {item.label}</option> 
                                                    ))
                                                  }
                                      </select> 
                                      <button className='ml-7 text-black rounded-sm p-2 ransition-all duration-200 bg-slate-300 hover:bg-slate-400 hover:scale-103 active:tranform active:scale-90 active:bg-slate-600' onClick={ consultarData } > Consultar </button>
                                     {permisos.includes(11) &&
                                       <button onClick={handlesExportsNomina} className='ml-7 text-black rounded-sm py-2 px-4 ransition-all duration-200 bg-slate-300 hover:bg-slate-400 hover:scale-103 active:tranform active:scale-90 active:bg-slate-600'>Exportar</button>  
                                     }

                                  </div>
                                                  
                                    }
                        

/>

<ModalForm>
        <FormAsigna />
</ModalForm>
</>
  )
}
