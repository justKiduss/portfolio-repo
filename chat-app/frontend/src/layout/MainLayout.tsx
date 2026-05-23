// import { Outlet, Link, useLocation } from "react-router-dom";
// import { MessageSquare, Users, Settings } from "lucide-react";
// // import ThemeToggle from "../components/themeToggle";

// export default function MainLayout() {
//   const location = useLocation();

//   const sidebarLinks = [
//     { name: "Messages", path: "/chats", icon: MessageSquare },
//   ];

//   return (
//     <div className="h-screen w-screen flex bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 overflow-hidden">
//       {/* ICON BAR (FAR LEFT) */}
//       <aside className="w-16 bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 flex flex-col items-center py-4 justify-between">
//         <div className="flex flex-col items-center gap-6 w-full">
//           <div className="font-black text-xl text-blue-600">C</div>
          
//           {sidebarLinks.map((link) => {
//             const Icon = link.icon;
//             const isActive = location.pathname.startsWith(link.path);
//             return (
//               <Link
//                 key={link.path}
//                 to={link.path}
//                 className={`p-3 rounded-xl transition-colors ${
//                   isActive 
//                     ? "bg-blue-50 dark:bg-zinc-900 text-blue-600" 
//                     : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
//                 }`}
//               >
//                 <Icon size={22} />
//               </Link>
//             );
//           })}
//         </div>

//         <div className="flex flex-col items-center gap-4">
//           {/* <ThemeToggle /> */}
//           <Settings className="text-zinc-400 cursor-pointer" size={20} />
//         </div>
//       </aside>

//       {/* DYNAMIC CONTENT AREA (HANDS CONTROL TO OUTLET) */}
//       <main className="flex-1 flex min-w-0 relative">
//         <Outlet />
//       </main>
//     </div>
//   );
// }

import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { MessageSquare, Users, Settings } from "lucide-react";

export default function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const sidebarLinks = [
    // Change this to the absolute matching parent path
    { name: "Messages", path: "/dashboard/chats", icon: MessageSquare },
  ];

  return (
    <div className="h-screen w-screen flex bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 overflow-hidden">
      {/* ICON BAR (FAR LEFT) */}
      <aside className="w-16 bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 flex flex-col items-center py-4 justify-between">
        <div className="flex flex-col items-center gap-6 w-full">
          <div className="font-black text-xl text-blue-600">C</div>
          
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            // Matches if the current URL starts with /dashboard/chats
            const isActive = location.pathname.startsWith(link.path);

            const handleIconClick = (e: React.MouseEvent) => {
              // Prevent standard <Link> navigation so we can handle it conditionally
              e.preventDefault();
              
              // If we are already inside a chat (e.g., /dashboard/chats/42), 
              // clicking this will bring us back to the parent list (/dashboard/chats)
              if (location.pathname !== link.path) {
                navigate(link.path);
              }
            };

            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={handleIconClick}
                className={`p-3 rounded-xl transition-colors ${
                  isActive 
                    ? "bg-blue-50 dark:bg-zinc-900 text-blue-600" 
                    : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                }`}
              >
                <Icon size={22} />
              </Link>
            );
          })}
        </div>

        <div className="flex flex-col items-center gap-4">
          <Settings className="text-zinc-400 cursor-pointer" size={20} />
        </div>
      </aside>

      {/* DYNAMIC CONTENT AREA */}
      <main className="flex-1 flex min-w-0 relative">
        <Outlet />
      </main>
    </div>
  );
}