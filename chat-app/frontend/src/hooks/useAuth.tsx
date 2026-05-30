// import { getUserInteraction } from "../service/MessageService";
import { signUp,loginApi, logOut, checkAuth} from "../service/UserService";
import { useChatStore } from "../store/useChatStore";
export default function useAuth(){
    const user=useChatStore((state) => state.user);
    const setUser=useChatStore((state)=>state.setUser);
    const isLoading=useChatStore((state)=>state.isLoading);
    const setIsLoading=useChatStore((state)=>state.setIsLoading);
    // const users=useChatStore((state)=>state.users);
    const connectSocket = useChatStore((state) => state.connectSocket);
    const disconnectSocket = useChatStore((state) => state.disconnectSocket);

    async function signup(username:string,email:string,password:string){
        const userPayload=await signUp(username,email,password);
            setUser(userPayload);
    }
    async function login(username:string,password:string){
        const userPayload=await loginApi(username,password);
        setUser(userPayload);
        connectSocket(userPayload);
    }
    async function logout(){
        await logOut();
        setUser(null);
        disconnectSocket();
    }

    async function checkauth() {
        try {
            setIsLoading(true); 
            const userPayload = await checkAuth();
            setUser(userPayload);
            connectSocket(userPayload);
        } catch (error) {
            console.error("Session verification failed:", error);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }
    return {user, login, signup, logout, checkauth, isLoading};
}