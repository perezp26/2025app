import { createSlice } from '@reduxjs/toolkit';

const usuario = {
    idUsuario : 0,
    nombre : '',
    usuario : '',
    idPerfil : '',
    Perfil : '',
    password : '',
    password2 : '',
    permisos : [],
}

const perfil = {
    idPerfil : 0,
    descripcion : '',
    activo : '1'
}

const permiso = {
    idPermiso : 0,
    idModulo : 0,
    descripcion : '',
    activo : '1'
}

const modulo = {
    idModulo : 0,
    descripcion : '',
    activo : '1',
}

const permisosUsuarios = {
    idpermiso_usuario : '',
    idUsuario : 0,
    idPermiso : 0
}

export const usuariosSlice = createSlice({
    name: 'usuarios',
    initialState: {
        usuario,
        perfil,
        permiso,
        modulo,
        permisosUsuarios,
        usuarios: [],
        perfiles : [],
        modulos : []

    },
    reducers: {
        usuario_initialState: (state) => {
            state.usuario = usuario
        },
        usuarios_setListUsers: (state, action) =>{
            state.usuarios = action.payload
        },
        usuarios_setPerfilesModulos: ( state, action) =>{
            state.perfiles = action.payload.perfiles;
            state.modulos =  action.payload.modulos
        },
        usuarios_setUsuario: (state, action) =>{
            state.usuario = action.payload
        },
        usuarios_addNewUsuario: (state, action) =>{
            state.usuarios = [...state.usuarios, action.payload]
        },
        usuarios_updateUsuario: (state,action) => {
            state.usuarios = state.usuarios.map( u =>  u.idUsuario === action.payload.idUsuario ? { ...u, ...action.payload} : u )
        }
    }
});
// Action creators are generated for each case reducer function
export const    {  
                    usuario_initialState,
                    usuarios_setListUsers, 
                    usuarios_setPerfilesModulos,
                    usuarios_setUsuario,
                    usuarios_addNewUsuario,
                    usuarios_updateUsuario
                } = usuariosSlice.actions;