import Swal from "sweetalert2";
import { fetchSinToken } from "../../../api/apiFetch";
import { uiEndLoading, uiStartLoading } from "../ui/uiSlice";
import { estadisticaSetEstadisricaRvsOes, estadisticaSetEstadisticaCaptura, estadisticaSetEstadisticaCotRs } from "./estadisticaSlice";

export const estadisticaGetEstadisticaCap = (values) => {
    return async( dispatch ) => {
        dispatch( uiStartLoading() );

       const resp = await fetchSinToken(`captura/get-estadisticacaptura/${ values.dateStart }/${ values.dateEnd }` );
       const body = await resp.json();

        if (body.ok) {
            dispatch( uiEndLoading( ) );
            dispatch( estadisticaSetEstadisticaCaptura( body.estadisticaUser ));
        }else{
            Swal.fire('Error', body.msg, 'error');
        }

        dispatch( uiEndLoading() );
    }
}


export const estadisticaGetEstadisticaCotsRs = (values,{ figura, distrito }) => {
    return async( dispatch ) => {
        dispatch( uiStartLoading() );

        const url = figura === 'RS' ? `captura/estadisticars/` : `captura/estadisticacot/`;
       const resp = await fetchSinToken(`${url}${ values.dateStart }/${ values.dateEnd }/${distrito}` );
       const body = await resp.json();

        if (body.ok) {
            
            dispatch( uiEndLoading() );
            dispatch( estadisticaSetEstadisticaCotRs( body ));
        }else{
            Swal.fire('Error', body.msg, 'error');
        }

        dispatch( uiEndLoading() );
    }
}

export const estadisticaGetEstadisticaRvs = ({ distrito }) => {
    return async( dispatch ) => {
        dispatch( uiStartLoading() );

        const url = `captura/estadisticarvs` ;
       const resp = await fetchSinToken(`${url}/${distrito}` );
       const body = await resp.json();

        if (body.ok) {
            console.log(body);
            
            dispatch( uiEndLoading() );
            dispatch( estadisticaSetEstadisricaRvsOes( body.data ));
        }else{
            Swal.fire('Error', body.msg, 'error');
        }

        dispatch( uiEndLoading() );
    }
}