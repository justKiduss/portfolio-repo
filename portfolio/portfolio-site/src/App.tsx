import { Header } from "./components/header";
import Hero from "./components/hero";
import Projects from "./components/projects";

export function App(){
    return (
        // bg-[#1a1b26]
        <div className="min-h-screen bg-[#0b0c10] text-white">
            <Header/>
            <main className="max-w-3xl mx-auto px-6 py-16">
                <Hero/>
                <Projects/>
            </main>
        </div>
    )
}