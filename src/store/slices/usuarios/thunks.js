
import Swal from "sweetalert2";
import { fetchSinToken } from "../../../api/apiFetch";
import { uiEndLoading, uiStartLoading } from "../ui/uiSlice";
import { usuarios_addNewUsuario, usuarios_setListUsers, usuarios_setPerfilesModulos, usuarios_setUsuario, usuarios_updateUsuario } from "./usuariosSlices";


export const getUsuarios = () => {

    return async( dispatch, getState ) => {

        dispatch( uiStartLoading() );

        const resp = await fetchSinToken ( 'auth' );
        const body = await resp.json();
        if (body.ok) {
            dispatch( usuarios_setListUsers( body.usersResult ) )
        } else{
            Swal.fire('Error', body.msg, 'error');
        }

        dispatch( uiEndLoading() );

    }

}

export const getPerfilesModulos = () => {

    return async( dispatch, getState ) => {

        dispatch( uiStartLoading() );

        const resp = await fetchSinToken ( 'auth/get-perfiles-modulos' );
        const body = await resp.json();
        if (body.ok) {
            dispatch( usuarios_setPerfilesModulos( body ) )
        } else{
            Swal.fire('Error', body.msg, 'error');
        }

        dispatch( uiEndLoading() );

    }

}

export const getPermisosUsuario = ( dataUsuario ) => {

    return async( dispatch, getState ) => {

        dispatch( uiStartLoading() );

        const resp = await fetchSinToken (`auth/getpermisos-usuarios/${dataUsuario.idUsuario}`);
        const body = await resp.json();
        if (body.ok) {
            dispatch( usuarios_setUsuario( { ...dataUsuario, permisos : body.user_permisos } ) )
        } else{
            Swal.fire('Error', body.msg, 'error');
        }

        dispatch( uiEndLoading() );

    }

}

export const addNewUsuario = ( dataUsuario ) =>{

    return async( dispatch ) =>{
        dispatch( uiStartLoading() )

        const resp = await fetchSinToken(`auth/newuser/`, dataUsuario, 'POST');
        const body = await resp.json();


        if (body.ok) {
            dispatch( usuarios_addNewUsuario( {...dataUsuario, idUsuario : body.user.idUsuario} ) )
        } else {
            Swal.fire('Error', body.msg, 'error');
        }

        dispatch( uiEndLoading() )
    }
}

export const updateUsuario = ( dataUsuario ) =>{

    return async( dispatch ) =>{
        dispatch( uiStartLoading() )

        const resp = await fetchSinToken(`auth/updateuser/${dataUsuario.idUsuario}`, dataUsuario, 'PUT');
        const body = await resp.json()
        if (body.ok) {
            dispatch( usuarios_updateUsuario( dataUsuario ) )
        } else {
            Swal.fire('Error', body.msg, 'error');
        }

        dispatch( uiEndLoading() )
    }
}

export const updatePassword = ( {idUsuario, password} ) => {
    return async( dispatch ) => {
        dispatch( uiStartLoading() );
        const resp = await fetchSinToken(`auth/updatepassword/${ idUsuario }`,{ password }, 'POST');
        const body = await resp.json();
        if (body.ok) {
            Swal.fire('Correcto', body.msg, 'success');
        } else {
            Swal.fire('Error', body.msg, 'error');
        }

        dispatch( uiEndLoading() )
    }
}