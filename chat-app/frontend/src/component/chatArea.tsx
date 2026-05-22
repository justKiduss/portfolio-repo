import { Search, MoreVertical } from "lucide-react";
import MessageInput from "./messageInput";
import { ChatMessagesSkeleton } from "../skeleton/chatMessageSkeleton";
import { useChatStore } from "../store/useChatStore";
import { useEffect,useState } from "react";
import { GetConversation } from "../service/MessageService";
import { useParams } from "react-router-dom";

interface ChatAreaProps {
  chatPartnerName?: string;
  isLoading?: boolean;
}

export default function ChatArea({ chatPartnerName = "Kidus", isLoading = false }: ChatAreaProps) {
    const messages=useChatStore((state)=>state.messages);
    const setMessages=useChatStore((state)=>state.setMessages);
    const addMessage=useChatStore((state)=>state.addMessage);
    const [loadingMessages,setLoadingMessages]=useState(false);
    const {id}=useParams();
    useEffect(()=>{
        async function fetchMessage(id:number){
            try{
                setLoadingMessages(true);
                const data=await GetConversation(id);
                setMessages(data||[]);
            }catch(err){
                console.error("could not load messages: ",err);
                setMessages([]);
            }finally{
                setLoadingMessages(false);
            }
        }
        fetchMessage();
    },[setMessages]);

    const handleSend = (text: string) => {
    console.log("Sending message to backend model:", text);
  };

  return (
    <div className="flex flex-col h-full bg-zinc-50 dark:bg-zinc-900/40">
      {/* Header Panel */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <div>
          <h2 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
            {chatPartnerName}
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
        {isLoading ? (
          <ChatMessagesSkeleton />
        ) : (
          <div className="flex flex-col justify-end min-h-full space-y-3">
            {/* Incoming message template */}
            <div className="flex justify-start">
              <div className="max-w-[70%] px-4 py-2.5 rounded-2xl rounded-tl-none bg-white dark:bg-zinc-800 text-sm text-zinc-800 dark:text-zinc-200 shadow-sm border border-zinc-100 dark:border-zinc-700/50">
                Hey! Did you check out the database schema?
              </div>
            </div>

            {/* Outgoing message template */}
            <div className="flex justify-end">
              <div className="max-w-[70%] px-4 py-2.5 rounded-2xl rounded-tr-none bg-zinc-900 dark:bg-zinc-100 text-sm text-white dark:text-zinc-900 shadow-sm">
                Yeah, looks tight. Adding the query join filters now.
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Message Input Bottom Frame */}
      <MessageInput onSendMessage={handleSend} />
    </div>
  );
}