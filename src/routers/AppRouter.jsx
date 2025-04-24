import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"

import { Init, Ficha} from '../pages';
import { Layout } from '../layouts/Layout';
import { PublicRoute } from "./PublicRouter";
import { PrivateRoute } from "./PrivateRouter";
import { FormFicha } from '../components/ficha/FormFicha';
import { useDispatch, useSelector } from 'react-redux';
import { Login } from '../pages/Login';
import { revalidaToken } from '../store/slices/authSlice';
import { Usuarios } from '../pages/Usuarios';
import { FormFichaPromocion } from '../components/fichaPromocion/FormFichaPromocion';
import { FichaPromocion } from '../pages/FichaPromocion';
import { casillaSetListCasillas } from '../store/slices/casilla.js/thunks';
import { uiChekingFinish } from '../store/slices/ui/uiSlice';
import { EstadisticasRvsOes } from '../pages/EstadisticasRvsOes';
import { EstadisticaCaptura } from '../pages/EstadisticaCaptura';
import { EstadisticaCotRs } from '../pages/EstadisticaCotRs';
import { LocalizaClvElector } from '../pages/LocalizaClvElector';

export const AppRouter = () => {

  const { login } = useSelector( state => state.auth );
  const dispatch = useDispatch();
  const [ autenticado, setAutenticado ] = useState( false );
  const { idUsuario, modulos } = login;


  useEffect(() => {
    localStorage.getItem('token') ? dispatch( revalidaToken() ) : dispatch( uiChekingFinish() );   
  }, []);


  useEffect(() => {
    setAutenticado( idUsuario === 0 ? false : true );

    if (idUsuario !== 0) {
      dispatch( casillaSetListCasillas() );
    }

  }, [idUsuario])

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={  <PublicRoute isAuthenticated={ autenticado }> <Login /> </PublicRoute> } /> 
      <Route path="/ficha"  element={<PrivateRoute isAuthenticated = { autenticado } ><Layout /> </PrivateRoute> }>
              <Route index element={ <Init /> } />
              <Route path="fichasestructura" element={ <PrivateRoute isAuthenticated={ autenticado } isValidPermiso={ modulos.includes(1) }><Ficha /></PrivateRoute> } />
              <Route path="formficha" element={ <PrivateRoute isAuthenticated={ autenticado } isValidPermiso={ modulos.includes(1) }><FormFicha /></PrivateRoute> } />
              <Route path="fichapromocion" element={ <PrivateRoute isAuthenticated={ autenticado } isValidPermiso={ modulos.includes(2) }><FichaPromocion /></PrivateRoute> } />
              <Route path="formfichapromocion" element={ <PrivateRoute isAuthenticated={ autenticado } isValidPermiso={ modulos.includes(2) }><FormFichaPromocion /></PrivateRoute> } />
              <Route path="localizaclave" element={ <PrivateRoute isAuthenticated={ autenticado } isValidPermiso={ modulos.includes(7) }><LocalizaClvElector /></PrivateRoute> } />
              <Route path="estadisticacaptura" element={ <PrivateRoute isAuthenticated={ autenticado } isValidPermiso={ modulos.includes(5) }><EstadisticaCaptura /></PrivateRoute> } />  
              <Route path="estadisticarvrs" element={ <PrivateRoute isAuthenticated={ autenticado } isValidPermiso={ modulos.includes(4) }><EstadisticaCotRs /></PrivateRoute> } /> 
              <Route path="estadisticaestructura" element={ <PrivateRoute isAuthenticated={ autenticado } isValidPermiso={ modulos.includes(6) }><EstadisticasRvsOes /></PrivateRoute> } /> 
              <Route path="usuarios" element={ <PrivateRoute isAuthenticated={ autenticado } isValidPermiso={ modulos.includes(3) }><Usuarios /></PrivateRoute> } />
      </Route>
    </Routes>
  </BrowserRouter>
  )
}
