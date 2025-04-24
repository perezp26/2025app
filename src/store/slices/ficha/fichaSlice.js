import { createSlice } from '@reduxjs/toolkit';
import { list } from 'postcss';

const asignacion = {
    idFicha : 0,
    tipoAsignacion : '',
    dFederal:0,
    dLocal : 0,
    region : 0,
    seccion : 0,
    casilla : '',
    idCasilla : 0,
    puesto : ''
}

const ficha = { idFicha : 0,
    nombre:'',
    apellidoPaterno:'',
    apellidoMaterno:'',
    clvElector:'',
    fechaNacimiento:'',
    edad:'',
    escolaridad:'',
    ocupacion:'',
    telFijo:'',
    telMovil:'',
    mail:'',
    calle:'',
    numExt:'',
    numInt:'',
    codigoPostal:'',
    colonia:'',
    entidad:'',
    municipio:'',
    estado:'Yucatán',
    dfederal:0,
    seccion:'',
    casilla:'',
    tipoCasilla:'',
    puesto:0,
   }

export const fichaSlice = createSlice({
    name: 'ficha',
    initialState: {
           ficha: {},
           configFicha : {
                estructura:'',
                figura:'',
                seccion: '',
                sustituye : 'NO',
                figuraSustituye : { value: 0 , label : ''},
           },
           listFichas : [],
           asignacion 
    },
    reducers: {
        fichaListarFichas : (state, action ) => {
            state.listFichas = [ ...action.payload ];
        },
        fichaAsignacionInit : (state, action) =>{
            state.asignacion = { asignacion, ...action.payload }
        },
        fichaSetDataFicha: ( state, action ) => {
            state.ficha = { ...action.payload }
        },
        /**compartido con promocion para la configuración de la ficha */
        fichaSetConfigFicha: (state, action ) => {
            state.configFicha.estructura = action.payload.estructura;
            state.configFicha.figura = action.payload.figura;
            state.configFicha.seccion = action.payload.seccion;
            state.configFicha.sustituye = action.payload.sustituye;
            state.configFicha.figuraSustituye = action.payload.figuraSustituye;
        },
        fichaUpdateStatusIneList: ( state, action ) => {
            state.listFichas = state.listFichas.map( x => x.idFicha === action.payload.idFicha ? { ...x, idStatusIne : action.payload.idStatusIne, fechaCapacitacion : action.payload.idStatusIne > 4 ? x.fechaCapacitacion : action.payload.fechaCapacitacion } : x )            
        }
    }
});
// Action creators are generated for each case reducer function
export const { fichaSetConfigFicha, fichaListarFichas, fichaAsignacionInit, fichaSetDataFicha, fichaUpdateStatusIneList } = fichaSlice.actions;