export function Header(){
    return(
        <>
        <header className="w-full">
            <nav className="max-w-4xl mx-auto flex justify-between items-center px-6 pt-4 pb-0">
                <div className="bg-white px-4 py-1 rounded">
                    <h2 className="text-black font-bold">Kidus</h2>
                </div>
                <ul className="flex list-none gap-6">
                    <li><a href="/about" className="hover:text-purple-500">About me</a></li>
                    <li><a href='/resume' className="hover:text-purple-500">Resume</a></li>
                    <li><a href='/projects' className="hover:text-purple-500">Projects</a></li>
                </ul>
            </nav>
        </header>
        </>
    )
}