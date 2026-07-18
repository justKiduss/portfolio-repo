import { useState } from "react";
import { MessageSquarePlus, Send } from "lucide-react";
import { buildMailtoUrl } from "../utils/mailto";

// Replace with your real address, or read from an env var if you'd rather
// not hardcode it: import.meta.env.VITE_FEEDBACK_EMAIL
const FEEDBACK_EMAIL = "YOUR_EMAIL@example.com";

export default function FeedbackWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!message.trim()) return;

    const body = `${message}\n\n---\nPage: ${window.location.href}\nSent: ${new Date().toLocaleString()}`;
    const mailtoUrl = buildMailtoUrl({
      to: FEEDBACK_EMAIL,
      subject: "Movix feedback",
      body,
    });

    window.location.href = mailtoUrl;
    setSent(true);
    setMessage("");
    setTimeout(() => {
      setSent(false);
      setOpen(false);
    }, 2500);
  }

  return (
    <div className="text-sm">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-1.5 text-gray-500 dark:text-zinc-400 hover:text-cyan-600 dark:hover:text-[#2DE2C1] transition-colors"
        >
          <MessageSquarePlus size={14} />
          Found a bug? Tell me
        </button>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 w-full max-w-sm p-3 rounded-lg border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900"
        >
          <label className="text-xs font-['Barlow_Condensed'] font-semibold tracking-[0.1em] uppercase text-gray-400 dark:text-zinc-500">
            What went wrong?
          </label>
          <textarea
            autoFocus
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            placeholder="e.g. Search doesn't return results for..."
            className="w-full resize-none rounded-md border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-2 text-sm outline-none focus:ring-2 focus:ring-cyan-500 dark:text-white"
          />
          <div className="flex items-center gap-2 justify-end">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-xs text-gray-500 dark:text-zinc-400 hover:text-gray-700 dark:hover:text-zinc-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!message.trim()}
              className="flex items-center gap-1.5 rounded-md bg-cyan-600 dark:bg-[#2DE2C1] text-white dark:text-black text-xs font-semibold px-3 py-1.5 disabled:opacity-40 hover:opacity-90 transition-opacity"
            >
              <Send size={12} />
              Send
            </button>
          </div>
          {sent && (
            <p className="text-xs text-cyan-600 dark:text-[#2DE2C1]">
              Opening your email client…
            </p>
          )}
        </form>
      )}
    </div>
  );
}