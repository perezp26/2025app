import { useEffect } from "react";
import { ModalForm } from "../components/formControls/";
import { DataTableUsuarios } from "../components/usuarios/DataTableUsuarios"
import { FormUsuarios } from "../components/usuarios/FormUsuarios";
import { useDispatch } from "react-redux";
import { getPerfilesModulos } from "../store/slices/usuarios/thunks";


export const Usuarios = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch( getPerfilesModulos() );
  }, [])
  

  return (
    <>
        <h1 className=' text-gray-700 text-3xl w-full p-4 mt-5' >Usuarios</h1>
        <hr/>
        <div className="md:flex bg-white rounded-md shadow-md m-4 ">
              <div className="w-full">
                  <DataTableUsuarios />
              </div>
        </div>
        <ModalForm>
          <FormUsuarios />
        </ModalForm>
    </>
  )
}
