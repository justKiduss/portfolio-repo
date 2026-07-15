import { Link } from "react-router-dom";
import { Github, Twitter } from "lucide-react";

const LINK_GROUPS = [
  {
    title: "Browse",
    links: [
      { label: "Home", to: "/" },
      { label: "Movies", to: "/movies" },
      { label: "Series", to: "/series" },
      { label: "Watch-List", to: "/watchlist" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Login", to: "/login" },
      { label: "Sign Up", to: "/signup" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 transition-colors">
      <div className="max-w-[1800px] mx-auto px-4 md:px-10 py-12">
        <div className="flex flex-col md:flex-row md:justify-between gap-10">
          {/* Brand */}
          <div className="max-w-xs">
            <span className="text-xl font-bold dark:text-white">Movix</span>
            <p className="mt-3 text-sm text-gray-500 dark:text-zinc-500 leading-relaxed">
              Track what you're watching, discover what's trending, and save what's next.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2 rounded-full bg-gray-100 dark:bg-zinc-900 text-gray-600 dark:text-zinc-400 hover:text-cyan-600 dark:hover:text-[#2DE2C1] hover:bg-gray-200 dark:hover:bg-zinc-800 transition-colors"
              >
                <Github size={16} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="p-2 rounded-full bg-gray-100 dark:bg-zinc-900 text-gray-600 dark:text-zinc-400 hover:text-cyan-600 dark:hover:text-[#2DE2C1] hover:bg-gray-200 dark:hover:bg-zinc-800 transition-colors"
              >
                <Twitter size={16} />
              </a>
            </div>
          </div>

          {/* Link groups */}
          <div className="flex flex-wrap gap-12">
            {LINK_GROUPS.map((group) => (
              <div key={group.title}>
                <h3 className="font-['Barlow_Condensed'] font-semibold tracking-[0.15em] uppercase text-xs text-gray-400 dark:text-zinc-500 mb-3">
                  {group.title}
                </h3>
                <ul className="space-y-2">
                  {group.links.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className="text-sm text-gray-600 dark:text-zinc-300 hover:text-cyan-600 dark:hover:text-[#2DE2C1] transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-['JetBrains_Mono'] text-xs text-gray-400 dark:text-zinc-600">
            © {new Date().getFullYear()} Movix. Built by Kidus.
          </p>
          <p className="font-['JetBrains_Mono'] text-xs text-gray-400 dark:text-zinc-600">
            Movie and TV data provided by{" "}
            <a
              href="https://www.themoviedb.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-600 dark:text-[#2DE2C1] hover:underline"
            >
              TMDB
            </a>
            . Not endorsed or certified by TMDB.
          </p>
        </div>
      </div>
    </footer>
  );
}