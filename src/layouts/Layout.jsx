import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation } from "react-router-dom";
import { outLogin } from "../store/slices/authSlice";


export const Layout = () => {
    
    const dispatch = useDispatch();
    const location = useLocation();
    const urlActual = location.pathname;
    
    const { login } = useSelector( state => state.auth );
    const { modulos } = login

    const handlesLogout = () => {
        localStorage.clear();
        dispatch( outLogin() );
    };
  return (
    <div className="md:flex md:min-h-screen bg-gray-100">
        <div className="md:w-2/12 md:min-h-screen bg-gray-700">
                <h1 className=" mt-2 text-xl font-light text-center text-white">
                        
                </h1>   
                <hr />
                <nav className="mt-3 px-5">
                    {
                        modulos.includes(1) &&
                            <Link 
                                    className={`flex transition-all duration-200 ${ urlActual == '/ficha/fichasestructura' ? ' text-slate-400 ' : ' text-white ' }  text-xl block hover:text-gray-400 `} 
                                    to='/ficha/fichasestructura'
                            >
                                <p className="font-light text-lg"> - Fichas Estructura</p> 
                            </Link>
                    }
                </nav>
                <nav className="mt-3 px-5">
                    {
                        modulos.includes(2) &&
                            <Link 
                                    className={`flex transition-all duration-200 ${ urlActual == '/ficha/fichapromocion' ? ' text-slate-400 ' : ' text-white ' }  text-xl block hover:text-gray-400 `} 
                                    to='/ficha/fichapromocion'
                            >
                                <p className="font-light text-lg"> - Fichas Promocion</p> 
                            </Link>
                    }
                </nav>
                <nav className="mt-3 px-5">
                    {
                        modulos.includes(7) &&
                            <Link 
                                    className={`flex transition-all duration-200 ${ urlActual == '/ficha/localizaclave' ? ' text-slate-400 ' : ' text-white ' }  text-xl block hover:text-gray-400 `} 
                                    to='/ficha/localizaclave'
                            >
                                <p className="font-light text-lg"> - Localiza Clave</p> 
                            </Link>
                    }
                </nav>
                 <nav className="mt-3 px-5">
                    {
                        modulos.includes(5) &&
                            <Link 
                                    className={`flex transition-all duration-200 ${ urlActual == '/ficha/estadisticacaptura' ? ' text-slate-400 ' : ' text-white ' }  text-xl block hover:text-gray-400 `} 
                                    to='/ficha/estadisticacaptura'
                            >
                                <p className="font-light text-lg"> - Estadisticas Cap.</p> 
                            </Link>
                    }
                </nav>
                <nav className="mt-3 px-5">
                    {
                        modulos.includes(4) &&
                            <Link 
                                    className={`flex transition-all duration-200 ${ urlActual == '/ficha/estadisticarvrs' ? ' text-slate-400 ' : ' text-white ' }  text-xl block hover:text-gray-400 `} 
                                    to='/ficha/estadisticarvrs'
                            >
                                <p className="font-light text-lg"> - Estadistica Cot-Rs.</p> 
                            </Link>
                    }
                </nav>
                
                <nav className="mt-3 px-5">
                    {
                        modulos.includes(6) &&
                            <Link 
                                    className={`flex transition-all duration-200 ${ urlActual == '/ficha/estadisticaestructura' ? ' text-slate-400 ' : ' text-white ' }  text-xl block hover:text-gray-400 `} 
                                    to='/ficha/estadisticaestructura'
                            >
                                <p className="font-light text-lg"> -Estdistica Rvs-Oes</p> 
                            </Link>
                    }
                </nav> 
                <nav className="mt-3 px-5">
                    {
                        modulos.includes(3) &&
                            <Link 
                                    className={`flex transition-all duration-200 ${ urlActual == '/ficha/usuarios' ? ' text-slate-400 ' : ' text-white ' }  text-xl block hover:text-gray-400 `} 
                                    to='/ficha/usuarios'
                            >
                                <p className="font-light text-lg"> - usuarios</p> 
                            </Link>
                    }
                </nav>

                <button type="button" className=" transition duration-150 bg-cyan-50 text-slate-600 py-3 w-full hover:bg-slate-300 mt-10" onClick={ handlesLogout } >Salir</button>
        </div>
        <div className="md:w-10/12 ">
                <Outlet />
        </div>
    </div>
  )
}
