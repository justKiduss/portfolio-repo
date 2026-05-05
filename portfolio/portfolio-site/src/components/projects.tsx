import strategy from "../assets/strategy.png";
import movie from "../assets/movix.png";
// import saas from "../assets/vite.svg";
import { SiJavascript, SiTypescript, SiPostgresql, SiTailwindcss, SiReact, SiNodedotjs, SiMongodb } from "react-icons/si";
import { ArrowRight } from "lucide-react";
export default function Projects(){
    return(
        <section className="pt-6">
            <h1 className="pb-4 text-left text-4xl">Selected Work</h1>
            <div className="grid gap-8 md:grid-cols-2">
                <div className="bg-[#111318] border border-gray-800 rounded-xl p-4 space-y-4">
                    <img src={strategy} alt="Stratgy game with turn based System" className="w-full h-80 object-cover rounded-md"/>
                    <h2 className="text-bold text-left">Strategy Game</h2>
                    <p className="text-sm text-gray-300 text-left">Turn-based strategy game with AI opponent and fog of war.</p>
                    <div className="flex gap-2 flex-wrap text-xs text-gray-400 pt-3 pb-2">
                        <code className="mr-2">Vanilla JS</code>
                        <code className="mr-2">Canvas API</code>
                    </div>  
                    <div className="flex gap-5">
                        <a href="https://portfolio-repo-one-sigma.vercel.app/" className="text-sm hover:text-purple-500">Live Demo</a>
                        <a href="https://github.com/justKiduss/portfolio-repo/tree/main/Games/Strategy_Game" className="text-sm hover:text-purple-500">Source Code</a>
                    </div>  
                </div>
                <div className="bg-[#111318] border border-gray-800 rounded-xl p-4 space-y-4 h-auto">
                    <img src={movie} alt="A Movie site users can stream their choosen movie for free and review for other" className="w-full h-80 object-cover rounded-md"/>
                    <h2 className="text-bold text-left">Movix</h2>
                    <p className="text-sm text-gray-300 text-left">A full-stack movie streaming platform with TMDB integration, user authentication, and a review and rating system. Built with React, Node.js, and PostgreSQL.</p>
                    <div className="flex gap-2 flex-wrap text-xs text-gray-400 p-3">
                        <code className="mr-2">React</code>
                        <code className="mr-2">Node.js</code>
                        <code className="mr-2">Postgres</code>
                        <code className="mr-2">tailwind</code>
                    </div>
                      <div className="flex gap-5">
                        <a href="https://movix-psi-seven.vercel.app/" className="text-sm hover:text-purple-500">Live Demo</a>
                        <a href="https://github.com/justKiduss/portfolio-repo/tree/main/chill-time" className="text-sm hover:text-purple-500">Source Code</a>
                    </div> 
                </div>
                {/* <div className="bg-[#111318] border border-gray-800 rounded-xl p-4 space-y-4" h-auto>
                    <img src={saas} alt="saas site" className="w-full h-auto"/>
                    <p className="p-5">A Movie site users can stream their choosen movie for free and review for other</p>
                    <div className="flex gap-2 flex-wrap text-xs text-gray-400 p-7">
                        <code className="mr-2">Typescript</code>
                        <code className="mr-2">tailwind</code>
                    </div>

                </div> */}
            </div>
            <div className="mt-8 mb-3 space-y-5">
                <a href="/projects" className="flex hover:text-purple-500">
                    More Projects
                    <ArrowRight className="w-4 h-4 m-1"/>
                </a>
                <h1 className="text-lg font-semibold text-left">Skills</h1>                
                <ul className="flex gap-4 flex-wrap">
                    <li>
                        <SiJavascript className="w-6 h-6 text-yellow-400 ml-4" />
                        <p>javascript</p>
                    </li>
                     <li>
                        <SiTypescript className="w-6 h-6 text-blue-500 ml-4" />
                        <p>Typescript</p>
                    </li>
                     <li>
                        <SiPostgresql className="w-6 h-6 text-blue-400 ml-4" />
                        <p>postgres</p>
                    </li>
                     <li>
                    <   SiTailwindcss className="w-6 h-6 text-cyan-400 ml-4" />
                        <p>tailwind</p>
                    </li>
                     <li>
                        <SiReact className="w-6 h-6 text-blue-300 ml-4" />
                        <p>React</p>
                    </li>
                    <li>
                        <SiNodedotjs className="w-6 h-6 text-green-500 ml-4" />
                        <p>Nodejs</p>
                    </li>
                    <li>
                        <SiMongodb className="w-6 h-6 text-green-600 ml-4"/>
                        <p>Mongodb</p>
                    </li>
                </ul>
            </div>
        </section>
    )
}