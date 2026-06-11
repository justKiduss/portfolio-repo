import { Search, MoreVertical } from "lucide-react";
import MessageInput from "./messageInput";
import { useEffect, useState, useRef } from "react"; 
import { useParams, useNavigate } from "react-router-dom";
import { useGroupStore } from "../store/useGroupStore";
import { allMessage, sendMessage } from "../service/groupMessage_Service";
import { checkGroupAdmin, deleteGroup } from "../service/groupService";
import { GroupChatMessagesSkeleton } from "../skeleton/groupMessageSkeleton";
import { useChatStore } from "../store/useChatStore";

export default function GroupChat() {
    const [loadingMessages, setLoadingMessages] = useState(false);
    const { id } = useParams(); 
    const  {user} =useChatStore();

    const setCurrentGroup=useGroupStore((state)=>state.setCurrentGroup);
    const groupMessages = useGroupStore((state) => state.groupMessages);
    const setGroupMessages = useGroupStore((state) => state.setGroupMessages);
    const addGroupMessage = useGroupStore((state) => state.addGroupMessage);
    const groups = useGroupStore((state) => state.groups);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const joinGroupRoom = useGroupStore((state) => state.joinGroupRoom);
    const leaveGroupRoom = useGroupStore((state) => state.leaveGroupRoom);
    const listenToGroupMessages = useGroupStore((state) => state.listenToGroupMessages);
    const stopListeningToGroupMessages = useGroupStore((state) => state.stopListeningToGroupMessages);

    const [isAdmin, setIsAdmin] = useState(false);
    const [More, setMore] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        if(!id) return;

        const groupIdNum=Number(id);
        joinGroupRoom(groupIdNum);
        const group=groups.find((g)=>Number(g.group_id)===Number(id));

        if(group){
            setCurrentGroup(group);
        }
        listenToGroupMessages();

        return ()=>{
            leaveGroupRoom(groupIdNum);
            stopListeningToGroupMessages();
        }
    },[id,setCurrentGroup,joinGroupRoom,leaveGroupRoom,stopListeningToGroupMessages,listenToGroupMessages]);

    const handleDeleteGroup = async () => {
        if (!id) return;
        const confirmDelete = window.confirm("Are you sure you want to delete this group?");
        if (!confirmDelete) return;

        try {
            await deleteGroup(Number(id)); 
            navigate("/dashboard/group_chats"); 
        } catch (err) {
            console.error("Failed to delete the target group database layout:", err);
            alert("Could not delete this group. Please try again.");
        }
    };

    useEffect(() => {
        async function fetchAdminStatus() {
            if (!id) return;
            try {
                setIsAdmin(false);
                setMore(false); 
                const adminStatus = await checkGroupAdmin(Number(id));
                setIsAdmin(adminStatus);
            } catch (err) {
                console.error("Role authorization failed:", err);
                setIsAdmin(false);
            }
        }
        fetchAdminStatus();
    }, [id]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [groupMessages]);

    useEffect(() => {
        async function fetchMessage(groupId: number) {
            try {
                setLoadingMessages(true);
                const data = await allMessage(groupId);
                setGroupMessages(data || []);
            } catch (err) {
                console.error("could not load messages: ", err);
                setGroupMessages([]);
            } finally {
                setLoadingMessages(false);
            }
        }
        if (id) {
            fetchMessage(Number(id));
        }
    }, [id, setGroupMessages]);

    const targetGroup = groups.find((u) => Number(u.group_id) === Number(id));
    const headerName = targetGroup?.group_name || 'Chat';

    const handleSend = async (text: string, image?: File | null, voice?: File | null, video?: File | null) => {
        if (!id) return;

        console.log("=== UI EMISSION DEBUG ===");
        console.log("text value:", text);
        console.log("image instance:", image);
        try {
            const newMessage = await sendMessage(Number(id), text, image, voice, video);
            if (newMessage) {
                addGroupMessage(newMessage); 
            }
        } catch (err) {
            console.error("Failed to route message transaction:", err);
        }
    };

    return (
        <div className="flex flex-col h-full bg-zinc-50 dark:bg-zinc-900/40 relative">
            {/* Header Panel */}
            <header className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shrink-0">
                <div>
                    <h2 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                        {headerName}
                    </h2>
                    <p className="text-[11px] text-green-500 font-medium">online</p>
                </div>
                
                <div className="relative">
                    <div className="flex items-center gap-1">
                        <button type="button" className="p-2 text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 rounded-lg transition-colors">
                            <Search size={18} />
                        </button>
                        <button type="button" className="p-2 text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 rounded-lg transition-colors"
                            onClick={() => setMore(!More)}>
                            <MoreVertical size={18} />
                        </button>
                    </div>

                    {More && isAdmin && (
                        <div className="absolute right-0 top-11 w-44 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-lg py-1 z-50">
                            <button 
                                className="w-full px-3 py-2 text-left text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                                onClick={() => {
                                    setMore(false);
                                    navigate(`add-member`);
                                }}
                            >
                                Add members
                            </button>
                            <hr className="border-zinc-100 dark:border-zinc-800" />
                            <button 
                                className="w-full px-3 py-2 text-left text-xs font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                                onClick={handleDeleteGroup}
                            >
                                Delete this group
                            </button>
                        </div>
                    )}
                </div>
            </header>

            {/* Messages Thread Container */}
            <section className="flex-1 overflow-y-auto p-4 space-y-4">
                {loadingMessages ? (
                    <GroupChatMessagesSkeleton/>
                ) : (
                    <div className="flex flex-col justify-end min-h-full space-y-3">
                        {groupMessages.map((msg: any) => {
                            const messageSenderId = msg.sender_id ?? msg.senderId;
                            
                            // 🚀 Fix 3: Incoming means the sender ID is NOT my authenticated user ID!
                            const isIncoming = String(messageSenderId) !== String(user?.id);

                            const BACKEND_URL = "http://localhost:8000";
                            const rawPath = msg.image;
                            const imageSource = rawPath 
                                ? encodeURI(rawPath.startsWith("http") ? rawPath : `${BACKEND_URL}${rawPath}`)
                                : null;

                            return (
                                <div 
                                    key={msg.id} 
                                    className={`flex flex-col ${isIncoming ? "items-start" : "items-end"}`}
                                >
                                    {/* Optional Group Context: Show sender names above incoming text */}
                                    {isIncoming && msg.username && (
                                        <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 mb-0.5 px-1">
                                            {msg.username}
                                        </span>
                                    )}

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
                                            />
                                        )}
                                        {msg.text &&(
                                            <p className="whitespace-pre-wrap break-words">{msg.text}</p>
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