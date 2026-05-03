import '../App.css';
import { Mail } from 'lucide-react';
export default function Hero(){

    return(
        <section className='space-y-4 h-auto'>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-left">Hey! I'm <span className="text-purple-500">Kidus</span></h1>
            <p className="text-zinc-400 leading-7 text-base max-w-xl text-left">
                I build full-stack web applications and I'm actively looking for junior roles.
            </p>
            <div className="flex gap-3 pt-2">
            <ul className="flex flex-wrap list-none gap-3">
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