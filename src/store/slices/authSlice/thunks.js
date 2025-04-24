import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../../../api/apiFetch";
import { setLogin } from "./authSlice";
import { uiChekingFinish, uiEndLoading, uiStartLoading } from "../ui/uiSlice";


export const getLogin = (values) => {

    return async( dispatch, getState ) => {

        dispatch( uiStartLoading() );

        const { usuario, password  } = values
        const resp = await fetchSinToken ('auth', { usuario, password }, 'POST' );
        const body = await resp.json();

        if (body.ok) {
            localStorage.setItem( 'token', body.token );
            localStorage.setItem( 'toke-init-date', new Date().getTime() );
            dispatch( setLogin( body.usuario ) )
        } else{
            Swal.fire('Error', body.msg, 'error');
        }

        dispatch( uiEndLoading() );

    }

}

export const revalidaToken = () =>{
    return async( dispatch ) =>{

        const resp = await fetchConToken('auth/renew', {}, 'POST');
        const body = await resp.json();

        if (body.ok) {
            localStorage.setItem( 'token', body.token );
            localStorage.setItem( 'toke-init-date', new Date().getTime() );
            dispatch( setLogin( body.usuario ) )
        } else{
           // Swal.fire('Error', body.msg, 'error');
        }

        dispatch( uiChekingFinish() );
    }
}