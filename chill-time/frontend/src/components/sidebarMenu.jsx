import { Link } from "react-router-dom";
export default function Sidebar({ onClose }) {
  return (
    <>
      {/* Backdrop to dim the screen */}
      <div 
        className="fixed inset-0 bg-black/50 z-[60]" 
        onClick={onClose} 
      />
      
      {/* Sidebar Content */}
      <aside className="fixed top-0 left-0 h-full w-64 bg-white z-[70] shadow-xl p-6">
        <button onClick={onClose} className="mb-8 font-bold">✕ Close</button>
        <nav className="flex flex-col gap-4">
          <Link to="/" onClick={onClose}>Home</Link>
          <Link to="/movies" onClick={onClose}>Movies</Link>
          <Link to="/series" onClick={onClose}>Series</Link>
        </nav>
      </aside>
    </>
  );
}