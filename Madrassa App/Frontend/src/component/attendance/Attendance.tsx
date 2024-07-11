import axios from "axios";
import { useEffect, useState } from "react";
import { singleStudent, Student } from "../../types";
import type { Attendance, date } from "../../types";
import './Attendance.css'


function Attendance() {
  axios.defaults.baseURL = 'http://localhost:5000/user';
  const [data, setData] = useState<Student[]>([])
  const [attendanceState, setAttendanceState] = useState<{ [key: string]: string }>({});
  const [postAttendance, setPostAttendance] = useState<{ [key: string]: singleStudent }>({});
  const [dates, setDates] = useState<date[]>([])

  const date = new Date().toLocaleDateString("en-US", { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'Asia/Karachi' })
  const day = new Date().toLocaleString("en-US", { weekday: 'long', timeZone: 'Asia/Karachi' });

  const handleAttendanceChange = (studentName: string, darja: string, date: string, value: string) => {
    setAttendanceState(prevState => ({
      ...prevState,
      [`${studentName}-${darja}-${date}`]: value
    }));
    const newAttendance: Attendance = { dateToday: date, attendance: value };
    const newStudent: singleStudent = { name: studentName, darja: darja, attendance: newAttendance }
    setPostAttendance(prevState => ({
      ...prevState,
      [`${studentName}-${darja}-${date}`]: newStudent
    }))
  };

  const handlePostClick = async () => {
    try {
      console.log(Object.values(postAttendance))
      await axios.put('/attendance', Object.values(postAttendance))
      axios.post('/calculate', Object.values(postAttendance))
      setPostAttendance({});
    } catch (error) {
      console.log(error)
    }
  }




  useEffect(() => {
    axios.get('/').then((v) => {
      setData(v.data)
    })
    axios.get('/date').then((a) => {
      setDates(a.data)
    })
  }, [data])

  useEffect(() => {
    console.log('first')
    axios.get('/attendances')
    // axios.post('/addDate', { day, date })
  },[day])

  return (
    <>
      <div className="main">
        <table className='allAttendance'>
          <tr>
            <td>Name</td>
            <td>Darja</td>
            {dates.map((a, i) => {
              return (
                <>
                  {i >= dates.length - 10 ? <td>{a.dateToday}</td> : ''}
                </>
              )
            })}
            <td>Percentage</td>
          </tr>
          {data.map(da => {
            return (
              <>
                <tr>
                  <td>{da.name}</td>
                  <td>{da.darja}</td>
                  {dates.map((a, i) => {
                    const attendanceForDate = da.attendance.find(att => att.dateToday === a.dateToday);
                    return (
                      <>
                        {i >= dates.length - 10 ?
                          <>
                            
                              {a.dayToday === 'Sunday' || a.dayToday === 'Saturday' ?
                                <>
                                <td style={{backgroundColor: 'red'}}>
                                  {a.dayToday}
                                  </td>
                                </>
                                :
                                <>
                                
                                  {attendanceForDate ? (
                                    <td>
                                    {attendanceForDate.attendance}
                                    </td>
                                  ) : (
                                    <>
                                    <td style={{backgroundColor:'lightblue'}}>
                                    <select
                                      value={attendanceState[`${da.name}-${da.darja}-${a.dateToday}`] || 'select'}
                                      onChange={(e) => handleAttendanceChange(da.name, da.darja, a.dateToday, e.target.value)}
                                    >
                                      <option value="select">Select</option>
                                      <option value="present">Present</option>
                                      <option value="absent">Absent</option>
                                    </select>
                                    </td>
                                    </>
                                    
                                  )}
                                

                                </>
                              }
                           
                          </>
                          :
                          ''}
                      </>
                    );
                  })}
                  <td>{!da.percentage ? 0 : da.percentage}</td>
                </tr>
              </>
            )
          })}
          <tr><button onClick={handlePostClick}>submit</button></tr>
        </table>
      </div>
    </>
  )
}

export default Attendance
