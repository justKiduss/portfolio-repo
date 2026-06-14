import { create } from "zustand";
import { useChatStore } from "./useChatStore";
export interface Group {
    group_id: number;
    group_name: string;
    group_admin: number;
    group_profile_pic:string;
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
    // group state

    groups: Group[];
    isLoading:boolean;
    currentGroup: Group | null;
    groupMembers: GroupMember[];
    groupMessages: GroupMessage[];
    
    setIsLoading:(loading:boolean)=>void;
    setGroups: (groups: Group[]) => void;
    setCurrentGroup: (group: Group | null) => void;
    setGroupMembers: (members: GroupMember[]) => void;
    setGroupMessages: (messages: GroupMessage[]) => void;
    addGroupMessage: (msg: GroupMessage) => void;
    
    joinGroupRoom: (groupId: number) => void;
    leaveGroupRoom: (groupId: number) => void;
    listenToGroupMessages: () => void;
    stopListeningToGroupMessages: () => void;
}

export const useGroupStore = create<GroupState>((set,get) => ({
    groups: [],
    currentGroup: null,
    groupMembers: [],
    groupMessages: [],
    isLoading:true,

    setIsLoading:(isLoading)=>set({isLoading}),
    setGroups: (groups) => set({ groups }),
    setCurrentGroup: (currentGroup) => set({ currentGroup }),
    setGroupMembers: (groupMembers) => set({ groupMembers }),
    setGroupMessages: (groupMessages) => set({ groupMessages }),
    
    addGroupMessage: (msg) => set((state) => ({
        groupMessages: [...state.groupMessages, msg]
    })),


    joinGroupRoom: (groupId) => {
        const socket = useChatStore.getState().socket;
        if (socket) {
            socket.emit("joinGroup", { groupId });
        }
    },

    leaveGroupRoom: (groupId) => {
        const socket = useChatStore.getState().socket;
        if (socket) {
            socket.emit("leaveGroup", { groupId });
        }
    },

    listenToGroupMessages: () => {
        const socket = useChatStore.getState().socket;
        if (!socket) return;

        socket.off("newGroupMessage");
        socket.off("updateGroupMessage");
        socket.off("deleteGroupMessage");

        socket.on("newGroupMessage", (message: GroupMessage) => {
            // Only push the message if it belongs to the active group screen
            const activeGroup = get().currentGroup;
            if (activeGroup && Number(activeGroup.group_id) === Number(message.group_id)) {
                get().addGroupMessage(message);
            }
        });
        // Add these right below your socket.on("newGroupMessage", ...) block:

        socket.on("updateGroupMessage", (updatedMessage: GroupMessage) => {
            set((state) => ({
                groupMessages: state.groupMessages.map((msg) =>
                    msg.id === updatedMessage.id ? updatedMessage : msg
                )
            }));
        });

        socket.on("deleteGroupMessage", ({ messageId }: { messageId: number }) => {
            set((state) => ({
                groupMessages: state.groupMessages.filter((msg) => msg.id !== messageId)
            }));
        });
    },

    stopListeningToGroupMessages: () => {
        const socket = useChatStore.getState().socket;
        if (socket) {
            socket.off("newGroupMessage");
            socket.off("updateGroupmessage");
            socket.off("deleteGroupmessage");
        }
    }
}));