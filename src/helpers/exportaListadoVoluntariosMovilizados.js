import { useSelector } from "react-redux";
import XLSX from "xlsx-js-style";

export const exportaListadoVoluntariosMovilizados = (listFichas, tipoFicha, statusIne = []) =>{

    const data = tipoFicha === 'OE' 
    ? listFichas.map( x => ( { DF : x.dFederal, DL : x.dLocal, Region : x.region, Seccion: x.seccion, Nombre : `${x.nombre} ${x.apellidoPaterno} ${x.apellidoMaterno}`, statusIne : x.idStatusIne > 0 ? statusIne.filter( d => d.idStatusIne === x.idStatusIne)[0].descripcion : 'Inicial' }) )
                                : listFichas.map( x => ( { DF : x.dFederal, DL : x.dLocal, Ruta : x.ruta, Seccion: x.seccion, Nombre : `${x.nombre} ${x.apellidoPaterno} ${x.apellidoMaterno}` } ) )
    const widthCol = [3,3,7,8,35,20]
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
        alignment: { vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }
      };
      tipoFicha === 'OE' ? hoja[`F${i}`].s =  {
        alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } } } : {} ;
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
        alignment: { vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } }
   };
   tipoFicha === 'OE' ? hoja[`F${i}`].s =  {
    alignment: { horizontal: "center", vertical: "center" }, border : { top:{ style:'thin' }, bottom:{ style:'thin' }, left:{ style:'thin' }, right : { style:'thin' } } } : {} ;

    let propCol = [];
    widthCol.forEach( (w) => {
      propCol.push({ width: w })
    } )

    hoja["!cols"] = propCol
    hoja["!rows"] = propRow;
    
    XLSX.utils.book_append_sheet(libro,hoja, 'Nomina')
    XLSX.writeFile(libro,`Listado_${tipoFicha}.xlsx`)

}
