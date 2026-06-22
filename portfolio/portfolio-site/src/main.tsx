import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App'
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Detail from './components/detail';
import { Header } from './components/header';
import { AboutMe } from './components/aboutMe';


function Layout(){
  return (
    <div className="bg-[#0b0c10] text-white">
      <Header/>
      <main className="min-h-screen bg-[#0b0c10] text-white max-w-3xl mx-auto px-6 py-16">
        <Routes>
          <Route path="/" element={<App/>}/>
          <Route path="/projects/:id" element={<Detail/>}/>
          <Route path="/about" element={<AboutMe/>}/>
        </Routes>
      </main>
    </div>
  )
}
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Layout/>
    </BrowserRouter>
  </StrictMode>
)
