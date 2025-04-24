import { ErrorMessage, useField } from "formik";


export const InputText = ( { label, error= undefined , labelClassName, textCenter= false, upperCase = false, ...props} ) => {
    
    const [ field ] = useField(props);
  return (
        <>
            <div className="flex">
                <label 
                    htmlFor={ props.id || props.name }
                    className="block text-grey-darker text-sm font-light mb-1"//className= { labelClassName }
                >
                        { label }
                </label>
                
                <ErrorMessage name={ props.name} component="span" className="text-xs text-red-700 m-0.5"/>
            </div>
            
            <input {...field} {...props} className={`font-light, text-sm
                                                    shadow appearance-none rounded w-full py-2 px-2 text-grey-darker ${ textCenter ? 'text-center' : '' }
                                                    focus:border-gray-400 focus:outline-0 focus:shadow focus:shadow-gray-400  
                                                     hover:outline-0 hover:gray-gray-400 ${ !!error ? '' : '' }
                                                     ${ upperCase &&  'text-transform: uppercase' }
                                                    `} 
                                                  />
            
        </>
  )
}