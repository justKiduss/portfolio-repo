export const AboutMe = () => {
    return (
        <section className="space-y-6">
            <h2 className="text-2xl font-bold text-white">About Me</h2>
            
            <div className="space-y-4 text-zinc-400 leading-7 text-base max-w-xl">
                <p>
                    I'm a self-taught full-stack developer based in Addis Ababa, Ethiopia, 
                    currently studying at university and actively looking for my first junior 
                    developer role or internship.
                </p>
                <p>
                    I learn by building. Every project here was built end-to-end — frontend, 
                    backend, database, deployment — not from a tutorial, but from understanding 
                    the problem and figuring out the architecture.
                </p>
                <p>
                    I care about understanding <span className="text-white">why</span> a system 
                    is built the way it is, not just making it work. I'm currently deepening my 
                    knowledge of database design, distributed systems, and production architecture.
                </p>
                <p className="text-zinc-500 text-sm">
                    No professional experience yet — these projects are how I prove what I can do.
                </p>
            </div>

            <div className="space-y-2">
                <p className="text-xs uppercase tracking-widest text-zinc-500 font-medium">Stack</p>
                <p className="text-zinc-400 text-sm leading-relaxed">
                    TypeScript · JavaScript · React · Node.js · Express · PostgreSQL · 
                    Socket.io · REST APIs · JWT · Git
                </p>
            </div>
        </section>
    );
}