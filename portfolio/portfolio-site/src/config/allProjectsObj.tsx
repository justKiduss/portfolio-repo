import strategy from "../assets/strategy.png"; 
import { ProjectDetail } from "./allProjectDetaillObj";
import wavvy from "../assets/wavvy.png";
import movie from "../assets/movix.png";
export const ProjectsInfo=[
    {
        title:"Strategy Game",
        featured:true,
        desc:"Turn-based strategy game with AI opponent and fog of war.",
        tags:["Vanilla JS", "Canvas API"],
        img:strategy,
        demoLink:"https://portfolio-repo-one-sigma.vercel.app/",
        sourceLink:"https://github.com/justKiduss/portfolio-repo/tree/main/Games/Strategy_Game",
        detailLink:`/projects/${ProjectDetail[0]?.id}`
    },
    {
        title:"Wavvy",
        featured:true,
        desc:"Real-time group chat platform with socket presence and live messaging.",
        tags:["React", "Socket.io", "Node.js", "Postgres"],
        img:wavvy,
        demoLink:"https://wavvy.kidus.codes",
        sourceLink:"#",
        detailLink:`/projects/${ProjectDetail[1]?.id}`
    },
    {
        title:"Movix",
        featured:true,
        desc:"Full-stack movie streaming platform with TMDB integration, auth, and reviews.",
        tags:["React", "Node.js", "Postgres", "Tailwind"],
        img:movie,
        demoLink:"https://movix-psi-seven.vercel.app/",
        sourceLink:"https://github.com/justKiduss/portfolio-repo/tree/main/chill-time",
        detailLink:`/projects/${ProjectDetail[2]?.id}`
    }

] 