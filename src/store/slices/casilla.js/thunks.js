import Swal from "sweetalert2";
import { uiStartLoading,uiEndLoading } from "../ui/uiSlice";
import { casillaSetCasillas, casillasReloadCasillas } from "./casillaSlice";
import { fetchSinToken } from "../../../api/apiFetch";

export const casillaSetListCasillas = () => {
    return async( dispatch ) => {
        dispatch( uiStartLoading() );

        const resp = await fetchSinToken(`casilla/get-casillas` );
        const body = await resp.json();

        if (body.ok) {
            dispatch( casillaSetCasillas( body ) )
            dispatch( uiEndLoading() );
        }else{
            Swal.fire('Error', body.msg, 'error');
        }

        dispatch( uiEndLoading() );
    }
}


export const casillaAsignaCasilla = (values) => {
    return async( dispatch ) => {
        dispatch( uiStartLoading() );

        const resp = await fetchSinToken(`casilla/asignar-regioncasilla`, { data : { ...values } },'POST' );
        const body = await resp.json();

        dispatch( uiEndLoading() );
        if (body.ok) {
            Swal.fire( 'OK','se asigno correctamente','success' )
            return true;
        }else{
            Swal.fire('Error', body.msg, 'error');
            return false;
        }

        
    }
}

export const casillaSetReloadCasillas = () => {
    return async( dispatch ) => {
        dispatch( uiStartLoading() );

        const resp = await fetchSinToken(`casilla/getreloadcasillas` );
        const body = await resp.json();

        if (body.ok) {
            dispatch( casillasReloadCasillas( body ) )
            dispatch( uiEndLoading() );
        }else{
            Swal.fire('Error', body.msg, 'error');
        }

        dispatch( uiEndLoading() );
    }
}