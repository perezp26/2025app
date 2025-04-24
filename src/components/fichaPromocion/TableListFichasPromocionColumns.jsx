export const TableListFichasPromocionColumns = (figura) => [
    {
        accessorFn: (originalRow) => `${ originalRow.nombre } ${ originalRow.apellidoPaterno} ${ originalRow.apellidoMaterno }`,
        id: 'nombre', //simple recommended way to define a column
        header: 'Nombre',
        muiTableHeadCellProps: { sx: { color: '#4b5563' } }, //custom props
        size: 70,
    },
    {
        accessorKey: 'clvElector', //simple recommended way to define a column
        header: 'Clv Elector',
        muiTableHeadCellProps: { sx: { color: '#4b5563' } }, //custom props
        size: 70,
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
        accessorKey: 'ruta', //simple recommended way to define a column
        header: 'Ruta',
        muiTableHeadCellProps: { sx: { color: '#4b5563' } }, //custom props
        size: 7,
    }, 
    {
        accessorKey: 'clvEquipoEsp', //simple recommended way to define a column
        header: 'Ruta Esp.',
        muiTableHeadCellProps: { sx: { color: '#4b5563' } }, //custom props
        size: 7,
    },
    {
        accessorKey: 'seccion', //simple recommended way to define a column
        header: 'Sección',
        muiTableHeadCellProps: { sx: { color: '#4b5563' } }, //custom props
        size: 7,
    },
    {
        accessorKey: 'figura', //simple recommended way to define a column
        header: '',
        muiTableHeadCellProps: { sx: { color: '#4b5563' } }, //custom props
        size: 5,
    }, 

    {
        accessorFn: (originalRow) => `${figura === 'V' ? originalRow['fichasR.nombreRelaciona'] 
                                      : figura === 'M' ? originalRow['fichasV.nombreRelaciona'] : '' }`,
        id: 'nombreRelaciona', //simple recommended way to define a column
        header: ` ${ figura  === 'V' ? 'Nombre RS' : figura === 'M' ? 'Nombre Voluntario' : '' }`,
        muiTableHeadCellProps: { sx: { color: '#4b5563' } }, //custom props
        size: 70,
    }

]