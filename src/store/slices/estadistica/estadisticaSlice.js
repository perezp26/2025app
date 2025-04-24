import { createSlice } from '@reduxjs/toolkit';

export const estadisticaSlice = createSlice({
    name: 'estadistica',
    initialState: {
        estadisticaCaptura: {data:[], sumRv : 0, sumRvAcum:0, sumOe : 0, sumOeAcum:0, sumCot : 0, sumCotAcum:0, sumRs : 0, sumRsAcum:0,
                             sumV : 0, sumVAcum:0, sumM :0, sumMAcum:0, granTotal: 0, granTotalAcum : 0},
        estadisticaCotRs : [],
        metasEsperadas : [],
        estadisticaRvsOes : []        
    },
    reducers: {
        estadisticaSetEstadisticaCaptura: (state, action  ) => {
            
            const sumRv = action.payload.reduce( ( accumulator, currenValue ) => accumulator + currenValue.RV, 0 );
            const sumRvAcum = action.payload.reduce( ( accumulator, currenValue ) => accumulator + currenValue.acumuladoRv, 0 );
            const sumOe = action.payload.reduce( ( accumulator, currenValue ) => accumulator + currenValue.OE, 0 );
            const sumOeAcum = action.payload.reduce( ( accumulator, currenValue ) => accumulator + currenValue.acumuladoOE, 0 );
            const sumCot = action.payload.reduce( ( accumulator, currenValue ) => accumulator + currenValue.COTS, 0 );
            const sumCotAcum = action.payload.reduce( ( accumulator, currenValue ) => accumulator + currenValue.acumuladoCOTS, 0 );
            const sumRs = action.payload.reduce( ( accumulator, currenValue ) => accumulator + currenValue.RS, 0 );
            const sumRsAcum = action.payload.reduce( ( accumulator, currenValue ) => accumulator + currenValue.acumuladoRS, 0 );
            const sumV = action.payload.reduce( ( accumulator, currenValue ) => accumulator + currenValue.VS, 0 );
            const sumVAcum = action.payload.reduce( ( accumulator, currenValue ) => accumulator + currenValue.acumuladoV, 0 );
            const sumM = action.payload.reduce( ( accumulator, currenValue ) => accumulator + currenValue.MS, 0 );
            const sumMAcum = action.payload.reduce( ( accumulator, currenValue ) => accumulator + currenValue.acumuladoM, 0 );

            const granTotalAcum = sumRvAcum + sumOeAcum + sumCotAcum + sumRsAcum + sumVAcum + sumMAcum
            const granTotal = sumRv + sumOe + sumCot + sumRs + sumV + sumM;
            
            state.estadisticaCaptura = { data : action.payload, sumRv, sumRvAcum , sumOe, sumOeAcum, sumCot, sumCotAcum, sumRs, sumRsAcum, sumV, sumVAcum,
                 sumM, sumMAcum, granTotal, granTotalAcum };
        },

        estadisticaSetEstadisticaCotRs: (state, action) => {
            state.estadisticaCotRs = action.payload.data;
            state.metasEsperadas = action.payload.metasEsperadas;
        },

        estadisticaSetEstadisricaRvsOes : (state, action) =>{
            state.estadisticaRvsOes = action.payload;
        }
    }
});
// Action creators are generated for each case reducer function
export const { estadisticaSetEstadisticaCaptura, estadisticaSetEstadisticaCotRs, estadisticaSetEstadisricaRvsOes } = estadisticaSlice.actions;