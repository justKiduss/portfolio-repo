import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGroupStore } from "../store/useGroupStore";
import { X, Search, Loader2, ArrowLeft, Check, UserPlus, Users } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { searchByName } from "../service/UserService";
import { addMember } from "../service/groupMember_Service";

export default function AddGroupMember() {
  const { id } = useParams();
  const navigate = useNavigate();
  const groups = useGroupStore((state) => state.groups);
  const users = useChatStore((state) => state.users);

  // 🚀 Safety: Ensure string values never slip into null states
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [usersList, setUsersList] = useState<any[]>([]); 
  const [searchResult, setSearchResult] = useState<any[]>([]); 
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const targetGroup = groups.find((g) => String(g.group_id) === String(id));
  const groupName = targetGroup?.group_name || "Channel";

  // Safe helper evaluation parameter variables
  const queryText = (searchQuery || "").trim();

  // 👥 Effect 1: Show store users immediately, or fetch all users from backend if empty
  useEffect(() => {
    if (queryText) return;

    if (users && users.length > 0) {
      setUsersList(users);
    } else {
      async function fetchAllPlatformUsers() {
        try {
          setIsLoadingUsers(true);
          // 🚀 Fix: Added credentials: 'include' to pass authentication cookies to the /api/users endpoint
          const res = await fetch(`http://localhost:8000/api/users`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include" 
          });
          const json = await res.json();
          if (res.ok && json.success) {
            setUsersList(json.data || []);
          } else if (res.status === 401) {
            setError("Session unauthorized. Please log in again.");
          }
        } catch (err) {
          console.error("Failed to load global platform users:", err);
        } finally {
          setIsLoadingUsers(false);
        }
      }
      fetchAllPlatformUsers();
    }
  }, [queryText, users]);

  // 🔍 Effect 2: Run debounced backend query search
  useEffect(() => {
    if (!queryText) {
      setSearchResult([]);
      return;
    }

    async function searchGroup() {
      try {
        setIsLoadingUsers(true);
        const data = await searchByName(queryText);
        setSearchResult(data || []);
      } catch (err) {
        console.error("Error searching groups:", err);
        setSearchResult([]);
      } finally {
        setIsLoadingUsers(false);
      }
    }

    const delayDebounce = setTimeout(() => {
      searchGroup();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [queryText]);

  const handleToggleUser = (userId: number) => {
    setSelectedUsers((prev) =>
      prev.includes(userId) ? prev.filter((uid) => uid !== userId) : [...prev, userId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUsers.length === 0) return;

    try {
      setIsSubmitting(true);
      setError("");
      await addMember(Number(id),selectedUsers)
      navigate(`/dashboard/group_chats/${id}`);
    } catch (err: any) {
      console.error("Operation failed:", err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 🚀 Safety Fallback Checks for runtime array structures
  const rawDisplayList = queryText ? searchResult : usersList;
  const activeDisplayList = Array.isArray(rawDisplayList)
    ? rawDisplayList
    : rawDisplayList 
      ? [rawDisplayList] 
      : [];

  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-zinc-50 dark:bg-zinc-900/10 h-full w-full">
      <div className="w-full max-w-md bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm relative">
        
        {/* Cancel Button */}
        <button 
          onClick={() => navigate(`/dashboard/group_chats/${id}`)}
          className="absolute right-4 top-4 p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900"
        >
          <X size={16} />
        </button>

        {/* Dynamic Context Header */}
        <div className="flex flex-col items-center text-center mb-5">
          <div className="p-3.5 bg-zinc-50 dark:bg-zinc-900 rounded-full border border-zinc-100 dark:border-zinc-800/80 mb-2.5 text-zinc-500">
            <UserPlus size={24} />
          </div>
          <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Manage Group Members</h2>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
            Adding participants to <span className="font-semibold text-zinc-700 dark:text-zinc-300">{groupName}</span>
          </p>
        </div>

        {error && (
          <p className="text-[11px] font-medium text-red-500 bg-red-50 dark:bg-red-950/20 p-2 rounded-lg mb-4">
            {error}
          </p>
        )}

        <div className="space-y-4">
          {/* Live Name Input Filtering */}
          <div className="relative flex items-center">
            <Search size={14} className="absolute left-3 text-zinc-400 pointer-events-none" />
            <input 
              type="text"
              placeholder="Search by name, or leave blank to browse app users..."
              value={searchQuery || ""}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs font-medium rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
            />
          </div>

          {/* Subheading displaying current mode */}
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1">
              <Users size={10} />
              {queryText ? "Search Results" : "Available Platform Users"}
            </span>
            {selectedUsers.length > 0 && (
              <span className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400">
                {selectedUsers.length} selected
              </span>
            )}
          </div>

          {/* Dynamic Users Scroll Matrix Container */}
          <div className="border border-zinc-100 dark:border-zinc-900 rounded-lg max-h-52 overflow-y-auto divide-y divide-zinc-50 dark:divide-zinc-900/60 p-1 bg-zinc-50/30 dark:bg-zinc-900/10">
            {isLoadingUsers ? (
              <div className="flex flex-col items-center justify-center py-10 gap-2 text-zinc-400 text-xs">
                <Loader2 size={16} className="animate-spin" />
                <span>Loading profile database...</span>
              </div>
            ) : activeDisplayList.length === 0 ? (
              <p className="text-[11px] text-zinc-400 text-center py-8">
                No users found matching that query.
              </p>
            ) : (
              activeDisplayList.map((user) => {
                const isChecked = selectedUsers.includes(user.id);
                return (
                  <div 
                    key={user.id}
                    onClick={() => handleToggleUser(user.id)}
                    className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors ${
                      isChecked ? "bg-zinc-100/80 dark:bg-zinc-900/80" : "hover:bg-zinc-50 dark:hover:bg-zinc-900/40"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-500 uppercase">
                        {user.username?.substring(0, 2)}
                      </div>
                      <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                        {user.username}
                      </span>
                    </div>
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                      isChecked 
                        ? "bg-zinc-900 border-zinc-900 text-white dark:bg-zinc-100 dark:border-zinc-100 dark:text-zinc-950" 
                        : "border-zinc-300 dark:border-zinc-700"
                    }`}>
                      {isChecked && <Check size={10} strokeWidth={3} />}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Action Footer Navigation Control */}
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => navigate(`/dashboard/group_chats/${id}`)}
              className="py-2 px-3 text-xs font-bold rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400 transition-colors flex items-center gap-1"
            >
              <ArrowLeft size={14} /> Back
            </button>
            
            <button
              type="button"
              disabled={isSubmitting || selectedUsers.length === 0}
              onClick={handleSubmit}
              className="flex-1 py-2 text-xs font-bold rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors flex items-center justify-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={12} className="animate-spin" />
                  Updating Room...
                </>
              ) : (
                `Add Members (${selectedUsers.length})`
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}