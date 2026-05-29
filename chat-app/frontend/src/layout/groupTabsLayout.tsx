import { useState, useEffect } from "react";
import { Outlet, Link, useParams, useLocation } from "react-router-dom";
import { useGroupStore } from "../store/useGroupStore";
import {MessageSquare } from "lucide-react";
import { allGroups } from "../service/groupService";

type TabOption = "active" | "online";

export default function GroupTabsLayout() {
  const [activeTab, setActiveTab] = useState<TabOption>("active");
  const { id: activeChatId } = useParams(); 

  const location = useLocation();
  const isBaseChatsRoute = location.pathname === "/dashboard/group_chats" || location.pathname === "/dashboard/group_chats/";

  const groups=useGroupStore((state)=>state.groups);
  const setGroups=useGroupStore((state)=>state.setGroups);
  const isLoading=useGroupStore((state)=>state.isLoading);
  const setIsLoading=useGroupStore((state)=>state.setIsLoading);

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
  }, [setGroups,setIsLoading]);


  console.log("groups",groups)
  return (
    <div className="w-full h-screen flex bg-zinc-50 dark:bg-zinc-900/40 overflow-hidden">
      <div className="flex-1 flex h-full min-w-0 relative">
        
        {/* SIDEBAR */}
        {/* Mobile: If a chat is active, hide sidebar. If on base /chats, show sidebar full-screen. */}
        {/* Laptop (md:flex): Always remains visible side-by-side. */}
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
              {/* ({onlineUsers.length}) */}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {isLoading ? (
              <div className="p-4 text-center font-mono text-xs text-zinc-400">
                Loading conversations...
              </div>
            ) : activeTab === "active" ? (
              groups.length === 0 ? (
                <div className="p-4 text-center text-xs text-zinc-400">
                  No active conversations yet.
                </div>
              ) : (
                groups.map((group) => (
                  <Link
                    key={group.group_id}
                    to={`${group.group_id}`}
                    className={`flex items-center justify-between p-3 rounded-lg text-sm transition-colors font-medium ${
                      String(activeChatId) === String(group.group_id) 
                        ? "bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white" 
                        : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900/40"
                      }`}
                  >
                    <span>{group.group_name}</span>
                    {/* {onlineUsers.includes(chat.id) && (
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    )} */}
                  </Link>
                ))
              )
            ) : (
            //   onlineUsers.map((userId) => {
            //     const matchedUser = users.find((u) => u.id === userId);
            //     return (
            //       <Link
            //         key={userId}
            //         to={`${userId}`}
            //         className={`flex items-center justify-between p-3 rounded-lg text-sm transition-colors ${
            //           Number(activeChatId) === userId 
            //             ? "bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white" 
            //             : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900/40"
            //         }`}
            //       >
            //         <span>{matchedUser?.username || `User ${userId}`}</span>
            //         <span className="w-2 h-2 bg-green-500 rounded-full" />
            //       </Link>
            //     );
            //   })
                <p>online users</p>
            )}
          </div>
        </section>

        <section className={`flex-1 h-full min-w-0 bg-zinc-50 dark:bg-zinc-900/30 relative flex flex-col ${
          isBaseChatsRoute ? "hidden md:flex" : "flex"
        }`}>  
          <div className="flex-1 h-full min-w-0">
            {isBaseChatsRoute ? (

              <div className="hidden md:flex flex-col items-center justify-center h-full text-zinc-400 dark:text-zinc-600 space-y-2">
                <div className="p-4 bg-zinc-100 dark:bg-zinc-950 rounded-full border border-zinc-200 dark:border-zinc-800/60 shadow-inner">
                  <MessageSquare size={32} />
                </div>
                <p className="text-sm font-medium">Select a conversation to start chatting</p>
              </div>
            ) : (
              /* Active Chat Message Room Screen */
              <Outlet />
            )}
          </div>
        </section>

      </div>
    </div>
  );
}