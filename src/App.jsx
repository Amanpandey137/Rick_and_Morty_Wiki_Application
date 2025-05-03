import React from 'react'
import MainPage from './Pages/MainPage'
import Character from './Pages/character'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<MainPage/>}/>
    <Route path="/character/:id" element={<Character/>} />
   </Routes>
   
   </BrowserRouter>
  )
}

export default App
