import { configureStore } from '@reduxjs/toolkit'
import { uiSlice } from './slices/ui/uiSlice'
import { usuariosSlice } from './slices/usuarios/usuariosSlices'
import { authSlice } from './slices/authSlice'
import { fichaSlice } from './slices/ficha/fichaSlice'
import { casillaSlice } from './slices/casilla.js/casillaSlice'
import { fichaPromocionSlice } from './slices/fichaPromocion/fichaPromocionSlice'
import { seccionesSlice } from './slices/secciones.js/seccionesSlice'
import { graficaSlice } from './slices/graficaSlice/graficaSlice'
import { estadisticaSlice } from './slices/estadistica/estadisticaSlice'

export const store = configureStore({
    reducer: {
          auth : authSlice.reducer, 
          casilla : casillaSlice.reducer,
          estadistica: estadisticaSlice.reducer,
          ficha : fichaSlice.reducer,
          fichaPromocion : fichaPromocionSlice.reducer,
          grafica : graficaSlice.reducer,
          secciones : seccionesSlice.reducer,
          ui : uiSlice.reducer,
          usuarios: usuariosSlice.reducer,
    },
  })