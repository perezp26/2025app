import { createSlice } from '@reduxjs/toolkit';

export const graficaSlice = createSlice({
    name: 'grafica',
    initialState: {
        graficaOes: { dto: [] , meta: [], oep: [] ,oes: [], angle: 0, textEtiqueta : '', data:[], regiones :[] }
    },
    reducers: {
        graficaSetDataGraficaOes: (state,  action ) => {
            
            state.graficaOes  = {   dto : action.payload.data.map( g => ( action.payload.textEtiqueta + g.dto.toString() ) ),
                                    meta :action.payload.data.map( g => ( g.total * 2 ) ),
                                    oep :action.payload.data.map( g => ( g.oeP ) ),
                                    oes :action.payload.data.map( g => ( g.oeS ) ),
                                    angle : action.payload.angle,
                                    data : action.payload.data,
                                    regiones : action.payload.regiones
             };
        },
    }
});
// Action creators are generated for each case reducer function
export const { graficaSetDataGraficaOes } = graficaSlice.actions;