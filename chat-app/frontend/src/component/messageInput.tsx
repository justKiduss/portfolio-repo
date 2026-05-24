import React, { useState, useEffect } from 'react';
import { Send, Image } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (text: string, image?: File | null) => void;
}

export default function MessageInput({ onSendMessage }: MessageInputProps) {
  const [text, setText] = useState('');
  const [image, setImage] = useState<File | null>(null);

  // 1. Compute the preview URL directly during render. No extra state needed!
  const previewUrl = image ? URL.createObjectURL(image) : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() && !image) return;

    onSendMessage(text, image);
    setText('');
    setImage(null);
  };
  
  // 2. This clean effect handles ONLY the memory management cleanup
  useEffect(() => {
    if (!previewUrl) return;

    // When the image changes or the component unmounts, release the object URL
    return () => URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  return (
    <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
      {previewUrl && (
        <div className="relative mb-2 inline-block">
          <img
            src={previewUrl}
            className="max-h-40 rounded-lg object-cover"
            alt="Upload preview"
          />
          <button
            type="button"
            onClick={() => setImage(null)}
            className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow-md transition-colors"
          >
            ×
          </button>
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <label 
          htmlFor="chat-image-input" 
          className="p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors cursor-pointer rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900"
        >
          <Image size={20} />
        </label>
        
        <input
          id="chat-image-input"
          type="file"
          accept="image/*" 
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setImage(file);
            }
            e.target.value = ''; 
          }}
        />

        <input 
          type="text" 
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 text-sm bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-700 transition"
        />
        
        <button 
          type="submit"
          disabled={!text.trim() && !image}
          className="p-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 disabled:opacity-40 disabled:hover:bg-zinc-900 disabled:dark:hover:bg-zinc-100 transition-all shadow-sm"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}