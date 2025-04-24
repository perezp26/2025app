import { Field, Form } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { uiCloseModal } from '../../store/slices/ui/uiSlice';
import { InputText, customStylesSelect } from '../formControls';


export const DataFormularioUsuario = ({ errors, setFieldValue, values, touched }) => {

    
    const dispatch = useDispatch();

    const { loading } = useSelector( state => state.ui )
    const { perfiles,modulos } = useSelector( state => state.usuarios )
    const [capturaPass, setCapturaPass] = useState(true)

    useEffect(() => {
       values.idUsuario > 0 && setCapturaPass(false)
       console.log( modulos);
       
    }, [ values.idUsuario ])
    

  return (
    <Form className="mt-10">
        <div className="md:flex">
            <div className="md:w-1/2 md:pr-7">
                <InputText
                        label="Nombre" 
                        name = "nombre"      
                        type="text"
                        placeholder= "Nombre"
                />
            </div>
            <div className="md:w-1/2 md:pr-7">
                <InputText 
                        label="Usuario" 
                        name = "usuario"
                        type="text"
                        placeholder= "Usuario"
                />
            </div>
        </div>

        <div className="md:flex mt-5">
            <div className="md:w-1/2 md:pr-7">
                <div className= { `${errors.idPerfil && touched.idPerfil ? 'mb-10' : 'mb-4'}` }>
                    <label className = "text-gray-800" htmlFor="idPerfil"> Perfil </label> 
                    <Select 
                       id="Perfil" 
                       name='Perfil' 
                       placeholder ="seleccionar un perfil" 
                       styles={{ ...customStylesSelect }}
                       options={ perfiles } 
                       value = { values.Perfil }
                       onChange={ e=> { setFieldValue( "Perfil", !!e ? e : '' ) } }            
                    />
                    {( errors.idPerfil && touched.idPerfil )  &&
                            <Alerta className=" -m-6 ml-0" >
                                    { errors.idPerfil.value }
                            </Alerta>
                    }
                </div>
            </div>
        </div>

        {
            capturaPass &&

            <div className="md:flex">
                <div className="md:w-1/2 md:pr-7">
                    <InputText 
                            label="Password" 
                            name = "password"
                            type="password"
                            placeholder= "Password"
                    />
                </div>
                <div className="md:w-1/2 md:pr-7">
                    <InputText 
                            label="Password" 
                            name = "password2"
                            type="password"
                            placeholder= "Confirmar el password"
                    />
                </div>
            </div>

        }

            <div className="grid grid-cols-6 gap-10 mt-7 px-5">
                    {
                        
                        modulos.map( ( {descripcion , permisos}  ) => {
                                return (
                                
                                    <div 
                                        key= {`div_${ descripcion }`}                                                    
                                    >
                                            <label 
                                                key = { descripcion }
                                                className = "text-gray-800 text-base font-medium"
                                            >
                                                { descripcion }
                                            </label>   
                                            {
                                                permisos.map(( {idpermiso, descripcion: nombrePermiso}) => {
                                                    return (         
                                                        
                                                        <div key={ `div_${ idpermiso }` }>
                                                                <label 
                                                                    className="inline-flex items-center"
                                                                    key = { idpermiso } >
                                                                    <Field 
                                                                            key={`chk${ idpermiso }`}  
                                                                            type="checkbox" 
                                                                            className = "w-3 h-3 rounded-full"
                                                                            name="permisos" 
                                                                            value= { `${idpermiso}`} />
                                                                    <span className="ml-2 text-sm"> { nombrePermiso } </span>
                                                                </label>
                                                        </div>
                                                    )
                                                })
                                            }                                                
                                    </div> 
                                            
                                )
                        })
                    }   
            </div>

            { 
                   !loading &&
                   <div className='flex'>
                   <div className='md:w-1/2 mt-6 md:px-4'>
                     <button type='button' onClick={ () => dispatch( uiCloseModal() ) } className='w-full bg-gray-400 text-white rounded-md py-2 transition hover:bg-gray-500 hover:shadow hover:shadow-slate-400' >Cancelar</button>    
                   </div>
                   <div className='md:w-1/2 mt-6 md:px-4'>
                     <button type='submit' className='w-full  bg-cyan-700 text-white rounded-md py-2 transition hover:bg-cyan-600 hover:shadow hover:shadow-slate-400' >Guardar</button>
                   </div>
                </div>
            }
    </Form>
  )
}
