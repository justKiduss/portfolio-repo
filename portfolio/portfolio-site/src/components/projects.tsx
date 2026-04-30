import strategy from "../assets/hero.png";
import movie from "../assets/react.svg";
import saas from "../assets/vite.svg";
export default function Projects(){
    return(
        <section className="pt-8">
            <h1>Personal projects</h1>
            <div className="flex grid lg:grid-cols-2">
                <div className="justify-center items-center">
                    <img src={strategy} alt="Stratgy game with turn based System" className="p-5"/>
                    <p className="p-5">Stratgy game with turn based System</p>
                    <div>
                        <code className="mr-2">Vanilla.js</code>
                        <code className="mr-2">CSS</code>
                    </div>    
                </div>
                <div>
                    <img src={movie} alt="A Movie site users can stream their choosen movie for free and review for other" className="w-100 h-100 p-5"/>
                    <p className="p-5">A Movie site users can stream their choosen movie for free and review for other</p>
                    <div>
                        <code className="mr-2">React</code>
                        <code className="mr-2">Node.js</code>
                        <code className="mr-2">Postgres</code>
                        <code className="mr-2">tailwind</code>
                    </div>
                    
                </div>
                <div>
                    <img src={saas} alt="saas site" className="w-100 h-100"/>
                    <p>A Movie site users can stream their choosen movie for free and review for other</p>
                    <code className="mr-2">Typescript</code>
                    <code className="mr-2">tailwind</code>

                </div>
            </div>
            <button className="mt-4">More Projects</button>

        </section>
    )
}