import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNewUsuario, getPerfilesModulos, updateUsuario } from '../../store/slices/usuarios/thunks'
import { Formik } from 'formik'
import { DataFormularioUsuario } from './DataFormularioUsuario'
import { uiCloseModal } from '../../store/slices/ui/uiSlice'

export const FormUsuarios = () => {

  const dispatch =  useDispatch()

  const { usuario : dataUsuario} = useSelector( state => state.usuarios )
  const { idUsuario, nombre, usuario, idPerfil, Perfil, password, permisos } = dataUsuario 

  const handlesSubmit = ( data ) =>{
      const dataUsuario = {...data, idPerfil : data.Perfil.value  } ;
      data.idUsuario === 0 ? dispatch( addNewUsuario( dataUsuario ) ) :  dispatch( updateUsuario( dataUsuario ) );
      dispatch( uiCloseModal() )
  }

  return (
    <Formik 
            initialValues={{
              idUsuario, 
              nombre,
              usuario,
              Perfil, 
              password,
              password2 : '',
              permisos
        }}    
        enableReinitialize= { true } 
        // validationSchema={ validacionesClienteForm }
        onSubmit={ (values) => handlesSubmit(values)  }
        >
        {
        ({ errors, setFieldValue, values, touched }) => {
          return( 

                <DataFormularioUsuario errors={ errors } setFieldValue={ setFieldValue } values ={ values } touched={ touched } />
          ) 

        }
        }
        </Formik>
  )
}
