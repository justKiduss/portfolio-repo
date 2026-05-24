import { Search, MoreVertical } from "lucide-react";
import MessageInput from "./messageInput";
import { ChatMessagesSkeleton } from "../skeleton/chatMessageSkeleton";
import { useChatStore } from "../store/useChatStore";
// 1. Added useRef here
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

    // 2. Created the scroll reference anchor hook
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    // 3. Effect to seamlessly slide down whenever a new item is appended to messages
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

        socket.on("newMessage", (msg) => {
            addMessage(msg);
        });
        return () => {
            socket.off("newMessage");
        };
    }, [socket, addMessage]);
    
    const targetUser = users.find((u) => Number(u.id) === Number(id));
    const headerName = targetUser?.username || 'Chat';

    const handleSend = async (text: string, image?: File | null) => {
        if (!id) return;
        try {
            const newMessage = await SendMessage(Number(id), text, image);
            
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
                            const rawPath = msg.image;

                            const imageSource = rawPath 
                                ? encodeURI(rawPath.startsWith("http") ? rawPath : `${BACKEND_URL}${rawPath}`)
                                : null;

                            return (
                                <div 
                                    key={msg.id} 
                                    className={`flex ${isIncoming ? "justify-start" : "justify-end"}`}
                                >
                                    <div 
                                        className={`max-w-[70%] px-4 py-2.5 text-sm shadow-sm transition-all ${
                                            isIncoming
                                                ? "rounded-2xl rounded-tl-none bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-100 dark:border-zinc-700/50"
                                                : "rounded-2xl rounded-tr-none bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900"
                                        }`}
                                    >
                                        {imageSource && (
                                            <img 
                                                src={imageSource} 
                                                alt="Chat attachment" 
                                                className="max-w-full h-auto max-h-60 rounded-lg object-cover mb-1 border border-zinc-200/20"
                                                loading="lazy"
                                                onError={(e) => {
                                                    console.error("Image failed to render from target source:", imageSource);
                                                }}
                                            />
                                        )}
                                        {msg.text}
                                    </div>
                                </div>
                            );
                        })}

                        {/* 4. Scroll Anchor Point — pushes the window viewport context here */}
                        <div ref={messagesEndRef} />
                    </div>
                )}
            </section>

            {/* Message Input Bottom Frame */}
            <MessageInput onSendMessage={handleSend} />
        </div>
    );
}