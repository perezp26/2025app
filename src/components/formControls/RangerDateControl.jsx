
import DatePicker from 'react-datetime-picker';
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import { format } from 'date-fns'
import { utcToZonedTime, toDate } from 'date-fns-tz';
import { useDispatch, useSelector } from 'react-redux';
import { uiSetRangerFecha } from '../../store/slices/ui/uiSlice';
import { useEffect } from 'react';

export const RangerDateControl = () => {

  const dispatch = useDispatch();
  const { dates } = useSelector( state => state.ui ) ;

  useEffect(() => {
  }, [dates])
  
  return (
    <>
            <div className=' flex '>
                <div className=' md:w-1/2 pr-5'>
                <label className="block text-grey-darker text-sm font-light mb-1" > Fecha Inicial </label>
                    <DatePicker
                            name="dateStart"
                            className={`shadow mt2  w-full border rounded-lg  text-center border-gary-500 hover:outline-0 hover:border-gray-300 bg-white
                                        `}
                            styles={'border: none '}
                            format='dd-MM-y'
                            //disableCalendar={true}
                            onChange={date => dispatch( uiSetRangerFecha( { dateStart : format( date, 'yyyy-MM-dd' ), dateEnd: dates.dateEnd } ) ) }
                            value={ toDate( utcToZonedTime( dates.dateStart, '')) }
                    />
                </div>
                <div className=' md:w-1/2 pr-5'>
                <label className="block text-grey-darker text-sm font-light mb-1" > Fecha Final </label>
                    <DatePicker
                            name="dateEnd"
                            className={`shadow mt2  w-full border rounded-lg  text-center border-gary-500 hover:outline-0 hover:border-gray-300 bg-white
                                        `}
                            styles={'border: none '}
                            format='dd-MM-y'
                            //disableCalendar={true}
                            onChange={date => dispatch( uiSetRangerFecha( { dateStart: dates.dateStart , dateEnd: format( date, 'yyyy-MM-dd' ) } ) ) }
                            value={ toDate( utcToZonedTime( dates.dateEnd, '')) }
                    />
                </div>
            </div>
    </>
  ) 
}
