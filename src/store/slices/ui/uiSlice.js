import { createSlice } from '@reduxjs/toolkit';
import { format, subDays } from 'date-fns';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        checking : true,
        loading: false,
        viewModal : false,
        dates : {  dateStart :  format(subDays(new Date(), 15), 'yyyy-MM-dd' ) , dateEnd : format( new Date(), 'yyyy-MM-dd' ) },
        filterFigura :  { dFederal : -1, figura : 'COT' } ,
        filterFiguraEstructura :  { dFederal : -1, figura : 'RV' },
    },
    reducers: {
        uiStartLoading: (state, /* action */ ) => {
            state.loading= true;
        },
        uiEndLoading: (state) =>{
            state.loading = false;
        },
        uiOpenModal: ( state) =>{
            state.viewModal = true
        },
        uiCloseModal : (state) =>{
            state.viewModal = false
        },
        uiSetRangerFecha : ( state , action ) => {
            state.dates.dateStart = action.payload.dateStart;
            state.dates.dateEnd = action.payload.dateEnd;
        },
        uiChekingFinish: (state) =>{
            state.checking= false
        },
        uiSetFilterFigura: (state, action ) => {
            state.filterFigura = { ...state.filterFigura ,...action.payload }
        },
        uiSetFilterFiguraEstructura: (state, action ) => {
            state.filterFiguraEstructura = { ...state.filterFiguraEstructura, ...action.payload}
        }
    }
});
// Action creators are generated for each case reducer function
export const { uiStartLoading, uiEndLoading, uiOpenModal, uiCloseModal, uiSetRangerFecha, uiChekingFinish, uiSetFilterFigura, uiSetFilterFiguraEstructura } = uiSlice.actions;