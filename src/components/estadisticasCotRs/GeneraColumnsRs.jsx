export const colmnsRs = (metasEsperadas) => {

    return [
        {
            accessorFn: (originalRow) =>  (originalRow.voluntarios/ originalRow.seccionales).toFixed(0),
            header: `Voluntario Meta`,
            muiTableHeadCellProps: { sx: { color: '#4b5563' },}, //custom props
            muiTableBodyCellProps: { align: 'center' },
            grow: false, 
            size: 10,
        }, 
        // {
        //     accessorFn: (originalRow) =>  ((originalRow.voluntarios / originalRow.seccionales) * metasEsperadas.filter( x=> x.ruta === originalRow.ruta)[0].porceEspV).toFixed(0),
        //     header: `Esperado Voluntario`,
        //     muiTableHeadCellProps: { sx: { color: '#4b5563' } }, //custom props
        //     muiTableBodyCellProps: { align: 'center' },
        //     grow: false, 
        //     size: 10,
        // }, 
        {
            accessorFn: (originalRow) => originalRow.acumuladoV,
            header: `Valuntario Acumulado`,
            muiTableHeadCellProps: { sx: { color: '#4b5563' } }, //custom props
            muiTableBodyCellProps: { align: 'center' },
            
        }, 
        {
            accessorFn: (originalRow) => originalRow.capturadoVPeriodo,
            header: `Volunatrio Periodo`,
            muiTableHeadCellProps: { sx: { color: '#4b5563' } }, //custom props
            muiTableBodyCellProps: { align: 'center' },
            
        }, 
        // {
        //     accessorFn: (originalRow) => `${((originalRow.acumuladoV/((originalRow.voluntarios / originalRow.seccionales) * metasEsperadas.filter( x=> x.ruta === originalRow.ruta)[0].porceEspV)) * 100).toFixed(2)}%`,
        //     header: `% Vol Avance (Acumulado / Esperado)`,
        //     muiTableHeadCellProps: { sx: { color: '#4b5563' } }, //custom props
        //     muiTableBodyCellProps: { align: 'center' },
            
        // }, 
    
        {
            accessorFn: (originalRow) => (originalRow.acumuladoV/Math.round(originalRow.voluntarios / originalRow.seccionales)).toLocaleString('es-MX',{style: 'percent', minimumFractionDigits:2}),
            header: `% Vol Avance (Acumulado / MetaVol)`,
            muiTableHeadCellProps: { sx: { color: '#4b5563' } }, //custom props
            muiTableBodyCellProps: { align: 'center' },
            
        }, 
        {
            accessorFn: (originalRow) =>  (originalRow.movilizados / originalRow.seccionales).toFixed(0),
            header: `Movilizado Meta`,
            muiTableHeadCellProps: { sx: { color: '#4b5563' } }, //custom props
            muiTableBodyCellProps: { align: 'center' },
            
        }, 
        // {
        //     accessorFn: (originalRow) =>  ((originalRow.movilizados / originalRow.seccionales) * metasEsperadas.filter( x=> x.ruta === originalRow.ruta)[0].porceEspM).toFixed(0),
        //     header: `Esperado Movilizado`,
        //     muiTableHeadCellProps: { sx: { color: '#4b5563' } }, //custom props
        //     muiTableBodyCellProps: { align: 'center' },
            
        // }, 
        {
            accessorFn: (originalRow) => originalRow.acumuladoM,
            header: `Movilizado Acumulado`,
            muiTableHeadCellProps: { sx: { color: '#4b5563' } }, //custom props
            muiTableBodyCellProps: { align: 'center' },
            
        }, 
        {
            accessorFn: (originalRow) => originalRow.capturadoMPeriodo,
            header: `Movilizado Periodo`,
            muiTableHeadCellProps: { sx: { color: '#4b5563' } }, //custom props
            muiTableBodyCellProps: { align: 'center' },
            
        }, 
        // {
        //     accessorFn: (originalRow) => (originalRow.capturadoMPeriodo/((originalRow.movilizados / originalRow.seccionales) * metasEsperadas.filter( x=> x.ruta === originalRow.ruta)[0].porceEspM)).toLocaleString('es-MX',{style: 'percent', minimumFractionDigits:2}),
        //     header: `% Mov Avance (Acumulado / Esperado)`,
        //     muiTableHeadCellProps: { sx: { color: '#4b5563' } }, //custom props
        //     muiTableBodyCellProps: { align: 'center' },
            
        // }, 
        {
            accessorFn: (originalRow) => (originalRow.capturadoMPeriodo/Math.round(originalRow.movilizados / originalRow.seccionales)).toLocaleString('es-MX',{style: 'percent', minimumFractionDigits:2}),
            header: `% Mov Avance (Acumulado / MetaMov)`,
            muiTableHeadCellProps: { sx: { color: '#4b5563' } }, //custom props
            muiTableBodyCellProps: { align: 'center' },
            
        }, 
    ]
}