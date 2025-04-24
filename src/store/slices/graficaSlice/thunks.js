import { fetchSinToken } from "../../../api/apiFetch";
import { uiEndLoading, uiStartLoading } from "../ui/uiSlice";
import { graficaSetDataGraficaOes } from "./graficaSlice";


export const graficaGetDataOes = (dto) => {
    return async( dispatch ) => {
        dispatch( uiStartLoading() );

        const resp = await fetchSinToken(`grafica/get-graficaEstructura/${dto}` );
        const body = await resp.json();

        if (body.ok) {
            dispatch( uiEndLoading() );
            
            const angle = dto === '0' ? 0 : 90;
            const textEtiqueta = dto === '0' ? 'Dto - ' : '';

            dispatch( graficaSetDataGraficaOes({data : body.grafica, regiones: body.regiones, angle, textEtiqueta  }));
        }else{
            Swal.fire('Error', body.msg, 'error');
        }

        dispatch( uiEndLoading() );
    }
}