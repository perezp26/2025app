import * as Yup from 'yup';

export const  validacionesFichaPromocion  = () => (
    Yup.object().shape({
        //seccion: Yup.object().shape({ value: Yup.string().required(' requerido ') }),
        nombre: Yup.string().required('es requerido'),
        apellidoPaterno: Yup.string().required('es requerido'),
        seccionIne : Yup.number('Debes ser númerico').required('es requerido'),
        fechaFicha: Yup.date("debe ser fecha").required('es requerido'),
    })
)