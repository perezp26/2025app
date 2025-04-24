import XLSX from "xlsx-js-style";

export const exportaListadoEstructura = (listFichas, tipoFicha) =>{

    const data = tipoFicha === 'RV' ? listFichas.map( x => ( { DF : x.dFederal, DL : x.dLocal, Region : x.region, Nombre : `${x.nombre} ${x.apellidoPaterno} ${x.apellidoMaterno}`, Firma: '' } ) ) : 
                 tipoFicha === 'COT' ? listFichas.map( x => ( { DF : x.dFederal, DL : x.dLocal, Ruta : x.ruta, Nombre : `${x.nombre} ${x.apellidoPaterno} ${x.apellidoMaterno}`, Firma: '' } ) )
                               : listFichas.map( x => ( { DF : x.dFederal, DL : x.dLocal, Ruta : x.ruta, Seccion: x.seccion, Nombre : `${x.nombre} ${x.apellidoPaterno} ${x.apellidoMaterno}`, Firma: '' } ) )
    const widthCol = (tipoFicha === 'RV' || tipoFicha === 'COT') ? [3,3,5,35,38] : [3,3,5,5,35,38]
    const libro = XLSX.utils.book_new();
    const hoja = XLSX.utils.json_to_sheet(data);

    let propRow = [{}]
    let i = 1;
    data.forEach( (col) => {
      propRow.push({ hpx: 50,  })
      hoja[`A${i}`].s = {
        alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }
      };
      hoja[`B${i}`].s = {
        alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }
      };
      hoja[`C${i}`].s = {
        alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }
      };
      hoja[`D${i}`].s = {
        alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }
      };
      hoja[`E${i}`].s = {
         border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }
      };
      tipoFicha === 'RS' ? hoja[`F${i}`].s =  {
        border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } } } : {} ;
      i ++;
    } );
    
    hoja[`A${i}`].s = {
      alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }
    };
    hoja[`B${i}`].s = {
      alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }
    };
    hoja[`C${i}`].s = {
      alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }
    };
    hoja[`D${i}`].s = {
      alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }
    };
    hoja[`E${i}`].s = {
      border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }
   };
   tipoFicha === 'RS' ? hoja[`F${i}`].s =  {
    border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } } } : {} ;

    let propCol = [];
    widthCol.forEach( (w) => {
      propCol.push({ width: w })
    } )

    hoja["!cols"] = propCol
    hoja["!rows"] = propRow;
    
    XLSX.utils.book_append_sheet(libro,hoja, 'Nomina')
    XLSX.writeFile(libro,`NominaFormato_${tipoFicha}.xlsx`)

}
