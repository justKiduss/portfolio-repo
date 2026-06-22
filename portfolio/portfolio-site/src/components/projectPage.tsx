import { ProjectCard } from "./projectCard";
import strategy from "../assets/excalidraw strategy.png";
import movie from "../assets/excalidraw movix.png";
import wavvy from "../assets/wavvy.png";
import { ProjectDetail } from "./project";
export default function ProjectPage(){
    return(
        <>
            <section className="pt-6">
                <h1 className="pb-4 text-left text-4xl">Projects</h1>

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
            </section>
        </>
    )
}