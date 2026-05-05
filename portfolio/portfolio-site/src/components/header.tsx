import { useLocation } from "react-router-dom"
import {Link } from "react-router-dom";
export function Header(){
    const location=useLocation();
    const crumbs = location.pathname
    .split("/")
    .filter(Boolean); 
    return(
        <>
        <header className="sticky top-0 z-50 w-full bg-[#0b0c10]/80 backdrop-blur-md">
            <nav className="max-w-4xl mx-auto flex justify-between items-center px-6 pt-4 pb-0">
                 
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Link to="/" className="hover:text-purple-400">home</Link>
                    
                    {crumbs.map((crumb, i) => {
                        const path = "/" + crumbs.slice(0, i + 1).join("/");
                        const isLast = i === crumbs.length - 1;
                        
                        return (
                        <span key={path} className="flex items-center gap-2">
                            <span className="text-gray-600">/</span>
                            {isLast ? (
                            <span className="text-purple-400">{crumb}</span>
                            ) : (
                            <Link to={path} className="hover:text-purple-400">{crumb}</Link>
                            )}
                        </span>
                        );
                    })}
                    </div>
                <ul className="flex list-none gap-4 md:gap-8 sm:gap-0.5">
                    <li><a href="/about" className="hover:text-purple-500 text-sm md:text-base">About me</a></li>
                    <li><a href='/resume' className="hover:text-purple-500 text-sm md:text-base">Resume</a></li>
                    <li><a href='/projects' className="hover:text-purple-500 text-sm md:text-base">Projects</a></li>
                </ul>
            </nav>
        </header>
        </>
    )
}