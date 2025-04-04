import React from 'react'
import { Routes, Route, useMatch } from 'react-router-dom'
import Home from './pages/student/home'
import CourseList from './pages/student/courselist'
import CourseDetails from './pages/student/coursedetails'
import MyEnroll from './pages/student/myenroll'
import Player from './pages/student/Player'
import Loading from './components/student/Loading'
import Educator from './pages/educator/educator'
import Dashboard from './pages/educator/dashboard'
import AddCourse from './pages/educator/addcourse'
import MyCourses from './pages/educator/mycourses'
import StudentsEnrolled from './pages/educator/studentsenrolled'
import Navbar from './components/student/navbar'
import "quill/dist/quill.snow.css";

const App = () => {

  const isEducatorRoute = useMatch('/educator/*')
  return (
    <div className='text-default min-h-screen bg-white'>
      {!isEducatorRoute &&       <Navbar/>
      }
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/course-list' element={<CourseList />} />
        <Route path='/course-list/:input' element={<CourseList />} />
        <Route path='/course/:id' element={<CourseDetails />} />
        <Route path='/myenroll' element={<MyEnroll />} />
        <Route path='/player/:courseId' element={<Player />} />
        <Route path='/loading/:path' element={<Loading />} />

        {/* Nested Routes for Educator */}
        <Route path='/educator' element={<Educator />}>
          <Route index element={<Dashboard />} /> {/* Default route inside Educator */}
          <Route path='add-course' element={<AddCourse />} />
          <Route path='my-courses' element={<MyCourses />} />
          <Route path='stu-enroll' element={<StudentsEnrolled />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
