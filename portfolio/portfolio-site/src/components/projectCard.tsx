export function ProjectCard({ title, desc, tags, img, demoLink, sourceLink, detailLink }) {
    return (
        <div className="bg-[#111318] border border-zinc-800 rounded-2xl p-5 space-y-4 hover:border-zinc-700 transition">
            <img src={img} className="w-full h-48 object-cover rounded-xl" />
            <div>
                <h2 className="text-lg font-bold text-white">{title}</h2>
                <p className="text-sm text-zinc-400">{desc}</p>
            </div>
            <div className="flex gap-2 flex-wrap text-[10px] uppercase font-medium">
                {tags.map(tag => <span key={tag} className="px-2 py-1 bg-zinc-800 text-zinc-300 rounded-full">{tag}</span>)}
            </div>
            <div className="flex items-center gap-4 pt-4 border-t border-zinc-800">
                <a href={demoLink} className="text-xs text-white hover:text-purple-400">Demo</a>
                <a href={sourceLink} className="text-xs text-white hover:text-purple-400">Code</a>
                <a href={detailLink} className="text-xs text-purple-400 font-bold ml-auto">Details →</a>
            </div>
        </div>
    );
}