import React, { useState } from 'react';
import { Send, Image } from 'lucide-react';

interface MessageInputProps {
  onSendMessage?: (text: string) => void;
}

export default function MessageInput({ onSendMessage }: MessageInputProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    if (onSendMessage) onSendMessage(text);
    setText('');
  };

  return (
    <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        {/* Optional attachment button for media later */}
        <button 
          type="button" 
          className="p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
        >
          <Image size={20} />
        </button>

        <input 
          type="text" 
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 text-sm bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-700 transition"
        />
        
        <button 
          type="submit"
          disabled={!text.trim()}
          className="p-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 disabled:opacity-40 disabled:hover:bg-zinc-900 disabled:dark:hover:bg-zinc-100 transition-all shadow-sm"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}