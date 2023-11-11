import './App.css'
import { Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage/MainPage'
import TimetablePage from './pages/TimetablePage/TimetablePage'
import Navbar from './components/Navbar'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import SettingsPage from './pages/SettingsPage/SettingsPage'
import DocumentationPage from './pages/DocumentationPage/DocumentationPage'

function App() {
  return (
    <>
    <Navbar></Navbar>
    <Routes>
      <Route path='/' element = {<MainPage/>}/>
      <Route path='/timetable' element = {<TimetablePage/>}/>
      <Route path='/settings' element = {<SettingsPage/>}/>
      <Route path='/documentation' element = {<DocumentationPage/>}></Route>
      <Route path='*' element = {<NotFoundPage/>}/>
    </Routes>
    </>
  )
}

export default App
