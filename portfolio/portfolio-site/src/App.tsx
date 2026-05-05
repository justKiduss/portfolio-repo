import { Header } from "./components/header";
import Hero from "./components/hero";
import Projects from "./components/projects";
import Detail from "./components/detail";
import "./index.css";
export function App(){
    return (
        // bg-[#1a1b26]
        <div className="min-h-screen bg-[#0b0c10] text-white font-sans">
            <Header/>
            <main className="max-w-3xl mx-auto px-6 py-16">
                <Hero/>
                <Projects/>
                <Detail/>
            </main>
        </div>
    )
}