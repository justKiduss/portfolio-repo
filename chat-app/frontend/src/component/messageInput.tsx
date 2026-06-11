// import React, { useState, useEffect } from 'react';
// import { Send, Image, Mic, Video, X } from 'lucide-react';

// interface MessageInputProps {
//   onSendMessage: (text: string, image?: File | null, voice?: File | null, video?: File | null) => void;
// }

// export default function MessageInput({ onSendMessage }: MessageInputProps) {
//   const [text, setText] = useState('');
//   const [image, setImage] = useState<File | null>(null);
//   const [voice, setVoice] = useState<File | null>(null);
//   const [video, setVideo] = useState<File | null>(null);

//   // Preview URLs
//   const imagePreview = image ? URL.createObjectURL(image) : null;
//   const voicePreview = voice ? voice.name : null; // Just show name for audio
//   const videoPreview = video ? URL.createObjectURL(video) : null;

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!text.trim() && !image && !voice && !video) return;

//     onSendMessage(text, image, voice, video);
    
//     // Reset state
//     setText('');
//     setImage(null);
//     setVoice(null);
//     setVideo(null);
//   };

//   useEffect(() => {
//     return () => {
//       if (imagePreview) URL.revokeObjectURL(imagePreview);
//       if (videoPreview) URL.revokeObjectURL(videoPreview);
//     };
//   }, [imagePreview, videoPreview]);

//   return (
//     <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
//       {/* Previews */}
//       <div className="flex gap-2 mb-2">
//         {imagePreview && (
//           <div className="relative">
//             <img src={imagePreview} className="h-20 w-20 rounded-lg object-cover" alt="Preview" />
//             <button onClick={() => setImage(null)} className="absolute -top-1 -right-1 bg-red-500 rounded-full p-0.5 text-white"><X size={12}/></button>
//           </div>
//         )}
//         {videoPreview && (
//           <div className="relative">
//             <video src={videoPreview} className="h-20 w-20 rounded-lg bg-zinc-800" />
//             <button onClick={() => setVideo(null)} className="absolute -top-1 -right-1 bg-red-500 rounded-full p-0.5 text-white"><X size={12}/></button>
//           </div>
//         )}
//         {voicePreview && (
//           <div className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-lg text-xs flex items-center gap-2">
//             <Mic size={14} /> {voicePreview}
//             <button onClick={() => setVoice(null)} className="text-red-500"><X size={12}/></button>
//           </div>
//         )}
//       </div>

//       <form onSubmit={handleSubmit} className="flex items-center gap-2">
//         {/* File Inputs */}
//         <input id="img" type="file" accept="image/*" className="hidden" onChange={(e) => setImage(e.target.files?.[0] || null)} />
//         <input id="mic" type="file" accept="audio/*" className="hidden" onChange={(e) => setVoice(e.target.files?.[0] || null)} />
//         <input id="vid" type="file" accept="video/*" className="hidden" onChange={(e) => setVideo(e.target.files?.[0] || null)} />

//         <label htmlFor="img" className="p-2 cursor-pointer hover:bg-zinc-100 rounded-lg"><Image size={20} /></label>
//         <label htmlFor="mic" className="p-2 cursor-pointer hover:bg-zinc-100 rounded-lg"><Mic size={20} /></label>
//         <label htmlFor="vid" className="p-2 cursor-pointer hover:bg-zinc-100 rounded-lg"><Video size={20} /></label>

//         <input 
//           type="text" 
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           placeholder="Type a message..."
//           className="flex-1 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 rounded-lg focus:outline-none"
//         />
        
//         <button 
//           type="submit"
//           disabled={!text.trim() && !image && !voice && !video}
//           className="p-2 bg-zinc-900 text-white rounded-lg disabled:opacity-40"
//         >
//           <Send size={16} />
//         </button>
//       </form>
//     </div>
//   );
// }


import React, { useState, useEffect, useRef } from 'react';
import { Send, Image, Mic, Video, X, Square } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (text: string, image?: File | null, voice?: File | null, video?: File | null) => void;
}

export default function MessageInput({ onSendMessage }: MessageInputProps) {
  const [text, setText] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [voice, setVoice] = useState<File | null>(null);

  // Voice recording engine internal references
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Generated memory pointers for UI view blocks
  const imagePreview = image ? URL.createObjectURL(image) : null;
  const videoPreview = video ? URL.createObjectURL(video) : null;
  const voicePreview = voice ? URL.createObjectURL(voice) : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() && !image && !voice && !video) return;

    onSendMessage(text, image, voice, video);
    
    // Clean fields
    setText('');
    setImage(null);
    setVideo(null);
    setVoice(null);
  };

  // Garbage collection monitoring
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
      if (videoPreview) URL.revokeObjectURL(videoPreview);
      if (voicePreview) URL.revokeObjectURL(voicePreview);
    };
  }, [imagePreview, videoPreview, voicePreview]);

  // Audio Capture Process
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const recordedFile = new File([audioBlob], `voice-note-${Date.now()}.webm`, { type: 'audio/webm' });
        setVoice(recordedFile);
        
        // Stop all track processes to turn off hardware microphone active lights
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Microphone hardware connection denied:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
      {/* Dynamic Render Previews */}
      <div className="flex flex-wrap gap-3 mb-2">
        {imagePreview && (
          <div className="relative">
            <img src={imagePreview} className="h-20 w-20 rounded-lg object-cover shadow border border-zinc-100 dark:border-zinc-800" alt="Preview" />
            <button type="button" onClick={() => setImage(null)} className="absolute -top-1.5 -right-1.5 bg-red-500 rounded-full p-0.5 text-white shadow"><X size={12}/></button>
          </div>
        )}
        {videoPreview && (
          <div className="relative">
            <video src={videoPreview} className="h-20 w-20 rounded-lg bg-zinc-900 object-cover" />
            <button type="button" onClick={() => setVideo(null)} className="absolute -top-1.5 -right-1.5 bg-red-500 rounded-full p-0.5 text-white shadow"><X size={12}/></button>
          </div>
        )}
        {voicePreview && (
          <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-2 rounded-xl flex items-center gap-2">
            <audio src={voicePreview} controls className="h-8 max-w-xs scale-90" />
            <button type="button" onClick={() => setVoice(null)} className="text-zinc-400 hover:text-red-500 transition-colors"><X size={14}/></button>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input id="group-img-in" type="file" accept="image/*" className="hidden" onChange={(e) => setImage(e.target.files?.[0] || null)} />
        <input id="group-vid-in" type="file" accept="video/*" className="hidden" onChange={(e) => setVideo(e.target.files?.[0] || null)} />

        <label htmlFor="group-img-in" className="p-2 cursor-pointer text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg transition-colors"><Image size={19} /></label>
        <label htmlFor="group-vid-in" className="p-2 cursor-pointer text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg transition-colors"><Video size={19} /></label>
        
        {/* Voice Note Button Engine */}
        {isRecording ? (
          <button 
            type="button" 
            onClick={stopRecording} 
            className="p-2 text-red-500 bg-red-50 dark:bg-red-950/30 animate-pulse rounded-lg transition-all"
          >
            <Square size={19} />
          </button>
        ) : (
          <button 
            type="button" 
            onClick={startRecording} 
            className="p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg transition-colors"
          >
            <Mic size={19} />
          </button>
        )}

        <input 
          type="text" 
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isRecording}
          placeholder={isRecording ? "Recording audio message..." : "Type a message..."}
          className="flex-1 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 rounded-xl focus:outline-none placeholder-zinc-400 text-sm transition-all"
        />
        
        <button 
          type="submit"
          disabled={(!text.trim() && !image && !voice && !video) || isRecording}
          className="p-2 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 rounded-xl disabled:opacity-30 transition-all"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}