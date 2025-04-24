import { createSlice } from '@reduxjs/toolkit';

export const casillaSlice = createSlice({
    name: 'casilla',
    initialState: {
        casillas : [],
        dsFederales : [],
        dsLocales : [],
        regiones : [],
        rutas : [],
        secciones : [],
        seccionesPromocion : [],
        equipoEsp:[],
        statusIne : [],
    },
    reducers: {
        casillaSetCasillas: (state, action ) => {

            const { casillas, seccionesPromocion } = action.payload;
            /* CATALGOS ESTRUCUTRA  */
            const dsFederales = casillas.reduce((r,{dFederal, }) =>  (r[dFederal] = {label: dFederal, value: dFederal } , r ), {} );
            const dsLocales   = casillas.reduce((r,{dFederal, dLocal }) =>  (r[dLocal] = {label: dLocal, value: dLocal, dFederal: dFederal } , r ), {} );
            const regiones    = casillas.reduce((r,{dFederal, dLocal, region }) =>  (r[region] = {label: region, value: region, dFederal, dLocal, idCasilla : 0 } , r ), {} );

             state.dsFederales = Object.values(dsFederales);
             state.dsLocales   = Object.values(dsLocales);
             state.regiones    = Object.values(regiones);
             state.casillas    = casillas;
             
            /* CATALOGOS PROMOCION */
            const rutas    = seccionesPromocion.reduce((r,{dFederal, dLocal, ruta }) =>  (r[ruta] = {label: ruta, value: ruta, dFederal, dLocal } , r ), {} );
            state.rutas       = Object.values(rutas);
            state.seccionesPromocion = seccionesPromocion;

            state.equipoEsp = action.payload.equipoEsp;
            state.statusIne = action.payload.status_Ine;
        },

        casillasReloadCasillas: (state, action) => {
            state.casillas    = action.payload.casillas;
        }
    }
});
// Action creators are generated for each case reducer function
export const { casillaSetCasillas,casillasReloadCasillas } = casillaSlice.actions;