import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select';
import { customStylesSelect } from '../formControls/customStylesSelect';
import { Spinner } from '../formControls/Spinner';
import { fichaPromocionAsignacionPorSustitucion, fichaPromocionAsignaRutaSeccion, fichaPromocionSetListFichas } from "../../store/slices/fichaPromocion/thunks";
import { uiCloseModal, uiEndLoading, uiOpenModal, uiStartLoading } from "../../store/slices/ui/uiSlice";
import Swal from "sweetalert2";
import { fetchSinToken } from "../../api/apiFetch";

export const FormAsignaRutaSeccion = () => {

    const dispatch = useDispatch();
    const {asignacionPromocion} = useSelector( state => state.fichaPromocion );
    const { idFicha, figura, sustituye, nombreFigura } = asignacionPromocion
    const { rutas, seccionesPromocion } = useSelector(state => state.casilla);
    
    const { loading, filterFigura } = useSelector( state => state.ui )
    const [values, setValues] = useState({ dFederal : 0, dLocal : 0, ruta : 0, seccion : 0, idFichaRs : 0, idFichaV: 0, sustituye : 'NO',figuraSustituye : ''   });
    const [rs, setRs] = useState( [] );
    const [voluntarios, setVoluntarios] = useState( [] );
    //const [figuraSustituye, setFiguraSustituye] = useState( [] );
    

     const handlesObtenerRs = async( e ) => {
        console.log( e.value );
        dispatch(uiStartLoading());
        const url = `fichaPromocion/getRsSeccion/${ e.value }`;
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

    // const handlesChangeSustitye = (sustituye) => {
    //     setValues({...values, sustituye:sustituye } );
    //         if ( sustituye === 'SI' ){
    //             handlesFiguraSustituye();
    //         }
    //     }
    
    // const handlesFiguraSustituye = async() => {
    //         dispatch(uiStartLoading());
    //         const url = figura === 'RS' ? `fichaPromocion/get-rsdeshabilitados` : `fichaPromocion/get-voldeshabilidos`;
    //         const resp = await fetchSinToken(url);
    //         const body = await resp.json();

    //         body.ok ? setFiguraSustituye( body.inhabilitadoBaja ) :  Swal.fire('Error', body.msg, 'error');
    //         dispatch(uiEndLoading());
    // }

     const handlesAsigna = async() =>{

        dispatch( uiCloseModal() );
        let valido = true;
        if (figura === 'COT'){
            if( values.ruta === 0 ){
            valido = false
            }
        }else {
            if( values.seccion === 0){
            valido = false
            }
        }
        
        if ((figura === "V" || figura === "M" || sustituye === "SI") && (values.idFichaRs === 0 || values.idFichaRs === '0') ){
            valido = false
        }

        if (figura === "M" || (figura === "V" && sustituye === "SI" ) && (values.idFichaV === 0 || values.idFichaV === '0') ){
            valido = false
        }

        if(!valido) {
            await   Swal.fire('error',"Datos incompletos","error");
            dispatch( uiOpenModal() );
            return false;
        }

        const data = {
            ...values,
            ruta : figura === "COT" ? values.ruta.value : values.ruta ,
            seccion : figura !== "COT" ? values.seccion.seccion : values.seccion,
            idSeccion : figura !== "COT" ? values.seccion.value : values.idSeccion,
            idFicha,
            figura
        }

        Swal.fire({
                        title: "Seguro que desea asignar a la persona?",
                        text: "",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Si",
                        cancelButtonText: "No"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            asigna(data ) ;
                        }
                    });
        
     }

      const asigna = async (values) => {
            if ( sustituye === 'NO'){
                const respuesta =  await dispatch( fichaPromocionAsignaRutaSeccion( values ) );             
                respuesta && dispatch( fichaPromocionSetListFichas( filterFigura ) )
            }else{
                const respuesta =  await dispatch( fichaPromocionAsignacionPorSustitucion( values ) );             
                respuesta && dispatch( fichaPromocionSetListFichas( filterFigura ) )
            }
         }


  return (
    <div className="w-full">
                {/* <div className="md:flex">
                {
                    (figura !== 'COT' && figura !== 'M' ) &&
                    <>
                    <div className='md:w-3/12 pl-5'>
                            <label className="block text-grey-darker text-sm font-light mb-1" >Sustituye</label>
                            <select className=' w-full border border-gray-300 rounded shadow p-2 focus:border-gray-400 focus:outline-0 focus:shadow ocus:shadow-gray-300 font-light'
                                    name='sustituye' value={ values.sustituye }  onChange={ (e) => handlesChangeSustitye(e.target.value) }  >
                                            <option value={'NO'} >NO</option>
                                            <option value={'SI'} >SI</option>
                            </select>
                    </div>
                    <div className='md:w-5/12 pl-5'>
                            <label className="block text-grey-darker text-sm font-light mb-1" > A quien sustituye </label>
                                    <Select 
                                        id="figuraSustituye" 
                                        name='figuraSustituye' 
                                        placeholder ="Seleccionar" 
                                        styles={{ ...customStylesSelect }}
                                        options={ figuraSustituye } 
                                        value = { values.figuraSustituye }
                                        onChange={ e=> {  setValues({...values, figuraSustituye : !!e ? e : '' } ) } }  
                                        isClearable = { true }
                                    />
                    </div>
                    </>
                }
                </div> */}
                <div className=" text-center">
                    {
                        sustituye === 'SI' && 
                        <h1 className=" text-2xl "> SUSTITUCIÓN DE { figura }</h1>
                    }
                </div>
                <div>
                    { 
                        nombreFigura
                    }
                </div>
                <hr />
                <div className='md:flex mt-5 w-full'>
                    <div className='md:w-1/12 pr-3'>
                            <label className="block text-grey-darker text-sm font-light mb-1" > Federal </label>
                            <label className="block text-grey-darker text-sm font-light mb-1" > { values.dFederal } </label>
                    </div>
                    <div className='md:w-1/12 pr-3'>
                            <label className="block text-grey-darker text-sm font-light mb-1" > Dto. Local </label>
                            <label className="block text-grey-darker text-sm font-light mb-1" > { values.dLocal } </label>
                    </div>
                    <div className='md:w-2/12 pr-5'>
                        {
                            figura === 'COT' ? 
                            <>
                            <label className="block text-grey-darker text-sm font-light mb-1" > Ruta </label>
                                <Select 
                                    id="ruta" 
                                    name='ruta' 
                                    placeholder ="seleccionar" 
                                    styles={{ ...customStylesSelect }}
                                    options={ rutas } 
                                    value = { values.ruta }
                                    onChange={ e=> {  setValues( {...values , ruta: !!e ? e : 0,  dFederal : !!e ? e.dFederal : 0, 
                                                                                                  dLocal   : !!e ? e.dLocal   : 0,  }) } }  
                                    isClearable = { true }
                                />
                            </>
                            :
                            <>
                            <label className="block text-grey-darker text-sm font-light mb-1" > Seccion </label>
                                <Select 
                                    id="seccion" 
                                    name='seccion' 
                                    placeholder ="seleccionar" 
                                    styles={{ ...customStylesSelect }}
                                    options={ seccionesPromocion } 
                                    value = { values.seccion }
                                    onChange={ e=> {  
                                                        setValues( {...values , seccion: !!e ? e : 0, dFederal : !!e ? e.dFederal : 0, 
                                                                                                    dLocal   : !!e ? e.dLocal   : 0, 
                                                                                                    ruta     : !!e ? e.ruta     : 0, });
                                                        !!e && (figura === 'V' || figura === 'M' || sustituye === 'SI') && handlesObtenerRs(e)
                                                    } }  
                                    //onBlur={ e => { figura === 'V' && handlesObtenerRs() } } 
                                    isClearable = { true }
                                />
                            </>
                        }
                    </div>
                    <div className='md:w-3/12 pr-3'>
                    {
                        (figura === 'V' || figura === 'M' || (sustituye === 'SI'  )) && 
                        !loading && 
                        <>
                            <label className="block text-grey-darker text-sm font-light mb-1" >{ `${ sustituye === 'SI' ? 'Susituye al ' : '' }` } Reperesentante de Sección </label>
                            <select className=' w-full border border-gray-300 rounded shadow p-2 focus:border-gray-400 focus:outline-0 focus:shadow ocus:shadow-gray-300 font-light'
                                 name='Rs' value={ values.idFichaRs }  onChange={ (e) => { setValues({...values, idFichaRs : e.target.value });
                                        (figura === 'V' || figura === 'M' || ( sustituye === 'SI' && figura === 'V' ) )  && handlesObtenerVoluntarios(e.target.value)
                                        }} 
                            >
                                            <option value={0} > Selecciona un Rs </option>
                                            {
                                                rs.map( x =>   <option key={x.idFicha} value={ x.idFicha }> {x.nombre}</option> )
                                            }
                            </select>
                        </> 
                    }
                    </div>
                    {
                        (figura === 'M' || (sustituye === 'SI' && figura === 'V') )&& !loading &&
                        <div className='w-3/12 ml-3'>
                            <label className="block text-grey-darker text-sm font-light mb-1" > { `${ sustituye === 'SI' ? 'Susituye al ' : '' }` } Voluntario </label>
                            <select className=' w-full border border-gray-300 rounded shadow p-2 focus:border-gray-400 focus:outline-0 focus:shadow ocus:shadow-gray-300 font-light'
                                    name='voluntarios' value={ values.idFichaV }  onChange={ (e) => setValues({...values, idFichaV : e.target.value} )} >
                                            <option value={0} > Selecciona un Voluntario </option>
                                            {
                                                voluntarios.map( x =>   <option key={x.idFicha} value={ x.idFicha }> {x.nombre}</option> )
                                            }
                            </select>
                        </div> 
                    }
                </div>

                <div className=' text-center'>
        {
            !loading ?
                <button type='button'
                        onClick={ () => handlesAsigna() }
                        className=' w-3/4 my-10 mx-5 rounded-sm p-2 ransition-all duration-200 bg-gray-600 text-gray-50 hover:bg-gray-700 hover:scale-103 active:tranform active:scale-90 active:bg-gray-900 '
                > Grabar </button>
                 :<Spinner />
        }
    </div>
    </div>
  )
}
