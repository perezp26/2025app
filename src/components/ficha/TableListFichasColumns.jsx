
export const TableListFichasColumns = (figura,update, statusIne, permiso ) => [
    {
        accessorFn: (originalRow) => `${ originalRow.nombre } ${ originalRow.apellidoPaterno} ${ originalRow.apellidoMaterno }`,
        id: 'nombre', //simple recommended way to define a column
        header: 'Nombre',
        muiTableHeadCellProps: { sx: { color: '#4b5563' } }, //custom props
        size: 200,
    },
    {
        accessorKey: 'clvElector', //simple recommended way to define a column
        header: 'Clv Elector',
        muiTableHeadCellProps: { sx: { color: '#4b5563' } }, //custom props
        size: 70,
    }, 
    {
        accessorKey: 'mail', //simple recommended way to define a column
        header: 'Correo Electrónico',
        muiTableHeadCellProps: { sx: { color: '#4b5563' } }, //custom props
        size: 70,
    }, 
    {
        accessorKey: 'passMail', //simple recommended way to define a column
        header: 'Contraseña',
        muiTableHeadCellProps: { sx: { color: '#4b5563' } }, //custom props
        size: 20,
    }, 
    {
        accessorKey: 'dFederal', //simple recommended way to define a column
        header: 'Dto. Fed.',
        muiTableHeadCellProps: { sx: { color: '#4b5563' } }, //custom props
        size: 7,
    },
    {
        accessorKey: 'dLocal', //simple recommended way to define a column
        header: 'Dto. Loc.',
        muiTableHeadCellProps: { sx: { color: '#4b5563' } }, //custom props
        size: 7,
    },
    {
        accessorFn: (originalRow) => `${ originalRow.region !== null && originalRow.region !== 0 ? originalRow.region : '' }`,
        header: 'Región',
        muiTableHeadCellProps: { sx: { color: '#4b5563' } }, //custom props
        size: 20,
    }, 
    {
        accessorFn: (originalRow) => `${ originalRow.seccion !== null && originalRow.seccion !== 0 ? originalRow.seccion : '' }-${ originalRow.casilla !== null && originalRow.casilla !== 0 ? originalRow.casilla : '' }`,
        header: 'Sección-Casilla',
        muiTableHeadCellProps: { sx: { color: '#4b5563' } }, //custom props
        size: 20,
    }, 
    {
        accessorKey: 'figura', //simple recommended way to define a column
        header: '',
        muiTableHeadCellProps: { sx: { color: '#4b5563' } }, //custom props
        size: 5,
    }, 
    {
        accessorKey: 'puesto', //simple recommended way to define a column
        header: '',
        muiTableHeadCellProps: { sx: { color: '#4b5563' } }, //custom props
        size: 5,
    }, 
    
    figura === 'OE' ? {
        id:'statusIne',
        header: 'Status Ine',
        Cell:({ renderedCellValue,row }) =>(

                   <select className=' w-30 border border-gray-300 rounded shadow p-2 focus:border-gray-400 focus:outline-0 focus:shadow ocus:shadow-gray-300 font-light'
                   name='puesto2' onChange={ (e) => update({ idFicha : row.original.idFicha, idStatusIne :e.target.value}) } 
                   value={ row.original.idStatusIne } disabled={ !permiso }  >
                                {
                                    statusIne.map( x => (  <option key={ x.idStatusIne } value = { x.idStatusIne } > { x.descripcion } </option> ) )
                                }
                    </select>
               
        )
    } : { id:'statusIne',
        header: '',
        size: 0,
    },

    figura === 'OE' ? {
        id:'fechaCapacita',
        header: 'F. Capacitación',
        Cell:({ renderedCellValue,row }) =>(

        (row.original.idStatusIne === 4 || row.original.idStatusIne === '4') && permiso ?  
                <button onClick={ () => update({ idFicha : row.original.idFicha, idStatusIne : '4'} ) }>  
                   { row.original.fechaCapacitacion }
                </button>
               : <>{ row.original.fechaCapacitacion }</>
        )
        
    } : { id:'idStatusIne',
        header: '',
        size: 0,
    },
]