import { create } from "zustand";
import { io, Socket } from "socket.io-client";

interface User {
    id: number;
    username: string;
    email: string;
    profile_pic?: string;
}

interface Message {
    id: number;
    sender_id: number;
    text: string;
    createdAt?: string;
}

interface OnlineUser {
    userId: number;
    username: string;
}

interface ChatState {
    socket: Socket | null;
    onlineUsers: OnlineUser[]; // 👈 Changed from number[] to OnlineUser[]

    connectSocket: (userProfile: User) => void; // 👈 Expects user profile object now
    disconnectSocket: () => void;
    setOnlineUsers: (users: OnlineUser[]) => void;

    // auth state data
    user: User | null;
    isLoading: boolean;
    setUser: (user: User | null) => void;
    setIsLoading: (loading: boolean) => void;
    
    // chat state data
    users: User[];
    messages: Message[];
    setUsers: (users: User[]) => void;
    setMessages: (messages: Message[]) => void;
    addMessage: (msg: Message) => void;
}

export const useChatStore = create<ChatState>((set) => ({
    // auth initial values
    user: null,
    isLoading: true,
    setUser: (user) => set({ user }),
    setIsLoading: (isLoading) => set({ isLoading }),

    // chat initial values
    users: [],
    messages: [],
    setMessages: (messages) => set({ messages }),
    setUsers: (users) => set({ users }),

    addMessage: (msg) => set((state) => {
        // Standardize matching using String() transformations
        const exists = state.messages.some(m => String(m.id) === String(msg.id));
        if (exists) return state;
        return { messages: [...state.messages, msg] };
    }),
    
    socket: null,
    onlineUsers: [], // Tracks [{ userId: 3, username: "kaleab" }]
    setOnlineUsers: (onlineUsers) => set({ onlineUsers }),

    connectSocket: (userProfile) => set((state) => {
        
        if (state.socket?.connected) return state;

        // 2. Pass both matching variables down the handshake stream
        const socket =io(import.meta.env.DEV?`${import.meta.env.VITE_API_BASE}`
            :`${import.meta.env.VITE_SOCKET_URL}`, {
            query: { 
                userId: userProfile.id,
                username: userProfile.username // 👈 Extracted safely here
            },
            withCredentials: true
        });

        // 3. Receives the complete object array from backend emission
        socket.on("onlineUsers", (users: OnlineUser[]) => {
            console.log("onlineUsers received:", users);
            set({ onlineUsers: users });
        });
        
        return { socket };
    }),

    disconnectSocket: () => set((state) => {
        state.socket?.disconnect();
        return { socket: null };
    }),
}));

