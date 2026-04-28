import '../App.css';

export default function Hero(){

    return(
        <section>
            <h1 className="text-5xl font-bold mb-6">Hey! I'm <span className="text-pink-500">Kidus</span></h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
                I'm a developer focused on JavaScript internals and building 
                full-stack applications. Currently mastering the path to job readiness.
            </p>
            <div className="m-6 flex gap-3">
                <svg 
                className="w-6 h-6 text-purple-500 mb-3 pt-1" 
                role="presentation" 
                aria-hidden="true"
                >
                <use href="/icons.svg#social-icon"></use>
                </svg>

            {/* Button Container */}
            <ul className="flex flex-wrap list-none p-0 gap-3">
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
            </ul>
            </div>
        </section>
    )
}