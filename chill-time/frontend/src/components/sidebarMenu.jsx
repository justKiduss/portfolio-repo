// import { Link } from "react-router-dom";
// export default function Sidebar({ onClose }) {
//   return (
//     <>
//       {/* Backdrop to dim the screen */}
//       <div 
//         className="fixed inset-0 bg-black/50 z-[60]" 
//         onClick={onClose} 
//       />
      
//       {/* Sidebar Content */}
//       <aside className="fixed top-0 left-0 h-full w-64 bg-white z-[70] shadow-xl p-6">
//         <button onClick={onClose} className="mb-8 font-bold">✕ Close</button>
//         <nav className="flex flex-col gap-4">
//           <Link to="/" onClick={onClose}>Home</Link>
//           <Link to="/movies" onClick={onClose}>Movies</Link>
//           <Link to="/series" onClick={onClose}>Series</Link>
//           <Link to="/login" onClick={onClose}>Login</Link>
//         </nav>
//       </aside>
//     </>
//   );
// }



import { Link } from "react-router-dom";

export default function Sidebar({ onClose }) {
  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-[60]" onClick={onClose} />

      <aside className="fixed top-0 left-0 h-full w-64 bg-white dark:bg-zinc-950 border-r dark:border-zinc-800 z-[70] shadow-xl p-6">
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="mb-8 font-['Barlow_Condensed'] font-semibold tracking-widest uppercase text-sm dark:text-white hover:text-cyan-600 dark:hover:text-[#2DE2C1] transition-colors"
        >
          ✕ Close
        </button>
        <nav className="flex flex-col gap-1">
          {[
            { to: "/", label: "Home" },
            { to: "/movies", label: "Movies" },
            { to: "/series", label: "Series" },
            { to: "/login", label: "Login" },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={onClose}
              className="px-2 py-2.5 rounded font-['Inter'] text-sm dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-900 hover:text-cyan-600 dark:hover:text-[#2DE2C1] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}