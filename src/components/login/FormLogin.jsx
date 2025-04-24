import { Form } from 'formik';
import { useSelector } from 'react-redux';
import { Spinner } from '../formControls/Spinner';
//import logohraepy from '../../imgs/logo_hraepy.png'
import { InputText } from '../formControls';

export const FormLogin = () => {

    const { loading }  = useSelector( (state) => state.ui );

  return (
    <Form>
        <div className='grid place-items-center h-screen'>

            <div className="bg-white text-center shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
                
                {/* <img className='mx-auto' src={ logohraepy } alt="logoPasteleria" width={120} />  */}
                <h1 className=' text-3xl font-light '>PJD25-Yucatán</h1>
                <div className='mb-4 mt-7'>
                        <InputText label="Usuario" name="usuario" type="text" placeholder="Usuario" textCenter={ true } />
                </div>    
                <div className='mb-4 mt-7'>
                        <InputText label="Password" name="password" type="password" placeholder="*****" textCenter= { true } />
                </div>    
                
                <hr/>
                <div className='mb-4 mt-7'>
                    {
                        !loading ? 
                        
                        <button type="submit" className="w-full mt-6 rounded-sm p-2 ransition-all duration-200 bg-gray-600 text-gray-50 hover:bg-gray-700 hover:scale-103 active:tranform active:scale-90 active:bg-gray-900" > 
                        Ingresar 
                        </button>
                        :
                        <Spinner />
                    }
                    
                </div>
            </div>

            </div>
    </Form>
  )
}
