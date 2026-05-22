import {create} from "zustand";
import {io,Socket} from "socket.io-client";

interface User{
    id:number,
    username:string
    email:string
}
interface Message{
    id:number
    sender_id:number
    text:string
    createdAt?:string
}

interface ChatState{
    socket: Socket | null;
    connectSocket: (userId: number) => void;
    disconnectSocket: () => void;

    //auth state data
    user:User | null;
    isLoading:boolean;
    setUser:(user:User | null)=>void;
    setIsLoading:(loading:boolean)=>void;
    
    //chat state data
    users:User[];
    messages:Message[];
    setUsers:(users:User[])=>void;
    setMessages:(messages:Message[])=>void;
    addMessage:(msg:Message)=>void;
}
export const useChatStore=create<ChatState>((set)=>({
    //auth initial values
    
    user:null,
    isLoading:true,
    setUser:(user)=>set({user}),
    setIsLoading:(isLoading)=>set({isLoading}),

    // chat initial values
    users:[],
    messages:[],
    setMessages:(messages)=>set({messages}),
    setUsers:(users)=>set({users}),
    addMessage:(msg)=>set((state)=>({
        messages:[...state.messages,msg]
    })),
    
    //socket

    socket: null,

    connectSocket: (userId) => set((state) => {
        if (state.socket?.connected) return state;
        const socket = io("http://localhost:8000", {
            query: { userId },
            withCredentials: true
        });
        return { socket };
        }),
    disconnectSocket: () => set((state) => {
        state.socket?.disconnect();
        return { socket: null };
    }),
}))