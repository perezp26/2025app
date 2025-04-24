import * as Yup from 'yup';

export const  validacionLogin  = () => (
    Yup.object().shape({
        usuario: Yup.string().required('campo obligatorio'),
        password: Yup.string().required('campo obligatorio'),
    })
)