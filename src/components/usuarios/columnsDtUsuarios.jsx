export const columnsDtUsuarios =  () => [
    {
      accessorKey: 'nombre', //simple recommended way to define a column
      header: 'Nombre',
      muiTableHeadCellProps: { sx: { color: '#4b5563' }, align:'center' }, //custom props
      muiTableBodyCellProps: { align: 'center' },
    },
    {
        accessorKey: 'usuario', //simple recommended way to define a column
        header: 'Nombre Usuario',
        muiTableHeadCellProps: { sx: { color: '#4b5563' } }
    },
    {
      accessorFn: (originalRow) =>  originalRow.Perfil.label , //alternate way
      id: 'idPerfil', //simple recommended way to define a column
      header: 'Perfil',
      muiTableHeadCellProps: { sx: { color: '#4b5563' }, align: 'center' }, //custom props
      muiTableBodyCellProps: { align: 'center' },
    },
  ]