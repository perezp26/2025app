import React, { useEffect } from 'react'
import { FormFichaData } from './FormFichaData'
import { Formik } from 'formik'
import { format } from 'date-fns-tz'
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux'
import { fichaAddNew, fichaUpdateFicha } from '../../store/slices/ficha/thunks'
import { validacionesFicha } from '../../validation/validacionesFicha'
import { useNavigate } from 'react-router-dom'
import { casillaSetReloadCasillas } from '../../store/slices/casilla.js/thunks'

export const FormFicha = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    
    const { login } = useSelector(state => state.auth);
    const { usuario } = login;
    const { configFicha, ficha } = useSelector(state => state.ficha);
    const { estructura, figura } = configFicha

    const handlesSubmit = (values) => {

      if ( figura === 'OE') {
          if (values.casilla !== '' && values.puesto === "" ){
            Swal.fire('error','debe capturar puesto','error');
            return false;
          }
      }

      if ( figura === 'RV' && values.region === 0) {
          Swal.fire('error','debe capturar región','error');
          return false;
      }else if ( figura === 'OE' && values.casilla === "" ) {
          Swal.fire('error','debe capturar casilla y puesto','error');
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

    const generaFicha = async(values) => {

      if (values.idFicha === 0){
        let zonaAtencion = {}
        
        if ( figura === 'RV' && values.region !== 0) {
          zonaAtencion = { dFederal : values.region.dFederal,  dLocal: values.region.dLocal,  region : values.region.value }
        }else if ( figura === 'OE' && values.casilla !== "" ) {
          zonaAtencion = { dFederal : values.casilla.dFederal, dLocal: values.casilla.dLocal, region : values.casilla.region, seccion : values.casilla.seccion,  casilla : values.casilla.casilla, idCasilla: values.casilla.value }
        }

  
        values.casilla === "" && values.puesto
        const respuesta = await dispatch( fichaAddNew( {
          ...values,
          fechaFicha: format(new Date(values.fechaFicha),"yyyy-MM-dd").toString(),
          fechaCaptura: format(new Date(),"yyyy-MM-dd HH:mm:ss").toString(),
          clvElector : values.clvElector.toUpperCase(),
          puesto : values.casilla === '' ? '' : values.puesto , 
          estructura,
          figura,
          usuario,
          ...zonaAtencion
        } ) );
        respuesta && navigate('../fichasestructura');
       
      } else {
        const respuesta = await dispatch( fichaUpdateFicha( values ) );
        respuesta && navigate('../fichasestructura');
      }  

    }
    // useEffect(() => {
    //   dispatch( casillaSetReloadCasillas())
      
    // }, [])

  const  { idFicha, clvElector, fechaFicha, nombre, apellidoPaterno, apellidoMaterno, telFijo, telMovil, mail, passMail, calle, numExt, numInt, codigoPostal, colonia, entidad, municipio } = ficha
  return (
    <Formik
        initialValues={
            { 
            idFicha : !!idFicha ? idFicha : 0,
            fechaFicha: !!fechaFicha ? fechaFicha : '',
            nombre: !!nombre ? nombre : '',
            apellidoPaterno: !!apellidoPaterno ? apellidoPaterno : '',
            apellidoMaterno: !!apellidoMaterno ? apellidoMaterno : '',
            clvElector: !!clvElector ? clvElector :  '',
            fechaNacimiento:'1900-01-01',
            edad:0,
            escolaridad:'',
            ocupacion:'',
            telFijo: !!telFijo ? telFijo : '',
            telMovil: !!telMovil ? telMovil : '',
            mail: !!mail ? mail : '',
            passMail: !!passMail ? passMail : '',
            calle: !!calle ? calle : '',
            numExt: !!numExt ? numExt :  '',
            numInt: !!numInt ? numInt : '',
            codigoPostal: !!codigoPostal ? codigoPostal :  '',
            colonia: !!colonia ? colonia : '',
            entidad: !!entidad ? entidad : '',
            municipio: !!municipio ? municipio : '',
            estado:'Yucatán',
            dFederal:0,
            dLocal:0,
            region:0,
            seccion:0,
            idCasilla: 0,
            casilla:'',
            tipoCasilla:'',
            puesto:'',
            habilitado: !!idFicha ? true : false,
        }
        }
        //enableReinitialize= { true } 
        validationSchema={ validacionesFicha }
        onSubmit={ (values) => handlesSubmit( values ) }
    >
            {
            ({ errors, setFieldValue, values, touched, setValues, resetForm }) => {
            return( 

                    <FormFichaData 
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
