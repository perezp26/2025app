
import Swal from "sweetalert2";
import { fetchSinToken } from "../../../api/apiFetch";
import { uiEndLoading, uiStartLoading } from "../ui/uiSlice";
import { fichaPromocionListarFichas, fichaPromocionSetDataFicha } from "./fichaPromocionSlice";

export const fichaPromocionAddNew = (values) => {
    return async( dispatch ) => {
        dispatch( uiStartLoading() );

        const resp = await fetchSinToken(`fichaPromocion/add-newficha/`,{ ficha : { ...values } }, 'POST' );
        const body = await resp.json();

        if (body.ok) {
            Swal.fire('ok', 'datos guardados correctamente', 'success');
            dispatch( uiEndLoading() );
            return true;
        }else{
            Swal.fire('Error', body.msg, 'error');
            dispatch( uiEndLoading() );
            return false;
        }

    }
}

export const fichaPromocionSetListFichas = ({figura, dFederal}) => {
    return async( dispatch ) => {
        dispatch( uiStartLoading() );

        const resp = await fetchSinToken(`fichaPromocion/get-listfichaspromocion/${figura}/${dFederal}` );
        const body = await resp.json();

        if (body.ok) {
            dispatch( fichaPromocionListarFichas( body.fichas ) )
            dispatch( uiEndLoading() );
        }else{
            Swal.fire('Error', body.msg, 'error');
        }

        dispatch( uiEndLoading() );
    }
}

export const fichaPromocionGetFichaEdit = (idFicha,figura) => {
    return async( dispatch ) => {
        dispatch( uiStartLoading() );

        const resp = await fetchSinToken(`fichaPromocion/getfichaupdate/${ idFicha }/${ figura }` );
        const body = await resp.json();

        if (body.ok) {
            dispatch( fichaPromocionSetDataFicha( body.ficha ))
            dispatch( uiEndLoading() );
            return true;
        }else{
            Swal.fire('Error', body.msg, 'error');
            dispatch( uiEndLoading() );
            return false;
        }

    }
}

export const fichaPromocionUpdateFicha = (values) => {
    return async( dispatch ) => {
        dispatch( uiStartLoading() );

        const resp = await fetchSinToken(`fichaPromocion/updatefichapromocion`,{ficha :{...values} }, 'PUT' );
        const body = await resp.json();

        if (body.ok) {
            Swal.fire('ok', 'datos guardados correctamente', 'success');
            dispatch( uiEndLoading() );
            return true;
        }else{
            Swal.fire('Error', body.msg, 'error');
            dispatch( uiEndLoading() );
            return false;
        }

    }
}

export const fichaPromocionDesasignarSeccion = ( values, filterFigura, titulo, texto ) => {
    return async( dispatch ) => {
        Swal.fire({
            title: titulo ,
            text: texto,
            type: 'question',
            input: 'text',
            inputPlaceholder: 'Motivo',
            inputValue: '',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Aceptar',
            focusConfirm: false,
            inputValidator: (value) => {
                if (!value) {
                  return 'Necesita escribir un motivo'
                }
              }
          }).then( async(result) => {
            const motivo  = result.value;
            
            if (result.value) {
                const url = `fichaPromocion/desasignaceccionfichapromocion`;
                const resp = await fetchSinToken(url, { data : { ...values, motivo } }, 'PUT');
                const result = await resp.json()
    
                if (result.ok) {
                            //dispatch( ordenesUpdateListOrdenes( { idOrden : data.idOrden, status: data.status } ) );
                            dispatch( fichaPromocionSetListFichas( {figura : filterFigura, dFederal :values.dFederal} ) );
                            Swal.fire('Ok','Los datos se guardaron','success');
                            return true;
                }else{
                  Swal.fire('Error',result.msg,'error');
                      return false;
                }
            }
    
           
    
            
          })

    }
}

export const fichaPromocionAsignaRutaSeccion = (values) => {
    return async( dispatch ) => {
        dispatch( uiStartLoading() );

        const resp = await fetchSinToken(`fichaPromocion/asignarutaseccionfichapromocion`,{ficha :{...values} }, 'PUT' );
        const body = await resp.json();

        if (body.ok) {
            Swal.fire('ok', 'datos guardados correctamente', 'success');
            dispatch( uiEndLoading() );
            return true;
        }else{
            Swal.fire('Error', body.msg, 'error');
            dispatch( uiEndLoading() );
            return false;
        }

    }
}

export const fichaPromocionAsignacionPorSustitucion = (values) => {
    return async( dispatch ) => {
        dispatch( uiStartLoading() );

        const resp = await fetchSinToken(`movimientospromocion/update-rubicaporsustitucion`,{ficha :{...values} }, 'PUT' );
        const body = await resp.json();

        if (body.ok) {
            Swal.fire('ok', 'datos guardados correctamente', 'success');
            dispatch( uiEndLoading() );
            return true;
        }else{
            Swal.fire('Error', body.msg, 'error');
            dispatch( uiEndLoading() );
            return false;
        }

    }
}