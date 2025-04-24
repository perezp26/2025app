import Swal from "sweetalert2";
import { fetchSinToken } from "../../../api/apiFetch";
import { uiEndLoading, uiStartLoading } from "../ui/uiSlice";
import { fichaListarFichas, fichaSetDataFicha, fichaUpdateStatusIneList } from "./fichaSlice";

export const fichaAddNew = (values) => {
    return async( dispatch ) => {
        dispatch( uiStartLoading() );

        const resp = await fetchSinToken(`ficha/add-newficha/`,{ ficha : { ...values } }, 'POST' );
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
export const fichaGetFichaEdit = (idFicha) => {
    return async( dispatch ) => {
        dispatch( uiStartLoading() );

        const resp = await fetchSinToken(`ficha/get-ficha/${ idFicha }` );
        const body = await resp.json();

        if (body.ok) {
            dispatch( fichaSetDataFicha( body.ficha ))
            dispatch( uiEndLoading() );
            return true;
        }else{
            Swal.fire('Error', body.msg, 'error');
            dispatch( uiEndLoading() );
            return false;
        }

    }
}

export const fichaUpdateFicha = (values) => {
    return async( dispatch ) => {
        dispatch( uiStartLoading() );

        const resp = await fetchSinToken(`ficha/updateficha`,{ficha :{...values} }, 'PUT' );
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

export const fichaValidaClvElector = (clvElector,figura ) => {
    return async( dispatch ) => {
        dispatch( uiStartLoading() );

        const resp = await fetchSinToken(`ficha/get-clvelector/${ clvElector }/${ figura }` );
        const body = await resp.json();

        if (body.ok) {
            dispatch( uiEndLoading() );
            return body;
        }else{
            Swal.fire('Error', body.msg, 'error');
        }

        dispatch( uiEndLoading() );
    }
}
export const fichaValidaMeta = (figura,idValida, sustituye) => {
    return async( dispatch ) => {
        dispatch( uiStartLoading() );

        const resp = await fetchSinToken(`valida/validaMetas/${ figura }/${ idValida }/${ sustituye }` );
        const body = await resp.json();
        console.log(body);
        
        dispatch( uiEndLoading() );
        if (body.ok) {
            return true;
        }else{
            Swal.fire('Error', body.msg, 'error');
            return false;
        }

        
    }
}

export const fichaSetListFichas = ({figura,dFederal}) => {
    return async( dispatch ) => {
        dispatch( uiStartLoading() );
        
        const resp = await fetchSinToken(`ficha/get-listfichas/${figura}/${dFederal}` );
        const body = await resp.json();

        if (body.ok) {
            
            dispatch( fichaListarFichas( body.fichas ) )
            dispatch( uiEndLoading() );
        }else{
            Swal.fire('Error', body.msg, 'error');
        }

        dispatch( uiEndLoading() );
    }
}

export const fichaDesasignarCasilla = ( values, filterFiguraEstructura, titulo, texto ) => {
    return async( dispatch ) => {
        Swal.fire({
            title: titulo,
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
                 const url = `ficha/desasignarregionseccion`;
                const resp = await fetchSinToken(url, { data : { ...values, motivo } }, 'PUT');
                const result = await resp.json()
    
                if (result.ok) {
                            dispatch( fichaSetListFichas( filterFiguraEstructura ) );
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

export const fichaUpdateStatusIne = (values) => {
    return async( dispatch ) => {
        dispatch( uiStartLoading() );
        
        const resp = await fetchSinToken(`ficha/udpatestatusine`,values,"PUT" );
        const body = await resp.json();

        if (body.ok) {
            dispatch( fichaUpdateStatusIneList( values ) ); 
            dispatch( uiEndLoading() );
        }else{
            Swal.fire('Error', body.msg, 'error');
        }

        dispatch( uiEndLoading() );
    }
}

