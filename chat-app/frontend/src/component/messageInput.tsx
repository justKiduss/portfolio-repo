import React, { useState, useEffect } from 'react';
import { Send, Image, Mic, Video, X } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (text: string, image?: File | null, voice?: File | null, video?: File | null) => void;
}

export default function MessageInput({ onSendMessage }: MessageInputProps) {
  const [text, setText] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [voice, setVoice] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);

  // Preview URLs
  const imagePreview = image ? URL.createObjectURL(image) : null;
  const voicePreview = voice ? voice.name : null; // Just show name for audio
  const videoPreview = video ? URL.createObjectURL(video) : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() && !image && !voice && !video) return;

    onSendMessage(text, image, voice, video);
    
    // Reset state
    setText('');
    setImage(null);
    setVoice(null);
    setVideo(null);
  };

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
      if (videoPreview) URL.revokeObjectURL(videoPreview);
    };
  }, [imagePreview, videoPreview]);

  return (
    <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
      {/* Previews */}
      <div className="flex gap-2 mb-2">
        {imagePreview && (
          <div className="relative">
            <img src={imagePreview} className="h-20 w-20 rounded-lg object-cover" alt="Preview" />
            <button onClick={() => setImage(null)} className="absolute -top-1 -right-1 bg-red-500 rounded-full p-0.5 text-white"><X size={12}/></button>
          </div>
        )}
        {videoPreview && (
          <div className="relative">
            <video src={videoPreview} className="h-20 w-20 rounded-lg bg-zinc-800" />
            <button onClick={() => setVideo(null)} className="absolute -top-1 -right-1 bg-red-500 rounded-full p-0.5 text-white"><X size={12}/></button>
          </div>
        )}
        {voicePreview && (
          <div className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-lg text-xs flex items-center gap-2">
            <Mic size={14} /> {voicePreview}
            <button onClick={() => setVoice(null)} className="text-red-500"><X size={12}/></button>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        {/* File Inputs */}
        <input id="img" type="file" accept="image/*" className="hidden" onChange={(e) => setImage(e.target.files?.[0] || null)} />
        <input id="mic" type="file" accept="audio/*" className="hidden" onChange={(e) => setVoice(e.target.files?.[0] || null)} />
        <input id="vid" type="file" accept="video/*" className="hidden" onChange={(e) => setVideo(e.target.files?.[0] || null)} />

        <label htmlFor="img" className="p-2 cursor-pointer hover:bg-zinc-100 rounded-lg"><Image size={20} /></label>
        <label htmlFor="mic" className="p-2 cursor-pointer hover:bg-zinc-100 rounded-lg"><Mic size={20} /></label>
        <label htmlFor="vid" className="p-2 cursor-pointer hover:bg-zinc-100 rounded-lg"><Video size={20} /></label>

        <input 
          type="text" 
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 rounded-lg focus:outline-none"
        />
        
        <button 
          type="submit"
          disabled={!text.trim() && !image && !voice && !video}
          className="p-2 bg-zinc-900 text-white rounded-lg disabled:opacity-40"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}