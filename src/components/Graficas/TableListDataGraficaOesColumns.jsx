export const TableListDataGraficaOesColumns = () => [

    {
        accessorKey: 'dto', //simple recommended way to define a column
        header: '',
        muiTableHeadCellProps: { sx: { color: '#4b5563' } }, //custom props
        width: "800px"         
    }, 
    {
        accessorKey: 'total', //simple recommended way to define a column
        header: 'Meta',
        muiTableHeadCellProps: { sx: { color: '#4b5563' } }, //custom props
        muiTableBodyCellProps: { align: 'center' },
        size: 30,
    }, 
    {
        accessorKey: 'oeP', //simple recommended way to define a column
        header: 'Oe Prop.',
        muiTableHeadCellProps: { sx: { color: '#4b5563' } }, //custom props
        muiTableBodyCellProps: { align: 'center' },
        size: 30,
    }, 
    {
        accessorKey: 'oeS', //simple recommended way to define a column
        header: 'Oe Sup.',
        muiTableHeadCellProps: { sx: { color: '#4b5563' } }, //custom props
        muiTableBodyCellProps: { align: 'center' },
        size: 10,
    },
    {
        accessorFn: (originalRow) => `${ ((originalRow.oeP +  originalRow.oeS ) / (originalRow.total * 2 )).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2})   }`,
        header: '% Avance',
        muiTableHeadCellProps: { sx: { color: '#4b5563' } }, //custom props
        muiTableBodyCellProps: { align: 'center' },
        size: 10,
    }, 
]