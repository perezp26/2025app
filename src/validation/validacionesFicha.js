import * as Yup from 'yup';

export const  validacionesFicha  = () => (
    Yup.object().shape({
        // fechaNacimiento: Yup.date("debe ser fecha").required('es requerido'),
        // edad: Yup.number()
        //     .integer(' números sin decimales')
        //     .required(' es requerido '),
        nombre: Yup.string().required('es requerido'),
        apellidoPaterno: Yup.string().required('es requerido'),
        mail : Yup.string().email('correo no valido').required('es requerido'),
        codigoPostal : Yup.number('Debes ser númerico').required('es requerido'),
        fechaFicha: Yup.date("debe ser fecha").required('es requerido'),
    })
)