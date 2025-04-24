export const TableEstadisticasRvsOesColumns = () => [

    {
        accessorKey: 'nombre', //simple recommended way to define a column
        header: 'Nombre',
        muiTableHeadCellProps: { sx: { color: '#4b5563' } },
        grow: false, 
        size: 300,
    }, 
    {
        accessorKey: 'dfederal', //simple recommended way to define a column
        header: 'Dto. Fed',
        muiTableHeadCellProps: { sx: { color: '#4b5563' }, align:'center' }, //custom props   
        muiTableBodyCellProps: { align: 'center',  width:'100%' },
        grow: false, 
        size: 10,
    }, 
    {
        accessorKey: 'region', //simple recommended way to define a column
        header: 'Ruta',
        muiTableHeadCellProps: { sx: { color: '#4b5563' }, align:'center' }, //custom props   
        muiTableBodyCellProps: { align: 'center' },
        grow: false, 
        size: 10,
    }, 
    {
        accessorKey: 'meta', //simple recommended way to define a column
        header: 'Meta',
        muiTableHeadCellProps: { sx: { color: '#4b5563' }, align:'center' }, //custom props   
        muiTableBodyCellProps: { align: 'center' },
        grow: false, 
        size: 10,
    }, 
    {
        accessorKey: 'fantasias', //simple recommended way to define a column
        header: 'Fantasias Oes',
        muiTableHeadCellProps: { sx: { color: '#4b5563' }, align:'center' }, //custom props   
        muiTableBodyCellProps: { align: 'center' },
        grow: false, 
        size: 10,
    }, 
    {
        accessorFn: (originalRow) =>  (originalRow.fantasias / originalRow.meta ).toLocaleString('es-MX',{style: 'percent', minimumFractionDigits:2}),
        header: '% Avance',
        muiTableHeadCellProps: { sx: { color: '#4b5563' }, align:'center' }, //custom props   
        muiTableBodyCellProps: { align: 'center' },
        grow: false, 
        size: 10,
    }, 
   
]