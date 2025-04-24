import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    login: {
        idUsuario: 0,
        nombre: '',
        usuario: '',
        perfil: { value: 0, label: ''},        
        permisos: [],
        modulos:[],
    }
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

    setLogin: (state, action) => {
      state.login = action.payload
    },
    
    outLogin: () => initialState

  },
});
// Action creators are generated for each case reducer function
export const { setLogin, outLogin } = authSlice.actions;