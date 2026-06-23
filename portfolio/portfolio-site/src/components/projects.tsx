// import saas from "../assets/vite.svg";
import { SiJavascript, SiTypescript, SiPostgresql, SiTailwindcss, SiReact, SiNodedotjs, SiMongodb } from "react-icons/si";
import { ArrowRight } from "lucide-react";
import { ProjectCard } from "./projectCard";
import { ProjectsInfo } from "../config/allProjectsObj";
export default function Projects(){
    const featuredProject=ProjectsInfo.filter((a)=>a.featured==true);

    return(
        <section className="pt-6">
            <h1 className="pb-4 text-left text-4xl">Selected Work</h1>

            <div className="grid gap-8 md:grid-cols-2">
                {featuredProject.map((a)=>(
                    <ProjectCard key={a.title}
                        title={a.title}
                        desc={a.desc}
                        tags={a.tags}
                        img={a.img}
                        demoLink={a.demoLink}
                        sourceLink={a.sourceLink}
                        detailLink={a.detailLink}
                    />
                ))}
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