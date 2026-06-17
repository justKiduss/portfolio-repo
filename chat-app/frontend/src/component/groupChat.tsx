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
    },[id,groups,setCurrentGroup,joinGroupRoom,leaveGroupRoom,stopListeningToGroupMessages,listenToGroupMessages]);

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
                    {/* Replace your current groupMessages.map section with this refined UI block */}
                    {groupMessages.map((msg: any) => {
                        const messageSenderId = msg.sender_id ?? msg.senderId;
                        const isIncoming = String(messageSenderId) !== String(user?.id);

                        const BACKEND_URL = "http://localhost:8000";
                        
                        const buildSrc = (path: string | null) => {
                            if (!path) return null;
                            return encodeURI(path.startsWith("http") ? path : `${BACKEND_URL}${path}`);
                        };

                        const imageSource = buildSrc(msg.image ?? msg.image_url ?? msg.imageUrl);
                        const videoSource = buildSrc(msg.video ?? msg.video_url ?? msg.videoUrl);
                        const voiceSource = buildSrc(msg.voice ?? msg.voice_url ?? msg.voiceUrl ?? msg.audio ?? msg.audio_url);
                        console.log("group message",groupMessages);
                        return (
                            <div 
                                key={msg.id || Math.random()} 
                                className={`flex items-end gap-2 ${isIncoming ? "flex-row" : "flex-row-reverse"}`}
                            >
                                {/* Group Sender Name */}
                                {isIncoming && msg.username && (
                                    <img src={msg.profile_pic} alt={msg.username} className="w-10 rounded-3xl"/>
                                )}

                                {/* Media & Text Flow Container */}
                                <div className={`max-w-[70%] space-y-1.5 flex flex-col ${isIncoming ? "items-start" : "items-end"}`}>
                                    
                                    {/* Image Component */}
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

                                    {/* Video Component */}
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

                                    {/* Modernized Audio Voice Note Layout */}
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

                                    {/* Text Node Box (Only renders if text actually exists) */}
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