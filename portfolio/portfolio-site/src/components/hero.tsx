import '../App.css';
import { Mail } from 'lucide-react';
export default function Hero(){

    return(
        <section className='space-y-6'>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">Hey! I'm <span className="text-purple-500">Kidus</span></h1>
            <p className="text-zinc-400 leading-8 text-lg max-w-xl space-y-6 text-left">
                I build full-stack web applications and I'm actively looking for junior roles.
            </p>
            <div className="m-6 flex gap-2">
                <svg 
                className="w-6 h-6 text-purple-500 mb-3 mt-6" 
                role="presentation" 
                aria-hidden="true"
                >
                    <use href="/icons.svg#social-icon"></use>
                </svg>

            {/* Button Container */}
            <ul className="flex flex-wrap list-none p-4 gap-3">
                <li>
                <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-2 bg-[#242933] hover:bg-[#2e3440] text-white px-4 py-2 rounded-lg text-sm font-medium border border-[#3b4252] transition-colors"
                >
                    <svg className="w-[18px] h-[18px]" role="presentation" aria-hidden="true">
                    <use href="/icons.svg#github-icon"></use>
                    </svg>
                    GitHub
                </a>
                </li>
                
                <li>
                <a 
                    href="https://x.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-2 bg-[#242933] hover:bg-[#2e3440] text-white px-4 py-2 rounded-lg text-sm font-medium border border-[#3b4252] transition-colors"
                >
                    <svg className="w-[18px] h-[18px]" role="presentation" aria-hidden="true">
                    <use href="/icons.svg#x-icon"></use>
                    </svg>
                    X.com
                </a>
                </li>

                <li>
                <a 
                    href="https://gmail.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-2 bg-[#242933] hover:bg-[#2e3440] text-white px-4 py-2 rounded-lg text-sm font-medium border border-[#3b4252] transition-colors"
                >
                    <Mail className='w-4 h-4'/>
                    Email
                </a>
                </li>
            </ul>
            </div>
        </section>
    )
}