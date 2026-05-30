import { useState, useEffect,useRef } from "react";
import { Outlet, Link, useParams, useLocation } from "react-router-dom";
import { useGroupStore } from "../store/useGroupStore";
import { MenuIcon, MessageSquare, Search as SearchIcon, Users,Plus } from "lucide-react";
import { allGroups, getGroupsByName } from "../service/groupService";
import { useNavigate } from "react-router-dom";

type TabOption = "active" | "online";

export default function GroupTabsLayout() {
  const [activeTab, setActiveTab] = useState<TabOption>("active");
  const { id: activeChatId } = useParams(); 

  const location = useLocation();
  const isBaseChatsRoute = location.pathname === "/dashboard/group_chats" || location.pathname === "/dashboard/group_chats/";

  const groups = useGroupStore((state) => state.groups);
  const setGroups = useGroupStore((state) => state.setGroups);
  const isLoading = useGroupStore((state) => state.isLoading);
  const setIsLoading = useGroupStore((state) => state.setIsLoading);
  
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  // Fetch initial base groups
  useEffect(() => {
    async function fetchSidebarThreads() {
      try {
        setIsLoading(true);
        const data = await allGroups();
        setGroups(data || []);
      } catch (err) {
        console.error("Could not load interactions:", err);
        setGroups([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSidebarThreads();
  }, [setGroups, setIsLoading]);

  // Handle dynamic group searching
  useEffect(() => {
    if (!search.trim()) {
      setSearchResult([]);
      return;
    }

    console.log(searchResult)
    async function searchGroup() {
      try {
        setIsLoading(true);
        const data = await getGroupsByName(search.trim());
        setSearchResult(data || []);
      } catch (err) {
        console.error("Error searching groups:", err);
        setSearchResult([]);
      } finally {
        setIsLoading(false);
      }
    }

    const delayDebounce = setTimeout(() => {
      searchGroup();
    }, 300); // 300ms debounce to prevent hitting the backend on every single keystroke

    return () => clearTimeout(delayDebounce);
  }, [search, setIsLoading]);

  // Determine which group array context to display
  const displayGroups = search.trim() !== "" ? searchResult : groups;

  return (
    <div className="w-full h-screen flex bg-zinc-50 dark:bg-zinc-900/40 overflow-hidden">
      <div className="flex-1 flex h-full min-w-0 relative">
        
        {/* SIDEBAR */}
        <section className={`w-full md:w-80 bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 flex flex-col h-full shrink-0 ${
          isBaseChatsRoute ? "flex" : "hidden md:flex"
        }`}>
          {/* Tab Headers */}
          <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex gap-2">
            <button
              onClick={() => setActiveTab("active")}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${
                activeTab === "active"
                  ? "bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white"
                  : "text-zinc-400 hover:text-zinc-600 dark:text-zinc-500"
              }`}
            >
              Groups
            </button>
            <button
              onClick={() => setActiveTab("online")}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${
                activeTab === "online"
                  ? "bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white"
                  : "text-zinc-400 hover:text-zinc-600 dark:text-zinc-500"
              }`}
            >
              Online 
            </button>
          </div>

          <div className="px-4 py-2 border-b border-zinc-100 dark:border-zinc-900 flex items-center gap-2 relative" ref={menuRef}>
            <div className="relative flex-1 flex items-center">
              <SearchIcon className="absolute left-3 w-4 h-4 text-zinc-400 pointer-events-none" />
              <input 
                type="text" 
                placeholder="Search a group..." 
                onChange={(e) => setSearch(e.target.value)} 
                value={search}
                className="w-full pl-9 pr-4 py-2 text-xs font-medium rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 text-zinc-800 dark:text-zinc-200 transition-colors"
              />
            </div>
            
            {/* Menu Dropdown Trigger Container Block */}
            <div className="relative">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg transition-colors"
              >
                <MenuIcon size={18} />
              </button>
              {isMenuOpen && (
                <div className="absolute right-0 mt-1 w-44 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-lg py-1 z-50 animate-in fade-in slide-in-from-top-1 duration-100">
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate("create-group");
                    }}
                    className="w-full px-3 py-2 text-left text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 flex items-center gap-2 transition-colors"
                  >
                    <Plus size={14} />
                    Create New Group
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Group Content List Thread Box */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {isLoading ? (
              <div className="p-4 text-center font-mono text-xs text-zinc-400">
                Loading conversations...
              </div>
            ) : activeTab === "active" ? (
              displayGroups.length === 0 ? (
                <div className="p-4 text-center text-xs text-zinc-400">
                  {search.trim() ? "No matching groups found." : "No active conversations yet."}
                </div>
              ) : (
                displayGroups.map((group: any) => (
                  <Link
                    key={group.group_id}
                    to={`${group.group_id}`}
                    className={`flex items-center gap-3 p-3 rounded-lg text-sm transition-colors font-medium ${
                      String(activeChatId) === String(group.group_id) 
                        ? "bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white" 
                        : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900/40"
                    }`}
                  >
                    <Users size={16} className="text-zinc-400 shrink-0" />
                    <span className="truncate">{group.group_name}</span>
                  </Link>
                ))
              )
            ) : (
              <div className="p-4 text-center text-xs text-zinc-400 font-medium">
                Online users viewing panel
              </div>
            )}
          </div>
        </section>

        {/* WORKSPACE CONTENT LAYOUT FRAME */}
        <section className={`flex-1 h-full min-w-0 bg-zinc-50 dark:bg-zinc-900/30 relative flex flex-col ${
          isBaseChatsRoute ? "hidden md:flex" : "flex"
        }`}>  
          <div className="flex-1 h-full min-w-0">
            {isBaseChatsRoute ? (
              <div className="hidden md:flex flex-col items-center justify-center h-full text-zinc-400 dark:text-zinc-600 space-y-2">
                <div className="p-4 bg-zinc-100 dark:bg-zinc-950 rounded-full border border-zinc-200 dark:border-zinc-800/60 shadow-inner">
                  <MessageSquare size={32} />
                </div>
                <p className="text-sm font-medium">Select a group conversation to start chatting</p>
              </div>
            ) : (
              <Outlet />
            )}
          </div>
        </section>

      </div>
    </div>
  );
}