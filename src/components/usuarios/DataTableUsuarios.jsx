import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MaterialReactTable } from 'material-react-table'
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { columnsDtUsuarios } from './columnsDtUsuarios';
import { getPermisosUsuario, getUsuarios, updatePassword } from '../../store/slices/usuarios/thunks';
import { IconButton, Tooltip } from '@mui/material';
import { Edit, Key } from '@mui/icons-material';
import { uiOpenModal } from '../../store/slices/ui/uiSlice';
import Swal from 'sweetalert2';
import { usuario_initialState } from "../../store/slices/usuarios";
import AddIcon from '@mui/icons-material/Add';

export const DataTableUsuarios = () => {

  const dispatch = useDispatch();
  const { usuarios } = useSelector( state => state.usuarios )
  const { loading } = useSelector( state => state.ui );

  const columns = useMemo( () => columnsDtUsuarios() )

  useEffect(() => {
   dispatch( getUsuarios() );

  }, [])

  const handlesEditUsuario = ( dataUsuario ) =>{
        dispatch( getPermisosUsuario( dataUsuario ) )
        dispatch( uiOpenModal() );
  }

  const handlesPassChange = async( idUsuario ) =>{
    const { value: formValues } = await Swal.fire({
      title: 'Establecer nueva contraseña',
      html:
        '<p  class=" -mb-4 " >Nueva contraseña</p><input type="password" id="swal-input1" class="swal2-input text-center">' +
        '<p class= "mt-5 -mb-4">Cofirmar contraseña</p><input type="password" id="swal-input2" class="swal2-input text-center">',
      focusConfirm: true,
      preConfirm: () => {
        return [
          document.getElementById('swal-input1').value.trim(),
          document.getElementById('swal-input2').value.trim()
        ]
      }
    })

    if (formValues[0] === formValues[1] && formValues[0] !== "" && formValues[1] !== "" ) {
      dispatch( updatePassword({ idUsuario, password : formValues[0] }));
    }else{
      Swal.fire('Error',"Contraseña Invalida", 'error')
    }
  }


  const handlesOpenViewNewUsuario = () =>{
    dispatch( usuario_initialState() );
    dispatch( uiOpenModal() );
  }

  return (
    <>
        <MaterialReactTable
                  columns={ columns }
                  data={ usuarios }

                  enableColumnActions={ false }
                  enableDensityToggle ={ false }
                  enableFullScreenToggle={false}
                  enableHiding={ false }
                  enableRowActions
                  
                  localization={MRT_Localization_ES}
                  state={{
                    isLoading : loading
                  }}

                  renderTopToolbarCustomActions={() => 
                    <button 
                            className=" transition-all duration-200 bg-rose-500 text-cyan-50 hover:bg-rose-700 " 
                            onClick={ handlesOpenViewNewUsuario } >
                            <AddIcon fontSize="large" className=' -mt-1' /> 
                    </button>} 

                  renderRowActions={
                    ({row, table}) => [
                    <div className='flex'  key={row.original.idUsuario}>
                      {/* //<div className={` ${ row.original.status === 'C' ? 'invisible' : 'visible' }`}  > */}
                      <div>
                            <Tooltip arrow placement="left" title="Editar">
                              <IconButton color="default" onClick={ () => { handlesEditUsuario( row.original ) }} >
                                <Edit />
                              </IconButton>
                            </Tooltip>
                      </div>
                      <div >
                            <Tooltip arrow placement="right" title="Cambiar Password">
                               <IconButton color="defalt" onClick={() => { handlesPassChange( row.original.idUsuario ) }}>
                                 <Key />
                               </IconButton>
                             </Tooltip>

                       </div>
                    </div>
                    ]}

            />
    </>
  )
}
