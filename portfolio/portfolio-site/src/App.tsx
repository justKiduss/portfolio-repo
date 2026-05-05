import Hero from "./components/hero";
import Projects from "./components/projects";
import "./index.css";
export function App(){
    return (
            <div className="min-h-screen bg-[#0b0c10] text-white font-sans">
                <main className="max-w-3xl mx-auto px-6 py-16">
                    <Hero/>
                    <Projects/>
                </main>
            </div>
    )
}