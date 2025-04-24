import { Form } from 'formik'
import React, { useState } from 'react'
import { InputText } from '../formControls/InputText'
import { useDispatch, useSelector } from 'react-redux'
import { Spinner } from '../formControls/Spinner'
import Select from 'react-select';
import { customStylesSelect } from '../formControls/customStylesSelect';
import { fichaValidaClvElector, fichaValidaMeta } from '../../store/slices/ficha/thunks'
import DatePicker from 'react-datetime-picker';
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { uiEndLoading, uiStartLoading } from '../../store/slices/ui/uiSlice'
import { fetchSinToken } from '../../api/apiFetch'

export const FormFichaPromocionData = ({ errors, setFieldValue, values, touched, setValues, resetForm }) => {

    const navigate = useNavigate();
    const {loading} = useSelector( state => state.ui );
    const { configFicha } = useSelector(state => state.ficha);
    const { figura } = configFicha
    const { rutas, seccionesPromocion, equipoEsp } = useSelector(state => state.casilla);
    const dispatch = useDispatch();
    const [rs, setRs] = useState( [] );
    const [voluntarios, setVoluntarios] = useState( [] );
    const [figuraSustituye, setFiguraSustituye] = useState( [] );

    const handlesObtenerRs = async( ) => {
   
        dispatch(uiStartLoading());
        const url = `fichaPromocion/getRsSeccion/${ values.seccion.value }`;
        const resp = await fetchSinToken(url);
        const body = await resp.json();
        body.ok ? setRs( body.rs ) :  Swal.fire('Error', body.msg, 'error');
        dispatch(uiEndLoading());

    }
    const handlesObtenerVoluntarios = async(idFichaRs) => {
        dispatch(uiStartLoading());
        const url = `fichaPromocion/getVoluntariosSeccion/${ idFichaRs }`;
        const resp = await fetchSinToken(url);
        const body = await resp.json();
        body.ok ? setVoluntarios( body.voluntarios ) :  Swal.fire('Error', body.msg, 'error');
        dispatch(uiEndLoading());

    }

    const handlesChangeSustitye = (sustituye) => {
        setFieldValue("sustituye",sustituye)
        if ( sustituye === 'SI' ){
            handlesFiguraSustituye();
        }
    }

    const handlesFiguraSustituye = async() => {
        dispatch(uiStartLoading());
        const url = figura === 'RS' ? `fichaPromocion/get-rsdeshabilitados` : `fichaPromocion/get-voldeshabilidos`;
        const resp = await fetchSinToken(url);
        const body = await resp.json();

        body.ok ? setFiguraSustituye( body.inhabilitadoBaja ) :  Swal.fire('Error', body.msg, 'error');
        dispatch(uiEndLoading());
    }

    const validarClvElector = async() => {
        if (values.clvElector.trim() !== "" && ( values.ruta !== 0 || values.seccion !== 0 ) ){
        
            const respuesta = await dispatch(fichaValidaClvElector(values.clvElector.toUpperCase(), figura));
            if (respuesta.clvEstructura === null && respuesta.clvCot === null && respuesta.clvRs === null && respuesta.clvV === null) {
                
                const idValida = figura === "COT" ? values.ruta.value : values.seccion.value;
                const respuestaValidaMeta = await dispatch( fichaValidaMeta( figura, idValida, values.sustituye ) );
                
                if (respuestaValidaMeta) {
                    setFieldValue("habilitado", true) ;
                    (figura === 'V' || figura === 'M') && handlesObtenerRs()
                } 
                    
            
            }else {
                Swal.fire('error',"Esta clave de elector ya esta registrada","error");
            } 

        }else{
            Swal.fire('error',"Debe llenar todos los datos a validar","error");
        }
    }

  return (
    <div className='border border-red-800 p-4 m-2'>
         <Form className=''>
         <h1 className=' text-gray-700 text-xl font-light w-full' > { values.figuraEditar === '' ? `REGISTRO DE ALTA ${figura}` : `EDITAR REGISTRO ${values.figuraEditar}`}</h1>

         <div className='md:flex mt-5'>
         {values.idFicha === 0 &&
         <div className='md:w-3/12 pr-2'>
                            { 
                                figura === 'COT' ? 
                                <>
                                <label className="block text-grey-darker text-sm font-light mb-1" > Ruta </label>
                                    <Select 
                                        id="ruta" 
                                        name='ruta' 
                                        placeholder ="seleccionar ruta" 
                                        styles={{ ...customStylesSelect }}
                                        options={ rutas } 
                                        value = { values.ruta }
                                        onChange={ e=> {  setValues( {...values , ruta: !!e ? e : 0,dFederal : !!e ? e.dFederal : 0, 
                                                                                                    dLocal   : !!e ? e.dLocal   : 0,  }) } }  
                                        isClearable = { true }
                                        isDisabled = { values.habilitado }
                                    />
                                </>
                                :
                                <>
                                <label className="block text-grey-darker text-sm font-light mb-1" > Seccion </label>
                                    <Select 
                                        id="seccion" 
                                        name='seccion' 
                                        placeholder ="Seleccionar " 
                                        styles={{ ...customStylesSelect }}
                                        options={ seccionesPromocion } 
                                        value = { values.seccion }
                                        onChange={ e=> {  setValues( {...values , seccion: !!e ? e : 0, dFederal : !!e ? e.dFederal : 0, 
                                                                                                        dLocal   : !!e ? e.dLocal   : 0, 
                                                                                                        ruta     : !!e ? e.ruta     : 0, }) } }  
                                        isClearable = { true }
                                        isDisabled = { !values.habilitado && values.sustituye === 'NO' ? false : true}
                                        //onBlur={ e => {  (figura === 'V' || figura === 'M') && handlesObtenerRs() } }
                                    />
                                </>
                            }
            </div>
            }
            <div className='md:w-7/12 md:pr-2 mt-.5'>
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
            <div className='md:w-1/4 pr-3'>
                                <InputText name="seccionIne"  label="Sección INE" type="text" placeholder="Sección" error = {errors.seccionIne} disabled={ !values.habilitado }/>
                        </div>
         </div> 
         <div className='md:flex mt-5'>
                <div className='w-2/12'>
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
               
                {
                    values.idFicha === 0 &&
                    <>
                        <div className='md:w-1/12 mt-1 pl-5'>
                                <InputText name="dFederal" label="Dto Federal" type="text" placeholder="DF" error = {errors.dFederal} disabled={ true }/>
                        </div>
                        {
                                figura !== 'COT' &&
                                    <div className='md:w-1/12 mt-1 px-5'>
                                            <InputText name="dLocal" label="Dto Local" type="text" placeholder="DL" error = {errors.dLocal} disabled={ true } />
                                    </div>
                        }
                    </>
                }    
                        {
                               figura !== 'COT' && values.figuraEditar !== 'COT' &&
                               <div className='md:w-2/12 pl-5'>
                                <label className="block text-grey-darker text-sm font-light mb-1" > Ruta</label>
                                    <Select 
                                        id="clvEquipoEsp" 
                                        name='clvEquipoEsp' 
                                        placeholder ="Seleccionar" 
                                        styles={{ ...customStylesSelect }}
                                        options={ equipoEsp } 
                                        value = { values.clvEquipoEsp }
                                        onChange={ e=> {  setFieldValue( "clvEquipoEsp", !!e ? e : '' ) } }  
                                        isClearable = { true }
                                        isDisabled = { !values.habilitado }
                                    />
                                </div>
                               
                        }
                 {
                    (figura !== 'COT' && figura !== 'M' ) && values.idFicha === 0 && values.sustituye === 'SI' &&
                    <> 
                    <div className='md:w-5/12 pl-5 mt-7 text-lg'>  
                            { `SUSTITUYE A : ${values.figuraSustituye.label}` }
                            {/* <label className="block text-grey-darker text-sm font-light mb-1" >Sustituye</label>
                            <select className=' w-full border border-gray-300 rounded shadow p-2 focus:border-gray-400 focus:outline-0 focus:shadow ocus:shadow-gray-300 font-light'
                                    name='sustituye' value={ values.sustituye }  onChange={ (e) => handlesChangeSustitye(e.target.value) } disabled={ !values.habilitado } >
                                            <option value={'NO'} >NO</option>
                                            <option value={'SI'} >SI</option>
                            </select> */}
                    </div>
                            {/* <div className='md:w-3/12 pl-5'>
                            <label className="block text-grey-darker text-sm font-light mb-1" > A quien sustituye </label>
                                            <Select 
                                                id="figuraSustituye" 
                                                name='figuraSustituye' 
                                                placeholder ="Seleccionar" 
                                                styles={{ ...customStylesSelect }}
                                                options={ figuraSustituye } 
                                                value = { values.figuraSustituye }
                                                onChange={ e=> {  setFieldValue( "figuraSustituye", !!e ? e : '' ) } }  
                                                isClearable = { true }
                                                isDisabled = { !values.habilitado }
                                            />
                            </div> */}
                    </>
                }
                  
        </div>
        <div className='md:flex mt-5'>
        {
            (figura === 'V' || figura === 'M') && values.idFicha === 0 &&
            !loading &&
            <div className='w-1/2 mr-3'>
                <label className="block text-grey-darker text-sm font-light mb-1" > Reperesentante de Sección </label>
                <select className=' w-full border border-gray-300 rounded shadow p-2 focus:border-gray-400 focus:outline-0 focus:shadow ocus:shadow-gray-300 font-light'
                        name='Rs' value={ values.idFichaRs }  onChange={ (e) =>  {  setFieldValue("idFichaRs",e.target.value);
                                                                    figura === 'M' && handlesObtenerVoluntarios(e.target.value)
                        }} disabled={ !values.habilitado } >
                                <option value={0} > Selecciona un Rs </option>
                                {
                                    rs.map( x =>   <option key={x.idFicha} value={ x.idFicha }> {x.nombre}</option> )
                                }
                </select>
            </div> 
        }
        {
            figura === 'M' && values.idFicha === 0 && !loading &&
            <div className='w-1/2 ml-3'>
                <label className="block text-grey-darker text-sm font-light mb-1" > Voluntario </label>
                <select className=' w-full border border-gray-300 rounded shadow p-2 focus:border-gray-400 focus:outline-0 focus:shadow ocus:shadow-gray-300 font-light'
                        name='voluntarios' value={ values.idFichaV }  onChange={ (e) => setFieldValue("idFichaV",e.target.value)} disabled={ !values.habilitado } >
                                <option value={0} > Selecciona un Voluntario </option>
                                {
                                    voluntarios.map( x =>   <option key={x.idFicha} value={ x.idFicha }> {x.nombre}</option> )
                                }
                </select>
            </div> 
        }
        </div>
         <div className='p-2 border mt-3'>
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

        

         <div className='md:flex mt-5 border'>
            <div className='md:w-1/4 md:pr-2'>
                <InputText name="calle" label="Calle" type="text" placeholder="calle" error = {errors.calle} disabled={ !values.habilitado }/>
            </div>
            <div className='md:w-1/4 md:pr-2'>
                <InputText name="numExt" label="No. Exterior" type="text" placeholder="no. exterior" error = {errors.numExt} disabled={ !values.habilitado }/>
            </div>
            <div className='md:w-1/4 md:pr-2'>
                <InputText name="cruzamientos" label="Cruzamientos" type="text" placeholder="cruzamientos" error = {errors.cruzamientos} disabled={ !values.habilitado }/>
            </div>
            <div className='md:w-1/4 md:pr-2'>
                <InputText name="colonia" label="Colonia" type="text" placeholder="colonia" error = {errors.colonia} disabled={ !values.habilitado }/>
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
                    <div className='mx-auto border md:mt-5 ml-3 h-28 mr-2 p-1 px-4 py-3'>
                        <InputText name="facebook" label="facebook" type="text" placeholder="facebook" error = {errors.facebook} disabled={ !values.habilitado }/>
                    </div>
            </div>
         </div>

         <div className='md:flex mt-5'>
            <div className='md:w-1/2 md:pr-2'>
                <InputText name="ocupacion" label="ocupacion" type="text" placeholder="ocupacion" error = {errors.ocupacion} disabled={ !values.habilitado }/>
            </div>
            <div className='md:w-1/2 md:pr-2'>
                <InputText name="escolaridad" label="Escolaridad" type="text" placeholder="Escolaridad" error = {errors.escolaridad} disabled={ !values.habilitado }/>
            </div>
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
                onClick={ () => navigate('../fichapromocion') }
                className=' w-1/2 my-10 mx-5 text-black rounded-sm p-2 ransition-all duration-200 bg-slate-300 hover:bg-slate-400 hover:scale-103 active:tranform active:scale-90 active:bg-slate-600 '> 
                                Cancelar 
                </button>
            </div>
            :
            loading && <Spinner />
        }
         </Form>
    </div>   

  )
}
