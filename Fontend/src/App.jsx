import React from 'react'
import {Route,Routes} from 'react-router-dom';
import AuthPage from './components/AuthPage';
import TeacherDashboard from './components/TeacherDashboard';
import StudentDashboard from './components/StudentDashboard';
import userContext, { UserDataContext } from './context/userContext';
const App = () => {
  const ans = userContext(UserDataContext)
  return (
 
     <Routes>
      <Route path='/' element={<AuthPage/>}/>
      <Route path='/teachersDashboard' element={<TeacherDashboard/>}/>
      <Route path='/studentDashboard' element={<StudentDashboard/>}/>

     </Routes>

  )
}

export default App
