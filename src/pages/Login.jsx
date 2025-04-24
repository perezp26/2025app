import { Formik } from 'formik'
import React from 'react'
import { validacionLogin } from '../validation/validationLogin';
import { FormLogin } from '../components/login/FormLogin';
import { useDispatch } from 'react-redux';
import { getLogin } from '../store/slices/authSlice';

export const Login = () => {

    const dispatch = useDispatch();
    const loginSchema = validacionLogin();

    const handlesSubmit = ( values ) => {
        dispatch( getLogin( values ) );
    }

  return (
    <Formik
            initialValues={ {
                usuario : '',
                password : ''
            } }     
            validationSchema={ loginSchema }
            onSubmit={ ( values ) => { handlesSubmit( values ) } }
    >
        {
            ({ errors, setFieldValue, values, touched }) => {
            return( 

                    <FormLogin errors={ errors } setFieldValue={ setFieldValue } values ={ values } touched={ touched } />
            ) 

            }
        }
    </Formik>
  )
}
