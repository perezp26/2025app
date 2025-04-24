import { BarChart } from '@mui/x-charts/BarChart';
import { useEffect } from 'react';
import { useSelector } from 'react-redux'

export const GraficaOes = () => {

  const  {graficaOes} =   useSelector( state => state.grafica );
  const { dto, meta, oep, oes, angle } = graficaOes

  return (
    <>
        
                        <BarChart
                        margin={{ right:10, bottom:100 }}
                        width={ 700 }
                        height={ 500 }
                        series={[
                            { data: meta, label: 'Meta', id: 'meta', color:'#4a8274' },
                            { data: oep,  label: 'OeP',  id: 'OeP',  color:'#6db68c', stack:'oes' },
                            { data: oes,  label: 'OeS',  id: 'OeS',  color:'#75d2a3', stack:'oes'},
                        ]}
                        
                        xAxis={[{ data: dto, scaleType: 'band', tickLabelStyle:{ fontSize:10, angle }, tickSize:40  } ]}
              
                        
                        />

    </>
  )
}
