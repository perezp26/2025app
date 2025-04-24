import { createSlice } from '@reduxjs/toolkit';

const asignacionPromocion = {
    idFicha : 0,
    figura : '',
    dFederal:0,
    dLocal : 0,
    ruta : 0,
    seccion : 0,
    idSeccion : ''
}
const fichaPromocion = { 
    idFicha : 0,
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
    puesto:'',
   }
export const fichaPromocionSlice = createSlice({
    name: 'fichaPromocion',
    initialState: {
        fichaPromocion : {},
        listFichaPromocion : [],
 },
    reducers: {
        fichaPromocionListarFichas : (state, action ) => {
            state.listFichaPromocion = [ ...action.payload ];
        },
        fichaPromocionSetDataFicha: ( state, action ) => {
            state.fichaPromocion = { ...action.payload }
        },
        fichaPromocionAsignacionInit : (state, action) =>{
            state.asignacionPromocion = { asignacionPromocion, ...action.payload }
        },
    }
});
// Action creators are generated for each case reducer function
export const { fichaPromocionListarFichas, fichaPromocionSetDataFicha, fichaPromocionAsignacionInit } = fichaPromocionSlice.actions;