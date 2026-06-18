import strategy from "../assets/strategy.png";
import movie from "../assets/movix.png";
import wavvy from "../assets/wavvy.png";
// import saas from "../assets/vite.svg";
import { SiJavascript, SiTypescript, SiPostgresql, SiTailwindcss, SiReact, SiNodedotjs, SiMongodb } from "react-icons/si";
import { ArrowRight } from "lucide-react";
import { ProjectDetail } from "./project";
import { ProjectCard } from "./projectCard";
export default function Projects(){
    return(
        <section className="pt-6">
            <h1 className="pb-4 text-left text-4xl">Selected Work</h1>

            <div className="grid gap-8 md:grid-cols-2">
                <ProjectCard 
                    title="Strategy Game"
                    desc="Turn-based strategy game with AI opponent and fog of war."
                    tags={["Vanilla JS", "Canvas API"]}
                    img={strategy}
                    demoLink="https://portfolio-repo-one-sigma.vercel.app/"
                    sourceLink="https://github.com/justKiduss/portfolio-repo/tree/main/Games/Strategy_Game"
                    detailLink={`/projects/${ProjectDetail[0]?.id}`}
                />

                 <ProjectCard 
                    title="Wavvy"
                    desc="Real-time group chat platform with socket presence and live messaging."
                    tags={["React", "Socket.io", "Node.js", "Postgres"]}
                    img={wavvy} // Replace with your wavvy image import
                    demoLink="https://wavvy.kidus.codes"
                    sourceLink="#"
                    detailLink={`/projects/wavvy`}
                />

                {/* Movix Card */}
                <ProjectCard 
                    title="Movix"
                    desc="Full-stack movie streaming platform with TMDB integration, auth, and reviews."
                    tags={["React", "Node.js", "Postgres", "Tailwind"]}
                    img={movie}
                    demoLink="https://movix-psi-seven.vercel.app/"
                    sourceLink="https://github.com/justKiduss/portfolio-repo/tree/main/chill-time"
                    detailLink={`/projects/${ProjectDetail[1]?.id}`}
                />
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