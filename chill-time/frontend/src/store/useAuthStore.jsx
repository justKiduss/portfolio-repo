import {create} from "zustand";

export const useAuthStore=create((set)=>({
    user:null,
    isLoading:true,
    setUser:(user)=>set({user}),
    setIsLoading:(isLoading)=>set({isLoading}),
}))