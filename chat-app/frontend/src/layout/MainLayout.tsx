import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { CircleUser, MessageSquare, Settings, Users } from "lucide-react";

export default function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const sidebarLinks = [
    { name: "Messages", path: "/dashboard/chats", icon: MessageSquare },
    { name: "GroupMessage", path: "/dashboard/group_chats", icon: Users },
    { name:"profile", path:"/dashboard/profile",icon:CircleUser}
  ];

  return (
    <div className="h-screen w-screen flex bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 overflow-hidden">
      {/* ICON BAR (FAR LEFT) */}
      <aside className="w-16 bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 flex flex-col items-center py-4 justify-between">
        <div className="flex flex-col items-center gap-6 w-full">
          <div className="font-black text-xl text-blue-600">C</div>
          
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            
            // Checks if path matches exactly or starts with the base route cleanly
            const isActive = location.pathname.startsWith(link.path);

            const handleIconClick = (e: React.MouseEvent) => {
              e.preventDefault();
              
              // If we are deep inside a sub-route (like /dashboard/chats/42) 
              // and click the same section icon, go back to the base list.
              if (location.pathname.startsWith(link.path) && location.pathname !== link.path) {
                navigate(link.path);
              } else {
                // Otherwise, freely jump directly to the target path tab
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