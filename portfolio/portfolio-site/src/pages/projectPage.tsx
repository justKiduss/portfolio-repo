import { ProjectCard } from "../components/projectCard";
import { ProjectsInfo } from "../config/allProjectsObj";
export default function ProjectPage(){
    const allProjects=ProjectsInfo.filter((a)=>a.featured!==true);
    return(
        <>
            <section className="pt-6">
                <h1 className="pb-4 text-left text-4xl">Projects</h1>

                <div className="grid gap-8 md:grid-cols-2">
                    {allProjects.map((a)=>(
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
            </section>
        </>
    )
}