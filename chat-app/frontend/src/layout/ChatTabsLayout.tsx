import { useState, useEffect } from "react";
import { Outlet, Link, useParams } from "react-router-dom";
import { io } from "socket.io-client";

type TabOption = "active" | "online";

export default function ChatsTabsLayout() {
  const [activeTab, setActiveTab] = useState<TabOption>("active");
  const [onlineUsers, setOnlineUsers] = useState<number[]>([]);
  const { id: activeChatId } = useParams(); // Detects which user is currently clicked

  // Mock Active Threads History
  const activeChatsMock = [
    { id: 101, name: "Alexander" },
    { id: 102, name: "Helen" }
  ];

  useEffect(() => {
    const socket = io("http://localhost:3000", {
      query: { userId: 42 },
      withCredentials: true
    });

    socket.on("onlineUsers", (users: number[]) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

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
          {activeTab === "active" ? (
            activeChatsMock.map((chat) => (
              <Link
                key={chat.id}
                to={`/chats/${chat.id}`}
                className={`flex items-center p-3 rounded-lg text-sm transition-colors ${
                  Number(activeChatId) === chat.id ? "bg-zinc-100 dark:bg-zinc-900" : "hover:bg-zinc-50 dark:hover:bg-zinc-900/40"
                }`}
              >
                {chat.name}
              </Link>
            ))
          ) : (
            onlineUsers.map((userId) => (
              <Link
                key={userId}
                to={`/chats/${userId}`}
                className={`flex items-center justify-between p-3 rounded-lg text-sm transition-colors ${
                  Number(activeChatId) === userId ? "bg-zinc-100 dark:bg-zinc-900" : "hover:bg-zinc-50 dark:hover:bg-zinc-900/40"
                }`}
              >
                <span>User {userId} {userId === 42 ? "(You)" : ""}</span>
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