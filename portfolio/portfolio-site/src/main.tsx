import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App'
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Detail from './components/detail';
import { Header } from './components/header';


function Layout(){
  return (
    <div className="bg-[#0b0c10] text-white">
      <Header/>
      <main className="min-h-screen bg-[#0b0c10] text-white">
        <Routes>
          <Route path="/" element={<App/>}/>
          <Route path="/projects/:id" element={<Detail/>}/>
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
