export const colmnsCot = (metasEsperadas) => {

    return [


        {
            id:'1',
            accessorFn: (originalRow) =>  originalRow.seccionales,
            header: `RS Meta`,
            muiTableHeadCellProps: { sx: { color: '#4b5563' },}, //custom props
            muiTableBodyCellProps: { align: 'center' },
            grow: false, 
            size: 10,
        }, 
        // {
        //     id:'2',
        //     accessorFn: (originalRow) =>  (originalRow.seccionales * metasEsperadas.filter( x=> x.ruta === originalRow.ruta)[0].porceEspRs).toFixed(0),
        //     header: `Esperado RS`,
        //     muiTableHeadCellProps: { sx: { color: '#4b5563' } }, //custom props
        //     muiTableBodyCellProps: { align: 'center' },
        //     grow: false, 
        //     size: 10,
        // }, 
        {
            id:'3',
            accessorFn: (originalRow) => originalRow.acumuladoRs,
            header: `RS Acumulado`,
            muiTableHeadCellProps: { sx: { color: '#4b5563' } }, //custom props
            muiTableBodyCellProps: { align: 'center' },
            
        }, 
        {
            id:'4',
            accessorFn: (originalRow) => originalRow.capturadoRsPeriodo,
            header: `RS Periodo`,
            muiTableHeadCellProps: { sx: { color: '#4b5563' } }, //custom props
            muiTableBodyCellProps: { align: 'center' },
            
        }, 
        // {
        //     id:'5',
        //     accessorFn: (originalRow) => (originalRow.acumuladoRs/(originalRow.seccionales * metasEsperadas.filter( x=> x.ruta === originalRow.ruta)[0].porceEspRs)).toLocaleString('es-MX',{style: 'percent', minimumFractionDigits:2}),
        //     header: `% RS Avance (Acumulado / Esperado)`,
        //     muiTableHeadCellProps: { sx: { color: '#4b5563' } }, //custom props
        //     muiTableBodyCellProps: { align: 'center' },
            
        // }, 
        {
            id:'5',
            accessorFn: (originalRow) => (originalRow.acumuladoRs/(originalRow.seccionales)).toLocaleString('es-MX',{style: 'percent', minimumFractionDigits:2}),
            header: `% RS Avance (Acumulado / MetaRs)`,
            muiTableHeadCellProps: { sx: { color: '#4b5563' } }, //custom props
            muiTableBodyCellProps: { align: 'center' },
            
        }, 
        {
            id:'6',
            accessorFn: (originalRow) =>  (originalRow.voluntarios).toFixed(0),
            header: `Voluntario Meta`,
            muiTableHeadCellProps: { sx: { color: '#4b5563' },}, //custom props
            muiTableBodyCellProps: { align: 'center' },
            grow: false, 
            size: 10,
        }, 
        // {
        //     id:'7',
        //     accessorFn: (originalRow) =>  ((originalRow.voluntarios) * metasEsperadas.filter( x=> x.ruta === originalRow.ruta)[0].porceEspV).toFixed(0),
        //     header: `Esperado Voluntario`,
        //     muiTableHeadCellProps: { sx: { color: '#4b5563' } }, //custom props
        //     muiTableBodyCellProps: { align: 'center' },
        //     grow: false, 
        //     size: 10,
        // }, 
        {
            id:'8',
            accessorFn: (originalRow) => originalRow.acumuladoV,
            header: `Valuntario Acumulado`,
            muiTableHeadCellProps: { sx: { color: '#4b5563' } }, //custom props
            muiTableBodyCellProps: { align: 'center' },
            
        }, 
        {
            id:'9',
            accessorFn: (originalRow) => originalRow.capturadoVPeriodo,
            header: `Volunatrio Periodo`,
            muiTableHeadCellProps: { sx: { color: '#4b5563' } }, //custom props
            muiTableBodyCellProps: { align: 'center' },
            
        }, 
        // {
        //     id:'10',
        //     accessorFn: (originalRow) => (originalRow.acumuladoV/((originalRow.voluntarios) * metasEsperadas.filter( x=> x.ruta === originalRow.ruta)[0].porceEspV)).toLocaleString('es-MX',{style: 'percent', minimumFractionDigits:2}),
        //     header: `% Vol Avance (Acumulado / Esperado)`,
        //     muiTableHeadCellProps: { sx: { color: '#4b5563' } }, //custom props
        //     muiTableBodyCellProps: { align: 'center' },
            
        // }, 
        {
            id:'10',
            accessorFn: (originalRow) => (originalRow.acumuladoV/(originalRow.voluntarios)).toLocaleString('es-MX',{style: 'percent', minimumFractionDigits:2}),
            header: `% Vol Avance (Acumulado / MetaVol)`,
            muiTableHeadCellProps: { sx: { color: '#4b5563' } }, //custom props
            muiTableBodyCellProps: { align: 'center' },
            
        }, 
    
    
        {
            id:'11',
            accessorFn: (originalRow) =>  (originalRow.movilizados).toFixed(0),
            header: `Movilizado Meta`,
            muiTableHeadCellProps: { sx: { color: '#4b5563' } }, //custom props
            muiTableBodyCellProps: { align: 'center' },
            
        }, 
        // {
        //     id:'12',
        //     accessorFn: (originalRow) =>  ((originalRow.movilizados) * metasEsperadas.filter( x=> x.ruta === originalRow.ruta)[0].porceEspM).toFixed(0),
        //     header: `Esperado Movilizado`,
        //     muiTableHeadCellProps: { sx: { color: '#4b5563' } }, //custom props
        //     muiTableBodyCellProps: { align: 'center' },
            
        // }, 
        {
            id:'13',
            accessorFn: (originalRow) => originalRow.acumuladoM,
            header: `Movilizado Acumulado`,
            muiTableHeadCellProps: { sx: { color: '#4b5563' } }, //custom props
            muiTableBodyCellProps: { align: 'center' },
            
        }, 
        {
            id:'14',
            accessorFn: (originalRow) => originalRow.capturadoMPeriodo,
            header: `Movilizado Periodo`,
            muiTableHeadCellProps: { sx: { color: '#4b5563' } }, //custom props
            muiTableBodyCellProps: { align: 'center' },
            
        }, 
        // {
        //     id:'15',
        //     accessorFn: (originalRow) => (originalRow.capturadoMPeriodo/((originalRow.movilizados) * metasEsperadas.filter( x=> x.ruta === originalRow.ruta)[0].porceEspM)).toLocaleString('es-MX',{style: 'percent', minimumFractionDigits:2}),
        //     header: `% Mov Avance (Acumulado / Esperado)`,
        //     muiTableHeadCellProps: { sx: { color: '#4b5563' } }, //custom props
        //     muiTableBodyCellProps: { align: 'center' },
            
        // }, 
        {
            id:'15',
            accessorFn: (originalRow) => (originalRow.capturadoMPeriodo/(originalRow.movilizados)).toLocaleString('es-MX',{style: 'percent', minimumFractionDigits:2}),
            header: `% Mov Avance (Acumulado / MetaMov)`,
            muiTableHeadCellProps: { sx: { color: '#4b5563' } }, //custom props
            muiTableBodyCellProps: { align: 'center' },
            
        }, 
    
    ]
}