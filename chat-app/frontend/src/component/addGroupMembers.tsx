import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGroupStore } from "../store/useGroupStore";
import { X, Search, Loader2, ArrowLeft, Check, UserPlus } from "lucide-react";

export default function AddGroupMember() {
  const { id } = useParams(); // Retrieves the active group_id from URL path
  const navigate = useNavigate();
  const groups = useGroupStore((state) => state.groups);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Find the active group name to show in the UI header
  const targetGroup = groups.find((g) => String(g.group_id) === String(id));
  const groupName = targetGroup?.group_name || "Channel";

  // 🔍 Debounced profile database search lookup
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/users/search?q=${searchQuery}`);
        const data = await res.json();
        setSearchResults(data || []);
      } catch (err) {
        console.error("User query lookup failed:", err);
      }
    }, 350);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

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

      const res = await fetch(`http://localhost:8000/api/group/${id}/add-members`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userIds: selectedUsers }),
      });

      if (!res.ok) throw new Error("Could not add selected users to this group.");

      // Success! Send the user straight back to the group chat space
      navigate(`/dashboard/group_chats/${id}`);
    } catch (err: any) {
      console.error("Failed to append users:", err);
      setError(err.message || "An unexpected network execution block occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-zinc-50 dark:bg-zinc-900/10 h-full w-full">
      <div className="w-full max-w-md bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm relative">
        
        {/* Close/Back Button */}
        <button 
          onClick={() => navigate(`/dashboard/group_chats/${id}`)}
          className="absolute right-4 top-4 p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900"
        >
          <X size={16} />
        </button>

        {/* Header Preview Layout */}
        <div className="flex flex-col items-center text-center mb-5">
          <div className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-full border border-zinc-100 dark:border-zinc-800/80 mb-3 text-zinc-500">
            <UserPlus size={26} />
          </div>
          <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Add Members</h2>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
            Invite workspace users directly into <span className="font-semibold text-zinc-700 dark:text-zinc-300">{groupName}</span>.
          </p>
        </div>

        {error && (
          <p className="text-[11px] font-medium text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 p-2.5 rounded-lg mb-4">
            {error}
          </p>
        )}

        {/* Search Field Box Container */}
        <div className="space-y-4">
          <div className="relative flex items-center">
            <Search size={14} className="absolute left-3 text-zinc-400 pointer-events-none" />
            <input 
              type="text"
              placeholder="Search usernames by exact tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs font-medium rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
            />
          </div>

          {/* Results Grid View Matrix */}
          <div className="border border-zinc-100 dark:border-zinc-900 rounded-lg max-h-48 overflow-y-auto divide-y divide-zinc-50 dark:divide-zinc-900/60 p-1">
            {searchResults.length === 0 ? (
              <p className="text-[11px] text-zinc-400 text-center py-6">
                {searchQuery ? "No workspace matches found" : "Type above to lookup platform users"}
              </p>
            ) : (
              searchResults.map((user) => {
                const isChecked = selectedUsers.includes(user.id);
                return (
                  <div 
                    key={user.id}
                    onClick={() => handleToggleUser(user.id)}
                    className="flex items-center justify-between p-2 rounded-md hover:bg-zinc-50 dark:hover:bg-zinc-900/40 cursor-pointer transition-colors"
                  >
                    <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{user.username}</span>
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                      isChecked ? "bg-zinc-900 border-zinc-900 text-white dark:bg-zinc-100 dark:border-zinc-100 dark:text-zinc-950" : "border-zinc-300 dark:border-zinc-700"
                    }`}>
                      {isChecked && <Check size={10} strokeWidth={3} />}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Core Submit Buttons Footer layout */}
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
              className="flex-1 py-2 text-xs font-bold rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors flex items-center justify-center gap-1.5 disabled:opacity-40"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={12} className="animate-spin" />
                  Adding...
                </>
              ) : (
                `Add Selected (${selectedUsers.length})`
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}