import Apps from "./apps";
import { Header } from "./components/header";
import Hero from "./components/hero";
import Projects from "./components/projects";

export function App(){
    return (
        <div className="min-h-screen bg-[#1a1b26] text-white">
            <Header/>
            <main className="max-w-4xl mx-auto px-6 pt-20 pb-28 space-y-24">
                <Hero/>
                <Projects/>
            </main>
            <Apps/>
        </div>
    )
}