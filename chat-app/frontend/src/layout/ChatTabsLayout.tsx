import { useState, useEffect } from "react";
import { Outlet, Link, useParams, useLocation } from "react-router-dom";
import { getUserInteraction } from "../service/MessageService";
import { useChatStore } from "../store/useChatStore";
import { MessageSquare } from "lucide-react"; 

type TabOption = "active" | "online";

export default function ChatsTabsLayout() {
  const [activeTab, setActiveTab] = useState<TabOption>("active");
  const { id: activeChatId } = useParams(); 
  const [loadingUsers, setLoadingUsers] = useState(false);
  const location = useLocation();
  
  const isBaseChatsRoute = location.pathname === "/dashboard/chats" || location.pathname === "/dashboard/chats/";

  const users = useChatStore((state) => state.users);
  const setUsers = useChatStore((state) => state.setUsers);
  const onlineUsers = useChatStore((state) => state.onlineUsers);
  const currentUser = useChatStore((state) => state.user);

  useEffect(() => {
    async function fetchSidebarThreads() {
      try {
        setLoadingUsers(true);
        const data = await getUserInteraction();
        setUsers(data || []);
      } catch (err) {
        console.error("Could not load interactions:", err);
        setUsers([]);
      } finally {
        setLoadingUsers(false);
      }
    }
    fetchSidebarThreads();
  }, [setUsers]);
  

  console.log("console.log",users);
  console.log("onine",onlineUsers);
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
              Active Chats
            </button>
            <button
              onClick={() => setActiveTab("online")}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${
                activeTab === "online"
                  ? "bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white"
                  : "text-zinc-400 hover:text-zinc-600 dark:text-zinc-500"
              }`}
            >
              Online ({onlineUsers.length > 0 ? onlineUsers.filter(u => Number(u.userId) !== Number(currentUser?.id)).length : 0})
            </button>
          </div>

          {/* User List Threads */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {loadingUsers ? (
              <div className="p-4 text-center font-mono text-xs text-zinc-400">
                Loading conversations...
              </div>
            ) : activeTab === "active" ? (
              users.length === 0 ? (
                <div className="p-4 text-center text-xs text-zinc-400">
                  No active conversations yet.
                </div>
              ) : (
                users.map((chat) => (
                  <Link
                    key={chat.id}
                    to={`${chat.id}`}
                    className={`flex items-center justify-between p-3 rounded-lg text-sm transition-colors font-medium ${
                      String(activeChatId) === String(chat.id) 
                        ? "bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white" 
                        : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900/40"
                    }`}
                  >
                    <span>
                      {/* <img src={chat.profilePic} alt="profile pic"/> */}
                    </span>
                    <span>{chat.username}</span>
                    {onlineUsers.some((u) => Number(u.userId) === Number(chat.id)) && (
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    )}
                  </Link>
                ))
              )
            ) : (
              /* ONLINE USERS TAB VIEW */
              onlineUsers
                .filter((onlineUser) => Number(onlineUser.userId) !== Number(currentUser?.id)) // Exclude yourself
                .map((onlineUser) => {
                  return (
                    <Link
                      key={onlineUser.userId}
                      to={`${onlineUser.userId}`}
                      className={`flex items-center justify-between p-3 rounded-lg text-sm transition-colors ${
                        Number(activeChatId) === Number(onlineUser.userId) 
                          ? "bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white" 
                          : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900/40"
                      }`}
                    > 
                      {/* Renders instantly with no extra queries or processing delays! */}
                      <span>{onlineUser.username}</span>
                      <span className="w-2 h-2 bg-green-500 rounded-full shadow-sm" />
                    </Link>
                  );
                })
            )}
          </div>
        </section>

        {/* WORKSPACE CONTENT LAYOUT */}
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
              <Outlet />
            )}
          </div>
        </section>

      </div>
    </div>
  );
}