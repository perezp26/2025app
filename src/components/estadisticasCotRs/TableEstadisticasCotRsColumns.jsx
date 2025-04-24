export const TableEstadisticasCotRsColumns = (metasEsperadas,columnsGenera) => [

    {
        accessorKey: 'nombre', //simple recommended way to define a column
        header: 'Nombre',
        muiTableHeadCellProps: { sx: { color: '#4b5563' } },
        grow: false, 
        size: 300,
    }, 
    {
        accessorKey: 'dFederal', //simple recommended way to define a column
        header: 'Dto. Fed',
        muiTableHeadCellProps: { sx: { color: '#4b5563' }, align:'center' }, //custom props   
        muiTableBodyCellProps: { align: 'center',  width:'100%' },
        grow: false, 
        size: 10,
    }, 
    {
        accessorKey: 'ruta', //simple recommended way to define a column
        header: 'Ruta',
        muiTableHeadCellProps: { sx: { color: '#4b5563' }, align:'center' }, //custom props   
        muiTableBodyCellProps: { align: 'center' },
        grow: false, 
        size: 10,
    }, 
    {
        accessorKey: 'seccion', //simple recommended way to define a column
        header: 'Seccion',
        muiTableHeadCellProps: { sx: { color: '#4b5563' }, align:'center' }, //custom props   
        muiTableBodyCellProps: { align: 'center' },
        grow: false, 
        size: 10,
    }, 

   ...columnsGenera,

]