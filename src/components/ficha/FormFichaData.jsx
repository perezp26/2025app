import { Form } from 'formik'
import React, { useState } from 'react'
import { InputText } from '../formControls/InputText'
import { useDispatch, useSelector } from 'react-redux'
import { Spinner } from '../formControls/Spinner'
import Select from 'react-select';
import { customStylesSelect } from '../formControls/customStylesSelect';
import { fichaValidaClvElector } from '../../store/slices/ficha/thunks'
import DatePicker from 'react-datetime-picker';
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import Swal from 'sweetalert2'
import { Alerta } from '../formControls/Alerta'
import { useNavigate } from 'react-router-dom'

export const FormFichaData = ({ errors, setFieldValue, values, touched, setValues, resetForm }) => {

    const navigate = useNavigate();
    const {loading} = useSelector( state => state.ui );
    const { configFicha } = useSelector(state => state.ficha);
    const { figura } = configFicha
    const { regiones, casillas } = useSelector( state => state.casilla )
    const dispatch = useDispatch();
    //const [oesStatus, setOesStatus ] = useState({ oeP : 0, oeS : 0 });

    function dateFormat(value) {
        if (value.match(/^\d{2}$/) !== null) {
          return value + '/';
        } else if (value.match(/^\d{2}\/\d{2}$/) !== null) {
          return value + '/';
        }
        return value;
      }

    const validarClvElector = async() => {
        
        const respuesta = await dispatch(fichaValidaClvElector(values.clvElector.toUpperCase(), figura ));

        respuesta.clvEstructura === null && respuesta.clvCot === null && respuesta.clvRs === null && respuesta.clvV === null 
        ? setFieldValue("habilitado", true) : Swal.fire('error',"Esta clave de elector ya esta registrada","error");
    }
  return (
    <div className='border border-gray-300 p-4 m-2'>
         <Form className=''>
         <h1 className=' text-gray-700 text-xl font-light w-full' >REGISTRO DE ALTA DE { figura } </h1>

         <h2 className=' text-gray-700 text-lg font-light w-full mt-10' >DATOS PERSONALES</h2>
         <div className='md:flex mt-3'>
            <div className='md:w-6/12 md:pr-2'>
                <InputText name="clvElector" upperCase={ true } label="Clave de Elector" type="text" placeholder="clave de elector" error = {errors.clvElector} disabled={ values.habilitado }/>
            </div>
            <div className='md:w-2/12 md:pr-2'>
            {
                !loading && values.idFicha === 0 ?
                <button type='button'
                        onClick={ ()=> validarClvElector() }
                        disabled={ values.habilitado }
                        className=' mt-6 rounded-sm p-2 ransition-all duration-200 bg-gray-600 text-gray-50 hover:bg-gray-700 hover:scale-103 active:tranform active:scale-90 active:bg-gray-900 '> 
                        Validar 
                </button>
                :
                values.idFicha === 0 &&
                <div className='mt-6'>
                    <Spinner />
                </div>
            }
            </div>
         </div>
         <div className='md:flex mt-5'>
            <div className='w-1/4 my-5 '>
                    <div className='flex'>

                                <label className="block text-grey-darker text-sm font-light mb-1" > Fecha de Ficha </label>
                                {( errors.fechaFicha && touched.fechaFicha )  &&
                                <div className=' text-red-800 font-light text-sm'>Error de Fecha!!</div>
                        }
                    </div>
                                <DatePicker
                                            name="fechaFicha"
                                            className={`shadow mt2  w-full border rounded-lg  text-center border-gary-500 hover:outline-0 hover:border-gray-300 bg-white
                                                        `}
                                            styles={'border: none '}
                                            format='dd-MM-y'
                                            value={values.fechaFicha}
                                            onChange={date => {setFieldValue("fechaFicha", date)} }
                                            disabled={ !values.habilitado }
                                />
                                
                                
            </div>
            <div className='w-1/4 text-right pr-4'>
                <h2 className=' text-gray-700 text-lg font-light w-full mt-10' >ZONA DE ATENCIÓN : </h2>
            </div>
        {
            figura == 'OE' && values.idFicha === 0 ?
            <>
            
                <div className='md:flex md:w-1/4 mt-5'>
                    <div>
                        <label className="block text-grey-darker text-sm font-light mb-1" > Sección / Casilla </label>
                            <Select 
                                id="casilla" 
                                name='casilla' 
                                placeholder ="seleccionar seccion / casilla" 
                                styles={{ ...customStylesSelect }}
                                options={ casillas } 
                                value = { values.casilla }
                                onChange={ e=> {
                                    //const existe = !!e ?  casillas.filter( x => x.idCasilla === e.idCasilla )[0] : { ...oesStatus, oeP : -1, oeS : -1 }
                                    //setOesStatus( { ...oesStatus, oeP : existe.oeP, oeS : existe.oeS } )        
                                    // setValues( {...values , casilla: !!e ? e : '', puesto : ''} )

                                    setFieldValue( "casilla", !!e ? e : '' )
                                          } }  
                                isClearable = { true }
                                isDisabled = {!values.habilitado}
                        />
                    </div>
                </div> 
                
                    <div className='md:w-1/4 mt-5'>
                    <label className="block text-grey-darker text-sm font-light mb-1" > Posición </label>
                        <select className='w-full border border-gray-300 rounded shadow p-2 focus:border-gray-400 focus:outline-0 focus:shadow ocus:shadow-gray-300 font-light'
                                        name='puesto'  onChange={ e => setFieldValue("puesto", e.target.value ) }  
                                        disabled={ !values.habilitado }>
                                        <option  value=""> Selecciona</option>
                                        {/* {
                                           oesStatus.oeP === 0 && */}
                                           <option value = "P" > Propietario</option>
                                        {/* }
                                        {
                                           oesStatus.oeS === 0 && */}
                                           <option value = "S" > Suplente</option>
                                        {/* } */}
                                        
                                        
                            </select>
                    </div>

            </>
            : values.idFicha === 0 &&
            
                <div className=' w-1/4 pt-5'>
                        <label className="block text-grey-darker text-sm font-light mb-1" > Región </label>
                        <Select 
                            id="region" 
                            name='region' 
                            placeholder ="seleccionar región" 
                            styles={{ ...customStylesSelect }}
                            options={ regiones } 
                            value = { values.region }
                            onChange={ e=> {  setFieldValue( "region", !!e ? e : 0 )} }  
                            isClearable = { true }
                            isDisabled = {!values.habilitado}
                        />
                </div>
        }
        </div>
         <div className='p-2 border border-gray-300'>
            <div className='md:flex'>
                <div className='md:w-1/3 md:pr-2'>
                    <InputText name="nombre" label="Nombre(s)" type="text" placeholder="Nombre(s)" error = {errors.nombre} disabled={ !values.habilitado } />
                </div>
                <div className='md:w-1/3 md:pr-2'>
                    <InputText name="apellidoPaterno" label="Paterno" type="text" placeholder="Apellido Paterno" error = {errors.apellidoPaterno} disabled={ !values.habilitado }/>
                </div>
                <div className='md:w-1/3'>
                    <InputText name="apellidoMaterno" label="Materno" type="text" placeholder="Apellido Materno" error = {errors.apellidoMaterno} disabled={ !values.habilitado }/>
                </div>
            </div>
         </div>


         <div className='md:flex mt-5 border border-gray-300 pb-2'>
            <div className='md:w-1/4 md:pr-2 md:pl-2'>
                <InputText name="calle" label="Calle" type="text" placeholder="calle" error = {errors.calle} disabled={ !values.habilitado }/>
            </div>
            <div className='md:w-1/4 md:pr-2'>
                <InputText name="numExt" label="No. Exterior" type="text" placeholder="no. exterior" error = {errors.numExt} disabled={ !values.habilitado }/>
            </div>
            <div className='md:w-1/4 md:pr-2'>
                <InputText name="numInt" label="No. Interior" type="text" placeholder="no. interior" error = {errors.numInt} disabled={ !values.habilitado }/>
            </div>
            <div className='md:w-1/4 md:pr-2'>
                <InputText name="codigoPostal" label="Código Postal" type="text" placeholder="Código Postal" error = {errors.codigoPostal} disabled={ !values.habilitado }/>
            </div>
         </div>
         <div className='md:flex pt-2  border border-gray-300'>
            <div className='md:w-1/4 md:pr-2 md:pl-2'>
                <InputText name="colonia" label="Colonia" type="text" placeholder="colonia" error = {errors.colonia} disabled={ !values.habilitado }/>
            </div>
            <div className='md:w-1/4 md:pr-2'>
                <InputText name="entidad" label="Entidad" type="text" placeholder="entidad" error = {errors.entidad} disabled={ !values.habilitado }/>
            </div>
            <div className='md:w-1/4 md:pr-2'>
                <InputText name="municipio" label="Municipio" type="text" placeholder="Municipio" error = {errors.municipio} disabled={ !values.habilitado }/>
            </div>
         </div>

         <div className='md:flex mt-5'>
            <div className='md:w-2/6'>
                <div className=''>
                    <InputText name="telFijo" label="Teléfono Fijo" type="text" placeholder="teléfono fijo" error = {errors.telFijo} disabled={ !values.habilitado }/>
                </div>
                <div className='mt-2'>
                    <InputText name="telMovil" label="Teléfono Movil" type="text" placeholder="teléfono movil" error = {errors.telMovil} disabled={ !values.habilitado }/>
                </div>
            </div>
            <div className='md:w-4/6'>
                    <div className='mx-auto border border-gray-300 ml-3 h-32 mr-2 px-4 '>
                    <InputText name="mail" label="Correo Electrónico (obligatorio)" type="text" placeholder="correo electrónico" error = {errors.mail} disabled={ !values.habilitado }/>
                    <InputText name="passMail" label="Password Correo" type="text" placeholder="password electrónico" error = {errors.passMail} disabled={ !values.habilitado }/>
                    </div>
            </div>
         </div>
        <div className='md:flex'>
            
        </div>
        <hr />
        {
            values.habilitado &&  !loading ?
                <div className='md:flex'>
                    <button type='submit'
                            className=' w-1/2 my-10 mx-5 rounded-sm p-2 ransition-all duration-200 bg-gray-600 text-gray-50 hover:bg-gray-700 hover:scale-103 active:tranform active:scale-90 active:bg-gray-900 '> 
                        Grabar 
                    </button>

                    <button type='button'
                            onClick={ () => navigate('../fichasestructura') }
                            className=' w-1/2 my-10 mx-5 rounded-sm p-2 ransition-all duration-200 bg-slate-400 text-slate-50 hover:bg-slate-500 hover:scale-103 active:tranform active:scale-90 active:bg-slate-500 '> 
                        Cancelar 
                    </button>
                </div>
            : loading && <Spinner />
        }
         </Form>
    </div>   

  )
}
