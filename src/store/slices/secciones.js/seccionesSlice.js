import { createSlice } from '@reduxjs/toolkit';

export const seccionesSlice = createSlice({
    name: 'secciones',
    initialState: {
        counter: 10
    },
    reducers: {
        increment: (state, /* action */ ) => {
            state.counter += 1;
        },
    }
});
// Action creators are generated for each case reducer function
export const { increment } = seccionesSlice.actions;