import { useState, useEffect } from "react";
import { Outlet, Link, useParams } from "react-router-dom";
import { getUserInteraction } from "../service/MessageService";
import { useChatStore } from "../store/useChatStore";

type TabOption = "active" | "online";

export default function ChatsTabsLayout() {
  const [activeTab, setActiveTab] = useState<TabOption>("active");
  const [onlineUsers, setOnlineUsers] = useState<number[]>([]);
  const { id: activeChatId } = useParams(); 
  const [loadingUsers, setLoadingUsers] = useState(false);
  
  // Connect cleanly to your dynamic Zustand global array state
  const users = useChatStore((state) => state.users);
  const setUsers = useChatStore((state) => state.setUsers);
  
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
  return (
    <div className="flex-1 flex h-full min-w-0">
      
      {/* MIDDLE LIST COLUMN */}
      <section className="w-80 bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 flex flex-col h-full">
        {/* Tab Headers */}
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex gap-2">
          <button
            onClick={() => setActiveTab("active")}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${
              activeTab === "active"
                ? "bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white"
                : "text-zinc-400 hover:text-zinc-600"
            }`}
          >
            Active Chats
          </button>
          <button
            onClick={() => setActiveTab("online")}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${
              activeTab === "online"
                ? "bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white"
                : "text-zinc-400 hover:text-zinc-600"
            }`}
          >
            Online Users ({onlineUsers.length})
          </button>
        </div>

        {/* Dynamic Lists View Render */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {loadingUsers ? (
            <div className="p-4 text-center font-mono text-xs text-zinc-400 dark:text-zinc-500">
              Loading conversations...
            </div>
          ) : activeTab === "active" ? (
            users.length === 0 ? (
              <div className="p-4 text-center text-xs text-zinc-400 dark:text-zinc-500">
                No active conversations yet.
              </div>
            ) : (
              // Map through real data array containing {id, username, email}
              users.map((chat) => (
                <Link
                  key={chat.id}
                  to={`${chat.id}`}
                  className={`flex items-center p-3 rounded-lg text-sm transition-colors font-medium ${
                    String(activeChatId) === String(chat.id) 
                      ? "bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white" 
                      : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900/40"
                  }`}
                >
                  {chat.username}
                </Link>
              ))
            )
          ) : (
            onlineUsers.map((userId) => (
              <Link
                key={userId}
                to={`/chats/${userId}`}
                className={`flex items-center justify-between p-3 rounded-lg text-sm transition-colors ${
                  Number(activeChatId) === userId ? "bg-zinc-100 dark:bg-zinc-900" : "hover:bg-zinc-50 dark:hover:bg-zinc-900/40"
                }`}
              >
                {/* <span className="text-zinc-700 dark:text-zinc-300">
                  User {userId} {userId === 42 ? "(You)" : ""}
                </span> */}
                <span className="w-2 h-2 bg-green-500 rounded-full shadow-sm animate-pulse" />
              </Link>
            ))
          )}
        </div>
      </section>

      {/* CHAT WINDOW LAYER (FAR RIGHT PANEL) */}
      <section className="flex-1 h-full min-w-0 bg-zinc-50 dark:bg-zinc-900/30">
        <Outlet />
      </section>

    </div>
  );
}