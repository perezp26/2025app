import React, { useEffect } from 'react'
import { FormFichaPromocionData } from './FormFichaPromocionData'
import { Formik } from 'formik'
import { format } from 'date-fns-tz'
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux'
import { fichaPromocionAddNew, fichaPromocionUpdateFicha } from '../../store/slices/fichaPromocion/thunks'
import { useNavigate } from 'react-router-dom'
import { validacionesFichaPromocion } from '../../validation/validacionesFichaPromocion'

export const FormFichaPromocion = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { login } = useSelector(state => state.auth);
    const { usuario } = login;
    const { configFicha } = useSelector(state => state.ficha);
    const { fichaPromocion } = useSelector(state => state.fichaPromocion);
    const { estructura, figura, seccion, sustituye, figuraSustituye } = configFicha
    
    const handlesSubmit = (values) => {
      
      if (figura !== "COT" && values.idFicha === 0 ) {
        if (values.seccion === 0) {
          Swal.fire("error","Debe asignar una sección","error")
          return false;
        }
      }else{
        if (values.ruta === 0 && values.idFicha === 0 ){
          Swal.fire("error","Debe asignar una ruta","error")
          return false;
        }
      }

      if ( (figura === 'V' || figura === 'M') && values.idFicha === 0 && values.idFichaRs === 0  ){
        Swal.fire("error","debe seleccionar un Rs","error");
        return false;
      }

      if ( ( figura === 'M') && values.idFicha === 0 && values.idFichaV === 0  ){
        Swal.fire("error","debe seleccionar un Voluntario","error");
        return false;
      }

      if ( values.sustituye === 'SI' && values.figuraSustituye === '' ){
        Swal.fire("error","debe seleccionar un sustituto","error");
        return false;
      }
      
      Swal.fire({
        title: "Seguro que desea generar la ficha?",
        text: "",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si",
        cancelButtonText: "No"
      }).then((result) => {
        if (result.isConfirmed) {
          generaFicha(values) ;
        }
      });
    }
    
    
    const generaFicha = async (values) => {

      if ( values.idFicha === 0 ){
        const respuesta = await dispatch( fichaPromocionAddNew( {
          ...values,
          dLocal : figura === "COT" ? 0 : values.dLocal, 
          ruta : figura === "COT" ? values.ruta.value : values.ruta ,
          seccion : figura !== "COT" ? values.seccion.seccion : values.seccion,
          idSeccion : figura !== "COT" ? values.seccion.value : values.idSeccion,
          fechaFicha: format(new Date(values.fechaFicha),"yyyy-MM-dd").toString(),
          fechaCaptura: format(new Date(),"yyyy-MM-dd HH:mm:ss").toString(),
          clvElector : values.clvElector.toUpperCase(),
          estructura,
          figura,
          usuario,
          clvEquipoEsp : values.clvEquipoEsp?.value ?? ''
        } ) );
        
        respuesta && navigate('../fichapromocion');
      }else {
        const respuesta = await dispatch( fichaPromocionUpdateFicha( {...values,clvEquipoEsp : values.clvEquipoEsp?.value ?? ''} ));
        respuesta && navigate('../fichapromocion');
      }
    }
    
  const { idFicha, fechaFicha, clvElector, nombre, apellidoPaterno, apellidoMaterno, escolaridad, ocupacion, telFijo, telMovil, facebook, calle, numExt, cruzamientos, colonia, entidad, municipio, seccionIne, figuraEditar, clvEquipoEsp } = fichaPromocion
  return (
    <Formik
        initialValues={
            { 
            idFicha : !!idFicha ? idFicha : 0,
            fechaFicha: !!fechaFicha ? fechaFicha : '',
            nombre: !!nombre ? nombre : '',
            apellidoPaterno: !!apellidoPaterno ? apellidoPaterno : '',
            apellidoMaterno: !!apellidoMaterno ? apellidoMaterno : '',
            clvElector: !!clvElector ? clvElector : '',
            fechaNacimiento:'1900-01-01',
            edad:'',
            escolaridad: !!escolaridad ? escolaridad : '',
            ocupacion: !!ocupacion ? ocupacion : '',
            telFijo:  !!telFijo ? telFijo : '',
            telMovil: !!telMovil ? telMovil : '',
            facebook: !!facebook ? facebook : '',
            calle: !!calle ? calle : '',
            numExt: !!numExt ? numExt : '',
            cruzamientos: !!cruzamientos ? cruzamientos : '',
            codigoPostal:0,
            colonia: !!colonia ? colonia : '',
            entidad: !!entidad ? entidad : '',
            municipio: !!municipio ? municipio : '',
            seccionIne: !!seccionIne ? seccionIne : '',
            estado:'Yucatán',
            dFederal: sustituye === 'NO' ?  0 : seccion.dFederal,
            dLocal: sustituye === 'NO' ?  0 : seccion.dLocal,
            ruta: sustituye === 'NO' ?  0 : seccion.ruta,
            seccion: seccion,
            idSeccion:0,
            habilitado: !!idFicha ? true : false,
            figuraEditar : !!figuraEditar ? figuraEditar : '',
            idFichaRs : 0,
            idFichaV : 0,
            clvEquipoEsp: !!clvEquipoEsp ? clvEquipoEsp : '',
            sustituye : sustituye,
            figuraSustituye : figuraSustituye,
        }
        }
        //enableReinitialize= { true } 
        validationSchema={ validacionesFichaPromocion }
        onSubmit={ (values) => handlesSubmit( values ) }
    >
            {
            ({ errors, setFieldValue, values, touched, setValues, resetForm }) => {
            return( 

                    <FormFichaPromocionData 
                            errors={ errors } 
                            setFieldValue={ setFieldValue } 
                            setValues={ setValues } 
                            values ={ values } 
                            touched={ touched } 
                            resetForm={ resetForm }
                    />
            ) 

            }
            }
    </Formik>
  )
}
