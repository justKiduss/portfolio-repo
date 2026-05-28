import { create } from "zustand";

export interface Group {
    id: number;
    group_name: string;
    group_admin: number;
    created_at?: string;
}

export interface GroupMember {
    id: number;
    group_id: number;
    user_id: number;
    username: string;
    joined_at: string;
}

export interface GroupMessage {
    id: number;
    group_id: number;
    sender_id: number;
    text: string;
    username: string; // From the join query
    created_at: string;
}

interface GroupState {
    groups: Group[];
    currentGroup: Group | null;
    groupMembers: GroupMember[];
    groupMessages: GroupMessage[];
    
    // Actions
    setGroups: (groups: Group[]) => void;
    setCurrentGroup: (group: Group | null) => void;
    setGroupMembers: (members: GroupMember[]) => void;
    setGroupMessages: (messages: GroupMessage[]) => void;
    addGroupMessage: (msg: GroupMessage) => void;
    
    // Group Socket Event Listeners
    // joinGroupRoom: (groupId: number) => void;
    // leaveGroupRoom: (groupId: number) => void;
    // listenToGroupMessages: () => void;
    // stopListeningToGroupMessages: () => void;
}

export const useGroupStore = create<GroupState>((set, get) => ({
    groups: [],
    currentGroup: null,
    groupMembers: [],
    groupMessages: [],

    setGroups: (groups) => set({ groups }),
    setCurrentGroup: (currentGroup) => set({ currentGroup }),
    setGroupMembers: (groupMembers) => set({ groupMembers }),
    setGroupMessages: (groupMessages) => set({ groupMessages }),
    
    addGroupMessage: (msg) => set((state) => ({
        groupMessages: [...state.groupMessages, msg]
    })),

    // ==========================================
    // Socket Actions (Reuses socket from useChatStore)
    // ==========================================
    // joinGroupRoom: (groupId) => {
    //     const socket = useChatStore.getState().socket;
    //     if (socket) {
    //         socket.emit("joinGroup", { groupId });
    //     }
    // },

    // leaveGroupRoom: (groupId) => {
    //     const socket = useChatStore.getState().socket;
    //     if (socket) {
    //         socket.emit("leaveGroup", { groupId });
    //     }
    // },

    // listenToGroupMessages: () => {
    //     const socket = useChatStore.getState().socket;
    //     if (!socket) return;

    //     // Prevent duplicate listeners
    //     socket.off("newGroupMessage");

    //     socket.on("newGroupMessage", (message: GroupMessage) => {
    //         // Only push the message if it belongs to the active group screen
    //         const activeGroup = get().currentGroup;
    //         if (activeGroup && activeGroup.id === message.group_id) {
    //             get().addGroupMessage(message);
    //         }
    //     });
    // },

    // stopListeningToGroupMessages: () => {
    //     const socket = useChatStore.getState().socket;
    //     if (socket) {
    //         socket.off("newGroupMessage");
    //     }
    // }
}));