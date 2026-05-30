import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGroupStore } from "../store/useGroupStore";
import { createAgroup } from "../service/groupService";
import { X, Users, Loader2 } from "lucide-react";

export default function CreateGroup() {
  const [groupName, setGroupName] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const setGroups = useGroupStore((state) => state.setGroups);
  const groups = useGroupStore((state) => state.groups);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!groupName.trim()) return;

    try {
      setIsSubmitting(true);
      setError("");
      
      const newGroup = await createAgroup(groupName.trim());
      
      setGroups([newGroup, ...groups]);
      
      // Navigate directly into the newly created group chat room
      navigate(`/dashboard/group_chats/${newGroup.group_id}`);
    } catch (err: any) {
      console.error("Group creation failed:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-zinc-50 dark:bg-zinc-900/10 h-full w-full">
      <div className="w-full max-w-md bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm relative">
        
        {/* Cancel/Close Button */}
        <button 
          onClick={() => navigate("/dashboard/group_chats")}
          className="absolute right-4 top-4 p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900"
        >
          <X size={16} />
        </button>

        {/* Header Preview Illustration */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-full border border-zinc-100 dark:border-zinc-800/80 mb-3 text-zinc-500">
            <Users size={28} />
          </div>
          <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Create New Channel</h2>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1 max-w-[240px]">
            Group spaces allow real-time text synchronization between multiple members.
          </p>
        </div>

        {/* Creation Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Group Identity Name
            </label>
            <input 
              type="text" 
              placeholder="e.g., Core Team, Dev Sync, Projects" 
              onChange={(e) => setGroupName(e.target.value)} 
              value={groupName}
              disabled={isSubmitting}
              maxLength={32}
              required
              className="w-full px-3 py-2 text-xs font-medium rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 text-zinc-800 dark:text-zinc-200 disabled:opacity-50 transition-colors placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
            />
          </div>

          {/* Feedback Field Status Alert Display */}
          {error && (
            <p className="text-[11px] font-medium text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 p-2.5 rounded-lg">
              {error}
            </p>
          )}

          {/* Submit Actions Button Frame */}
          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => navigate("/dashboard/group_chats")}
              className="flex-1 py-2 text-xs font-bold rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400 disabled:opacity-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !groupName.trim()}
              className="flex-1 py-2 text-xs font-bold rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 disabled:opacity-40 disabled:hover:bg-zinc-900 dark:disabled:hover:bg-zinc-100 transition-colors flex items-center justify-center gap-1.5"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={12} className="animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Channel"
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}