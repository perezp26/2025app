import XLSX from "xlsx-js-style";

export const exportaEstadisticasCots = (estadisticaCotRs, metasEsperadas , tipoFicha) =>{

    const data = estadisticaCotRs.map( x => ( { 
        
                                Nombre : x.nombre, ['D. Federal'] : x.dFederal, Ruta : x.ruta, Seccion : x.seccion,
                                ['RS Meta'] : x.seccionales, 
                                //['Esperado RS'] : (x.seccionales * metasEsperadas.filter( d => d.ruta === x.ruta)[0].porceEspRs).toFixed(0),
                                ['RS Acumulado'] : x.acumuladoRs,
                                ['RS Periodo'] : x.capturadoRsPeriodo,
                                //['% RS Avance (Acumulado / Esperado)']: (x.acumuladoRs/(x.seccionales * metasEsperadas.filter( d => d.ruta === x.ruta)[0].porceEspRs)).toLocaleString('es-MX',{style: 'percent', minimumFractionDigits:2}),
                                ['% RS Avance (Acumulado / Meta)']: (x.acumuladoRs/(x.seccionales)).toLocaleString('es-MX',{style: 'percent', minimumFractionDigits:2}),
                                ['Voluntario Meta'] : (x.voluntarios).toFixed(0),
                                //['Esperado Voluntario'] : ((x.voluntarios) * metasEsperadas.filter( x=> x.ruta === x.ruta)[0].porceEspV).toFixed(0)  ,
                                ['Valuntario Acumulado'] : x.acumuladoV,
                                ['Volunatrio Periodo'] : x.capturadoVPeriodo,
                                //['% Vol Avance (Acumulado / Esperado)'] : (x.acumuladoV/((x.voluntarios) * metasEsperadas.filter( d => d.ruta === x.ruta)[0].porceEspV)).toLocaleString('es-MX',{style: 'percent', minimumFractionDigits:2}),
                                ['% Vol Avance (Acumulado / Meta)'] : (x.acumuladoV/(x.voluntarios)).toLocaleString('es-MX',{style: 'percent', minimumFractionDigits:2}),
                                ['Movilizado Meta'] : (x.movilizados).toFixed(0),
                                //['Esperado Movilizado'] : ((x.movilizados) * metasEsperadas.filter( d => d.ruta === x.ruta)[0].porceEspM).toFixed(0),
                                ['Movilizado Acumulado'] : x.acumuladoM,
                                ['Movilizado Periodo'] : x.capturadoMPeriodo,
                                //['% Mov Avance (Acumulado / Esperado'] : (x.capturadoMPeriodo/((x.movilizados) * metasEsperadas.filter( d => d.ruta === x.ruta)[0].porceEspM)).toLocaleString('es-MX',{style: 'percent', minimumFractionDigits:2}),
                                ['% Mov Avance (Acumulado / Meta'] : (x.acumuladoM/(x.movilizados)).toLocaleString('es-MX',{style: 'percent', minimumFractionDigits:2}),
                                } ) )
                               
    
    const widthCol = [35,8,8,10,10,12,15,27,17,17,17,27,17,17,17,27]
    const libro = XLSX.utils.book_new();
    const hoja = XLSX.utils.json_to_sheet(data);

    let propRow = [{}]
    let i = 1;
    data.forEach( (col) => {
      propRow.push({ hpx: 35,  })
      hoja[`A${i}`].s = {border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};
      hoja[`B${i}`].s = {alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};
      hoja[`C${i}`].s = {alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};
      hoja[`D${i}`].s = {alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};
      hoja[`E${i}`].s = {alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};
      hoja[`F${i}`].s = {alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};
      hoja[`G${i}`].s = {alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};
      hoja[`H${i}`].s = {alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};
      hoja[`I${i}`].s = {alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};
      hoja[`J${i}`].s = {alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};
      hoja[`K${i}`].s = {alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};
      hoja[`L${i}`].s = {alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};
      hoja[`M${i}`].s = {alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};
      hoja[`N${i}`].s = {alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};
      hoja[`O${i}`].s = {alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};
      hoja[`P${i}`].s = {alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};
      //hoja[`Q${i}`].s = {alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};
      //hoja[`R${i}`].s = {alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};
      //hoja[`S${i}`].s = {alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};

      i ++;
    } );
    hoja[`A${i}`].s = {border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};
    hoja[`B${i}`].s = {alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};
    hoja[`C${i}`].s = {alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};
    hoja[`D${i}`].s = {alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};
    hoja[`E${i}`].s = {alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};
    hoja[`F${i}`].s = {alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};
    hoja[`G${i}`].s = {alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};
    hoja[`H${i}`].s = {alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};
    hoja[`I${i}`].s = {alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};
    hoja[`J${i}`].s = {alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};
    hoja[`K${i}`].s = {alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};
    hoja[`L${i}`].s = {alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};
    hoja[`M${i}`].s = {alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};
    hoja[`N${i}`].s = {alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};
    hoja[`O${i}`].s = {alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};
    hoja[`P${i}`].s = {alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};
    //hoja[`Q${i}`].s = {alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};
    //hoja[`R${i}`].s = {alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};
    //hoja[`S${i}`].s = {alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};

    let propCol = [];
    widthCol.forEach( (w) => {
      propCol.push({ width: w })
    } )

    hoja["!cols"] = propCol
    hoja["!rows"] = propRow;
    
    XLSX.utils.book_append_sheet(libro,hoja, 'Nomina')
    XLSX.writeFile(libro,`Estadistica_${tipoFicha}.xlsx`)

}

export const exportaEstadisticasRS = (estadisticaCotRs, metasEsperadas , tipoFicha) =>{
    
        const data = estadisticaCotRs.map( x => ( { 
            
                                    Nombre : x.nombre, ['D. Federal'] : x.dFederal, Ruta : x.ruta, Seccion : x.seccion,
                                    ['Voluntario Meta'] : (x.voluntarios / x.seccionales).toFixed(0),
                                    //['Esperado Voluntario'] : ((x.voluntarios / x.seccionales) * metasEsperadas.filter( x=> x.ruta === x.ruta)[0].porceEspV).toFixed(0)  ,
                                    ['Valuntario Acumulado'] : x.acumuladoV,
                                    ['Volunatrio Periodo'] : x.capturadoVPeriodo,
                                    //['% Vol Avance (Acumulado / Esperado)'] : (x.acumuladoV/((x.voluntarios/x.seccionales) * metasEsperadas.filter( d => d.ruta === x.ruta)[0].porceEspV)).toLocaleString('es-MX',{style: 'percent', minimumFractionDigits:2}),
                                    ['% Vol Avance (Acumulado / Meta V)'] : (x.acumuladoV/Math.round(x.voluntarios/x.seccionales)).toLocaleString('es-MX',{style: 'percent', minimumFractionDigits:2}),
                                    ['Movilizado Meta'] : (x.movilizados / x.seccionales).toFixed(0),
                                    //['Esperado Movilizado'] : ((x.movilizados / x.seccionales ) * metasEsperadas.filter( d => d.ruta === x.ruta)[0].porceEspM).toFixed(0),
                                    ['Movilizado Acumulado'] : x.acumuladoM,
                                    ['Movilizado Periodo'] : x.capturadoMPeriodo,
                                    //['% Mov Avance (Acumulado / Esperado'] : (x.capturadoMPeriodo/((x.movilizados/x.seccionales) * metasEsperadas.filter( d => d.ruta === x.ruta)[0].porceEspM)).toLocaleString('es-MX',{style: 'percent', minimumFractionDigits:2}),
                                    ['% Mov Avance (Acumulado / Meta M'] : (x.capturadoMPeriodo/Math.round(x.movilizados/x.seccionales)).toLocaleString('es-MX',{style: 'percent', minimumFractionDigits:2}),
                                    } ) )
                                   
        
        const widthCol = [35,10,10,10,15,15,15,30,14,14,17,17,30]
        const libro = XLSX.utils.book_new();
        const hoja = XLSX.utils.json_to_sheet(data);
    
        let propRow = [{}]
        let i = 1;
        data.forEach( (col) => {
          propRow.push({ hpx: 35,  })
          hoja[`A${i}`].s = {border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};
          hoja[`B${i}`].s = {alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};
          hoja[`C${i}`].s = {alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};
          hoja[`D${i}`].s = {alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};
          hoja[`E${i}`].s = {alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};
          hoja[`F${i}`].s = {alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};
          hoja[`G${i}`].s = {alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};
          hoja[`H${i}`].s = {alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};
          hoja[`I${i}`].s = {alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};
          hoja[`J${i}`].s = {alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};
          hoja[`K${i}`].s = {alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};
          hoja[`L${i}`].s = {alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};
          //hoja[`M${i}`].s = {alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};
          //hoja[`N${i}`].s = {alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};
    
          i ++;
        } );
        hoja[`A${i}`].s = {border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};
        hoja[`B${i}`].s = {alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};
        hoja[`C${i}`].s = {alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};
        hoja[`D${i}`].s = {alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};
        hoja[`E${i}`].s = {alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};
        hoja[`F${i}`].s = {alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};
        hoja[`G${i}`].s = {alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};
        hoja[`H${i}`].s = {alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};
        hoja[`I${i}`].s = {alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};
        hoja[`J${i}`].s = {alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};
        hoja[`K${i}`].s = {alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};
        hoja[`L${i}`].s = {alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};
        //hoja[`M${i}`].s = {alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};
        //hoja[`N${i}`].s = {alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }};
    
        let propCol = [];
        widthCol.forEach( (w) => {
          propCol.push({ width: w })
        } )
    
        hoja["!cols"] = propCol
        hoja["!rows"] = propRow;
        
        XLSX.utils.book_append_sheet(libro,hoja, 'Nomina')
        XLSX.writeFile(libro,`Estadistica_${tipoFicha}.xlsx`)
    
    }
