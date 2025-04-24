
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select';
import { customStylesSelect } from '../formControls/customStylesSelect';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { uiCloseModal, uiOpenModal } from '../../store/slices/ui/uiSlice';
import { casillaAsignaCasilla } from '../../store/slices/casilla.js/thunks';
import { fichaSetListFichas } from '../../store/slices/ficha/thunks';
import { Spinner } from '../formControls/Spinner';

export const FormAsigna = () => {

    const dispatch = useDispatch();
    const { loading, filterFiguraEstructura } = useSelector( state => state.ui )
    const {asignacion} = useSelector( state => state.ficha );
    const { tipoAsignacion, idFicha } = asignacion
    const { regiones, casillas } = useSelector( state => state.casilla )

    const [values, setValues] = useState({ region: '', casilla: '', puesto: '' });

    const handlesAsigna = async () => {

        dispatch( uiCloseModal() );
        let valido = true;
        
        if (tipoAsignacion === 'RV'){
            if( values.region === '' ){
               valido = false
            }
        }else if(tipoAsignacion === 'OE') {
            if( values.casilla === '' || values.puesto === '' || values.puesto === 0){
              valido = false
            }
        }


        if(!valido) {
            await   Swal.fire('error',"Datos incompletos","error");
            dispatch( uiOpenModal() );
            return false;
        }

        const zonaAtencion = tipoAsignacion === 'RV' ?
                                        { region : values.region.value, dFederal : values.region.dFederal, dLocal: values.region.dLocal, seccion : 0, idCasilla : 0, puesto: '', casilla : '' }
                                      : { puesto : values.puesto, idCasilla: values.casilla.value, seccion : values.casilla.seccion, region : values.casilla.region, casilla : values.casilla.casilla, dFederal : values.casilla.dFederal, dLocal: values.casilla.dLocal}



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
                    asigna({...zonaAtencion, tipoAsignacion, idFicha } ) ;
                }
            });
        
    }
    
    const asigna = async (values) => {
        
        const respuesta =  await dispatch( casillaAsignaCasilla( values ) );
        
        respuesta && dispatch( fichaSetListFichas( filterFiguraEstructura ) );
    }
  return (
    <div className='p-10'>
    <div>{ tipoAsignacion == "RV" ? `Asignar Región` :  `Asignar Casilla` }</div>
    {
       tipoAsignacion === "OE" ?
       <div className='md:flex'> 
            <div className='md:flex md:w-1/4 mt-7'>
                <div>
                    <label className="block text-grey-darker text-sm font-light mb-1" > Sección / Casilla </label>
                        <Select 
                            id="casilla" 
                            name='casilla' 
                            placeholder ="seleccionar seccion / casilla" 
                            styles={{ ...customStylesSelect }}
                            options={ casillas } 
                             value = { values.casilla }
                             onChange={ e=> {  setValues(  !!e ? {...values, casilla : e } : {...values, casilla : ''} )} }  
                            isClearable = { true }
                    />
                </div>
            </div> 
        
            <div className='md:w-1/4 mt-7 ml-10'>
                <label className="block text-grey-darker text-sm font-light mb-1" > Posición </label>
                    <select className='w-full border border-gray-300 rounded shadow p-2 focus:border-gray-400 focus:outline-0 focus:shadow ocus:shadow-gray-300 font-light'
                                    name='puesto'  onChange={ (e) => setValues( {...values, puesto : e.target.value } )}  >
                                    <option  value={ 0 }> Selecciona</option>
                                    <option value = "P" > Propietario</option>
                                    <option value = "S" > Suplente</option>
                    </select>
            </div>
        </div>
        :
        <div className=' w-1/4 pt-7'>
                        <label className="block text-grey-darker text-sm font-light mb-1" > Región </label>
                        <Select 
                            id="region" 
                            name='region' 
                            placeholder ="seleccionar región" 
                            styles={{ ...customStylesSelect }}
                            options={ regiones } 
                             value = { values.region }
                             onChange={ e=> {  setValues(  !!e ? {...values, region : e } : {...values, region : ''} )} }  
                            isClearable = { true }
                        />
                </div>
    }

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
