import { Search, MoreVertical } from "lucide-react";
import MessageInput from "./messageInput";
import { ChatMessagesSkeleton } from "../skeleton/chatMessageSkeleton";
import { useChatStore } from "../store/useChatStore";
import { useEffect, useState, useRef } from "react"; 
import { GetConversation, SendMessage } from "../service/MessageService";
import { useParams } from "react-router-dom";

export default function ChatArea() {
    const messages = useChatStore((state) => state.messages);
    const setMessages = useChatStore((state) => state.setMessages);
    const [loadingMessages, setLoadingMessages] = useState(false);
    const { id } = useParams();
    const addMessage = useChatStore((state) => state.addMessage);
    const socket = useChatStore((state) => state.socket);
    const users = useChatStore((state) => state.users);

    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        async function fetchMessage(id: number) {
            try {
                setLoadingMessages(true);
                const data = await GetConversation(id);
                setMessages(data || []);
            } catch (err) {
                console.error("could not load messages: ", err);
                setMessages([]);
            } finally {
                setLoadingMessages(false);
            }
        }
        if (id) {
            fetchMessage(Number(id));
        }
    }, [id, setMessages]);

    useEffect(() => {
        if (!socket) return;

        const handler = (msg: any) => {
            addMessage(msg);
        };

        socket.on("newMessage", handler);
        
        return () => {
            socket.off("newMessage", handler);
        };
    }, [socket, addMessage]);
    
    const targetUser = users.find((u) => Number(u.id) === Number(id));
    const headerName = targetUser?.username || 'Chat';

    const handleSend = async (text: string, image?: File | null, voice?: File | null, video?: File | null) => {
        if (!id) return;
        try {
            // 🚀 Upgraded payload matching group routing scheme
            const response = await SendMessage(Number(id), text, image, voice, video);
            const newMessage = response?.data ? response.data : response;
            
            if (newMessage) {
                addMessage(newMessage); 
            }
        } catch (err) {
            console.error("Failed to route message transaction:", err);
        }
    };

    return (
        <div className="flex flex-col h-full bg-zinc-50 dark:bg-zinc-900/40">
            {/* Header Panel */}
            <header className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
                <div>
                    <h2 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                        {headerName}
                    </h2>
                    <p className="text-[11px] text-green-500 font-medium">online</p>
                </div>
                
                <div className="flex items-center gap-1">
                    <button type="button" className="p-2 text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 rounded-lg transition-colors">
                        <Search size={18} />
                    </button>
                    <button type="button" className="p-2 text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 rounded-lg transition-colors">
                        <MoreVertical size={18} />
                    </button>
                </div>
            </header>

            {/* Messages Thread Container */}
            <section className="flex-1 overflow-y-auto p-4 space-y-4">
                {loadingMessages ? (
                    <ChatMessagesSkeleton />
                ) : (
                    <div className="flex flex-col justify-end min-h-full space-y-3">
                        {messages.map((msg: any) => {
                            const messageSenderId = msg.sender_id ?? msg.senderId;
                            const isIncoming = String(messageSenderId) === String(id);

                            const BACKEND_URL = "http://localhost:8000";
                            
                            const buildSrc = (path: string | null) => {
                                if (!path) return null;
                                return encodeURI(path.startsWith("http") ? path : `${BACKEND_URL}${path}`);
                            };

                            // Multi-media structural definitions
                            const imageSource = buildSrc(msg.image ?? msg.image_url ?? msg.imageUrl);
                            const videoSource = buildSrc(msg.video ?? msg.video_url ?? msg.videoUrl);
                            const voiceSource = buildSrc(msg.voice ?? msg.voice_url ?? msg.voiceUrl ?? msg.audio ?? msg.audio_url);

                            return (
                                <div 
                                    key={msg.id || Math.random()} 
                                    className={`flex flex-col ${isIncoming ? "items-start" : "items-end"}`}
                                >
                                    <div className={`max-w-[70%] space-y-1.5 flex flex-col ${isIncoming ? "items-start" : "items-end"}`}>
                                        
                                        {/* Image Box */}
                                        {imageSource && (
                                            <div className="rounded-2xl overflow-hidden border border-zinc-200/20 shadow-sm bg-zinc-950">
                                                <img 
                                                    src={imageSource} 
                                                    alt="Attachment" 
                                                    className="max-w-full h-auto max-h-60 object-cover"
                                                    loading="lazy"
                                                />
                                            </div>
                                        )}

                                        {/* Video Box */}
                                        {videoSource && (
                                            <div className="rounded-2xl overflow-hidden border border-zinc-200/20 shadow-sm bg-zinc-950 p-0.5">
                                                <video 
                                                    key={videoSource}
                                                    src={videoSource} 
                                                    controls 
                                                    className="max-w-full max-h-60 rounded-xl bg-black"
                                                />
                                            </div>
                                        )}

                                        {/* Isolated Clean Voice Note Box */}
                                        {voiceSource && (
                                            <div 
                                                key={voiceSource}
                                                className={`px-3 py-2 rounded-2xl shadow-sm border flex items-center min-w-[260px] ${
                                                    isIncoming
                                                        ? "rounded-tl-none bg-white dark:bg-zinc-800 border-zinc-100 dark:border-zinc-700/50"
                                                        : "rounded-tr-none bg-zinc-900 dark:bg-zinc-800 border-zinc-800 dark:border-zinc-700"
                                                }`}
                                            >
                                                <audio 
                                                    src={voiceSource} 
                                                    controls 
                                                    className={`w-full h-8 scale-95 origin-left ${
                                                        !isIncoming 
                                                            ? "invert dark:invert-0 brightness-90 contrast-125" 
                                                            : "dark:brightness-90"
                                                    }`} 
                                                />
                                            </div>
                                        )}

                                        {/* Text Node Bubble */}
                                        {msg.text && (
                                            <div 
                                                className={`px-4 py-2.5 text-sm shadow-sm transition-all ${
                                                    isIncoming
                                                        ? "rounded-2xl rounded-tl-none bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-100 dark:border-zinc-700/50"
                                                        : "rounded-2xl rounded-tr-none bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900"
                                                }`}
                                            >
                                                <p className="whitespace-pre-wrap break-words">{msg.text}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}

                        <div ref={messagesEndRef} />
                    </div>
                )}
            </section>

            {/* Message Input Bottom Frame */}
            <MessageInput onSendMessage={handleSend} />
        </div>
    );
}